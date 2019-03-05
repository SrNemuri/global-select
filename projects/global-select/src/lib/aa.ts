import { CommonOrganizationService } from './../../../shared-core/GraphQL/gateway/services/common-organization.service';
import { NotificationService } from './../../../shared-core/services/notification.service';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, Input, HostListener, ViewChild, ElementRef } from '@angular/core';
import { Organization } from '../../../shared-core/GraphQL/gateway/interfaces';
import { PlatformService } from '../../../shared-core/services/platform.service';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { OrganizationSelectorService } from '../../../shared-core/services/organization-selector.service';
import { AuthUniversalService } from '../../../shared-core/services/auth-universal.service';
import { OnDestroy } from '@angular/core';

@Component({
  selector: 'tgx-organization-modal-selector',
  templateUrl: './organization-modal-selector.component.html',
  styleUrls: ['./organization-modal-selector.component.scss']
})
export class OrganizationModalSelectorComponent implements OnInit, OnDestroy {
  @Input()
  url: string;
  organizations: Organization[];

  subscriptionUser: Subscription;
  isError: boolean;
  isLoading: boolean;
  ifNotfound: boolean;

  filterOrg: string;

  isFocus: boolean;

  @ViewChild('filterInput') filterOrgInput: ElementRef;
  @ViewChild('listContainer') list: ElementRef;

  constructor(
    private router: Router,
    private organizationSelectorService: OrganizationSelectorService,
    private activeModal: NgbActiveModal,
    private commonOrganizationService: CommonOrganizationService,
    private platformService: PlatformService,
    private authUniversalService: AuthUniversalService,
    private notificationService: NotificationService
  ) {}

  @HostListener('document:keydown', ['$event']) detectKeyboardEvent(event: KeyboardEvent) {
    // This event listener should only work when orgs are loaded
    if (this.isLoading) {
      return;
    }

    const listNodes = this.list.nativeElement.children;

    const selectedElementIndex = Array.from(listNodes).findIndex(c => c['firstChild'] === document.activeElement);

    if (selectedElementIndex === -1) {
      if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
        listNodes[listNodes.length - 1].firstChild.focus();
      } else if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
        listNodes[0].firstChild.focus();
      }
    } else {
      if (event.key === 'ArrowUp') {
        // Backwards
        if (selectedElementIndex === 0) {
          listNodes[listNodes.length - 1].firstChild.focus();
        } else {
          listNodes[selectedElementIndex - 1].firstChild.focus();
        }
      } else if (event.key === 'ArrowLeft') {
        // Fast backwards
        if (selectedElementIndex === 0) {
          listNodes[listNodes.length - 1].firstChild.focus();
        } else if (selectedElementIndex < 10) {
          listNodes[0].firstChild.focus();
        } else {
          listNodes[selectedElementIndex - 10].firstChild.focus();
        }
      } else if (event.key === 'ArrowDown') {
        // Forward
        if (listNodes.length - 1 === selectedElementIndex) {
          listNodes[0].firstChild.focus();
        } else {
          listNodes[selectedElementIndex + 1].firstChild.focus();
        }
      } else if (event.key === 'ArrowRight') {
        // Fast forward
        if (listNodes.length - 1 === selectedElementIndex) {
          listNodes[0].firstChild.focus();
        } else if (listNodes.length - 1 < selectedElementIndex + 10) {
          listNodes[selectedElementIndex + 10].firstChild.focus();
        } else {
          listNodes[selectedElementIndex + 10].firstChild.focus();
        }
      }
    }
  }

  ngOnInit() {
    this.filterOrgInput.nativeElement.focus();
    this.isLoading = true;

    this.subscriptionUser = this.authUniversalService.userProfile$.subscribe(user => {
      if (user) {
        this.commonOrganizationService
          .getOrganizationsBasic()
          .then(
            res => {
              if (res && res.length === 0) {
                this.ifNotfound = true;
              } else if (res.length === 1) {
                this.selectOrganization(res[0]);
              } else {
                this.organizations = res.sort((a, b) => a.label.localeCompare(b.label) || a.code.localeCompare(b.code));
              }

              this.isLoading = false;
            },
            err => {
              this.notificationService.handleGatewayAndGraphqlErrors(err);
              this.isLoading = false;
              this.isError = true;
            }
          )
          .catch(err => {
            this.isLoading = false;
            this.isError = true;
          });
      }
    });
  }

  ngOnDestroy() {
    this.subscriptionUser.unsubscribe();
  }

  selectOrganization(organization: Organization) {
    this.commonOrganizationService.setOrganization(organization);
    if (this.platformService.PlatformIsBrowser()) {
      this.organizationSelectorService.selectingOrg$.next(false);
      this.activeModal.close();
      this.router.navigateByUrl(this.url);
    }
  }
}
