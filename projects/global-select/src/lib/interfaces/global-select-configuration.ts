import { GroupConfig } from './group-config';
import { BehaviorConfig } from './behavior-config';

export interface GlobalSelectConfiguration {
  grouping?: boolean;
  incompatibility?: boolean;
  generalLimit?: number;
  groupBy?: string;
  identifyBy?: string;
  valueProp: any;
  groupConfig: Map<any, GroupConfig>;
  selectBehavior?: BehaviorConfig;
  async?: boolean;
}
