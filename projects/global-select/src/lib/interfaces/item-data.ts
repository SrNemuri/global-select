export interface GroupConfig {
  title: string;
  display: any;
  limit: number;
}

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
