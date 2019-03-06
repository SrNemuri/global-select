import { GroupConfig } from './group-config';

export interface ItemData {
  items: any[];
  grouping: boolean;
  incompatibility: boolean;
  generalLimit: number;
  groupBy: string;
  identifyBy: string;
  valueProp: any;
  groupConfig: Map<any, GroupConfig>;
}
