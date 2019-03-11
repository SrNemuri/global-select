import {
  Component,
  Input,
  OnChanges,
  ViewChild,
  ElementRef,
  OnInit,
  EventEmitter,
  Output,
  HostListener
} from '@angular/core';

import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';

import { GlobalSelectConfiguration, Collection } from './interfaces';
import { getDisabled, filterArray } from './utils/functions';

@Component({
  selector: 'tgx-global-select',
  templateUrl: './global-select.component.html',
  styleUrls: ['./global-select.component.css'],
  animations: [
    trigger('dropdown', [
      state(
        'yes',
        style({
          transform: 'translateY(-50px)',
          opacity: 0,
          display: 'none',
          pointerEvents: 'none'
        })
      ),
      state(
        'no',
        style({
          transform: 'translateY(0)',
          opacity: 1,
          display: 'block',
          pointerEvents: 'all'
        })
      ),
      transition(
        'no => yes',
        animate(
          150,
          keyframes([
            style({
              transform: 'translateY(0px)',
              opacity: 1,
              offset: 0,
              pointerEvents: 'none'
            }),
            style({
              transform: 'translateY(-10px)',
              opacity: 0.75,
              offset: 0.3
            }),
            style({
              transform: 'translateY(-30px)',
              opacity: 0.1,
              offset: 0.8
            }),
            style({
              transform: 'translateY(-50px)',
              opacity: 0,
              offset: 1
            })
          ])
        )
      ),
      transition(
        'yes => no',
        animate(
          150,
          keyframes([
            style({
              transform: 'translateY(-50px)',
              opacity: 0,
              offset: 0
            }),
            style({
              transform: 'translateY(-30px)',
              opacity: 0.5,
              offset: 0.3
            }),
            style({
              transform: 'translateY(-10px)',
              opacity: 1,
              offset: 0.8
            }),
            style({
              transform: 'translateY(0px)',
              opacity: 1,
              offset: 1,
              pointerEvents: 'all'
            })
          ])
        )
      )
    ])
  ]
})
export class GlobalSelectComponent implements OnChanges, OnInit {
  // Data variables
  searchValue: string;
  selectedItems = [];
  availableItems = [];
  collections: Collection[] = [];
  getDisabled = getDisabled;

  // Data
  @Input() items: any[];

  // Component configurations
  @Input() configuration: GlobalSelectConfiguration;
  @Input() default: any[];
  @Input() disabled: boolean;

  // Animation switches
  hiddenDropdown = 'yes';

  // Event triggers
  @Output() keyUpEvent: EventEmitter<string> = new EventEmitter();

  // Data binders
  @Output() itemSelected: EventEmitter<any[]> = new EventEmitter();

  // DOM elements
  @ViewChild('inputSearch') inputSearch: ElementRef;
  @ViewChild('dropdownElem') dropdownElem: ElementRef;
  @ViewChild('globalSelectElement') globalSelectElement: ElementRef;

  // Focus management
  focusedListElement: any;
  focusedSelectedElement: any;

  // Behaviour control
  isFiltering: boolean;

  private selectBehavior = {
    closeOnAdd: true,
    clearOnAdd: true,
    clearOnBlur: true,
    searchOnFocus: true
  };

  backspace = false;

  @HostListener('document:keydown', ['$event']) detectKeyboardEvent(
    event: KeyboardEvent
  ) {
    const innerElementFocused = this.globalSelectElement.nativeElement.querySelectorAll(
      ':focus'
    )[0];
    if (!innerElementFocused) {
      return;
    }

    const validEvents = [
      'ArrowUp',
      'ArrowRight',
      'ArrowDown',
      'ArrowLeft',
      'Enter',
      'Backspace'
    ];

    const listNodes = this.dropdownElem.nativeElement.querySelectorAll(
      'span.custom-dropdown-item'
    );

    if (!validEvents.includes(event.key) || listNodes.length === 0) {
      return;
    }

    const selectedElementIndex = Array.from(listNodes).findIndex(
      c => c === document.activeElement
    );

    if (selectedElementIndex === -1) {
      if (event.key === 'ArrowUp') {
        listNodes[listNodes.length - 1].focus();
      } else if (event.key === 'ArrowDown') {
        listNodes[0].focus();
      }
    } else {
      if (event.key === 'ArrowUp') {
        // Backwards
        if (selectedElementIndex === 0) {
          listNodes[listNodes.length - 1].focus();
        } else {
          listNodes[selectedElementIndex - 1].focus();
        }
      } else if (event.key === 'ArrowDown') {
        // Forward
        if (listNodes.length - 1 === selectedElementIndex) {
          listNodes[0].focus();
        } else {
          listNodes[selectedElementIndex + 1].focus();
        }
      }
    }

    // ENTER KEY
    if (event.key === 'Enter' && this.focusedListElement) {
      this.addItem(this.focusedListElement);
    }
  }

  @HostListener('document:click', ['$event']) detectClickEvent(event) {
    if (event.path) {
      const classes = event.path.map(p => p.className || '');
      if (!classes.includes('dropdown-root')) {
        this.closeDropdown();
        if (this.selectBehavior.clearOnBlur) {
          this.searchValue = '';
        }
      } else if (
        event.target.id === 'inputSearch' &&
        this.selectBehavior.searchOnFocus &&
        this.searchValue &&
        this.searchValue.length > 2
      ) {
        this.keyUpEvent.emit(this.searchValue);
      }
    }
  }

  constructor() {}

  ngOnInit() {
    window['a'] = this;
    this.configureComponent();
  }

  ngOnChanges(changes) {
    if ('items' in changes) {
      if (this.default) {
        if (this.selectedItems) {
          this.default.map(d => {
            if (
              !this.selectedItems.find(
                s =>
                  d[this.configuration.identifyBy] ===
                  s[this.configuration.identifyBy]
              )
            ) {
              this.selectedItems.push(d);
            }
          });
        } else {
          this.selectedItems = this.default;
        }
      }
      this.filterAvailableItems();
    }
  }

  configureComponent() {
    if (!this.configuration.selectBehavior) {
      return;
    }
    if (this.configuration.selectBehavior.onadd) {
      this.selectBehavior.closeOnAdd = !this.configuration.selectBehavior.onadd.includes(
        'open'
      );
      this.selectBehavior.clearOnAdd = !this.configuration.selectBehavior.onadd.includes(
        'keeptext'
      );
    }

    if (this.configuration.selectBehavior.onblur) {
      this.selectBehavior.clearOnBlur =
        this.configuration.selectBehavior.onblur === 'clear';
    }
    if (this.configuration.selectBehavior.onfocus) {
      this.selectBehavior.searchOnFocus =
        this.configuration.selectBehavior.onfocus === 'search';
    }
  }

  manageKD(event) {
    if (event.key === 'Backspace') {
      // const;
      // console.log('Backspace', event);
    }
  }

  focusItem(item) {
    this.focusedListElement = item;
  }

  blurItem() {
    this.focusedListElement = undefined;
  }

  onKeyupFilter(searchValue, event) {
    if (
      searchValue &&
      searchValue.length > 2 &&
      event.key !== 'ArrowUp' &&
      event.key !== 'ArrowDown' &&
      event.key !== 'Enter'
    ) {
      if (this.configuration.async) {
        this.keyUpEvent.emit(this.searchValue);
      } else {
        this.filterAvailableItems();
      }
    } else if (
      !searchValue ||
      (searchValue && searchValue.length < 3 && event.key === 'Backspace')
    ) {
      this.closeDropdown();
    }
  }

  // /**
  //  * Filters
  //  */
  filterAvailableItems() {
    if ((this.selectedItems || []).length) {
      const selectedValues = this.selectedItems.map(
        si => si[this.configuration.valueProp]
      );

      this.availableItems = [
        ...this.items.filter(item => {
          const alreadyIn = selectedValues.includes(
            item[this.configuration.valueProp]
          );
          let compatible = true;
          if (this.configuration.incompatibility) {
            compatible = !!this.selectedItems.find(
              si =>
                si[this.configuration.groupBy] ===
                item[this.configuration.groupBy]
            );
          }
          return !alreadyIn && compatible;
        })
      ];

      if (!this.configuration.async) {
        this.availableItems = filterArray(this.searchValue, [
          ...this.availableItems
        ]);
      }
    } else if ((this.searchValue || '').length >= 3) {
      this.availableItems = filterArray(this.searchValue, [...this.items]);
    } else {
      this.availableItems = [];
    }

    if (
      (!!this.searchValue && this.searchValue.length > 2) ||
      (!!this.searchValue && this.availableItems.length > 0)
    ) {
      if (this.configuration.grouping) {
        this.isFiltering === !!this.configuration.groupBy;
        this.filterItemsGroups();
      } else {
        console.log('ELSE');
        this.collections = [{ list: this.availableItems }];
      }
      this.openDropdown();
    } else if (!this.searchValue) {
      this.closeDropdown();
    }
  }

  /**
   * Filters items if grouping parameter is set to true
   */
  filterItemsGroups() {
    // key bloqueante
    const collections = [];
    const itemKeysConfiguration = Array.from(
      this.configuration.groupConfig.keys()
    );

    const groupBy = (this.selectedItems[0] || {})[this.configuration.groupBy];
    this.isFiltering = groupBy !== undefined;
    console.log(this.isFiltering);
    if (itemKeysConfiguration.length) {
      for (let i = 0; i < itemKeysConfiguration.length; i++) {
        const groupConfig = this.configuration.groupConfig.get(
          itemKeysConfiguration[i]
        );

        if (
          this.isFiltering &&
          this.configuration.incompatibility &&
          groupBy !== itemKeysConfiguration[i]
        ) {
          continue;
        }

        // We check if we reached the limit
        const limitReached =
          groupConfig.limit <=
          this.selectedItems.filter(
            si => si[this.configuration.groupBy] === itemKeysConfiguration[i]
          ).length;

        if (groupConfig) {
          let collection;
          if (!limitReached) {
            collection = {
              title: groupConfig.title || 'Not defined',
              list: this.availableItems.filter(ai => {
                if (
                  ai[this.configuration.groupBy] === itemKeysConfiguration[i]
                ) {
                  ai['disp'] = groupConfig.display(ai);
                  return true;
                }
              })
            };
          } else {
            collection = {
              title: groupConfig.title || 'Not defined',
              list: [],
              warning: 'Selection limit reached'
            };
          }
          collections.push(collection);
        }
      }

      this.collections = collections;
    }
  }

  openDropdown() {
    if (this.hiddenDropdown !== 'no') {
      this.hiddenDropdown = 'no';
    }
  }

  closeDropdown() {
    if (this.hiddenDropdown !== 'yes') {
      this.hiddenDropdown = 'yes';
    }
  }

  addItem(item) {
    item.focused = false;
    const clone = JSON.parse(JSON.stringify(item));
    this.selectedItems.push(clone);
    this.filterAvailableItems();
    if (this.selectBehavior.closeOnAdd) {
      this.closeDropdown();
      this.dropdownElem.nativeElement.scrollTop = 0;
    }
    if (this.selectBehavior.clearOnAdd) {
      this.searchValue = '';
    }

    this.inputSearch.nativeElement.focus();
    this.itemSelected.emit(this.selectedItems);
  }

  removeItem(index) {
    this.selectedItems.splice(index, 1);
    this.filterAvailableItems();
  }

  /**
   * Starts the removal process. If backspace key is pressed, las item from list is marked for deletion.
   * If backspace key is pressed again, that item is removed from the list.
   * @param target
   */
  startRemoving(target) {
    if (this.selectedItems.length) {
      if (
        !target[this.configuration.valueProp] &&
        !this.selectedItems.find(si => si.toBeRemoved)
      ) {
        this.selectedItems[this.selectedItems.length - 1].toBeRemoved = true;
      } else if (this.selectedItems.find(si => si.toBeRemoved)) {
        this.removeItem(this.selectedItems.length - 1);
        if (this.selectedItems.length) {
          this.selectedItems[this.selectedItems.length - 1].toBeRemoved = true;
        }
      }
    } else {
      this.backspace = false;
      if (this.selectedItems.length) {
        this.selectedItems[this.selectedItems.length - 1].toBeRemoved = false;
      }
    }
  }
}
