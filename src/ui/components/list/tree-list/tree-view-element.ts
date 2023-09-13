import { ListRecord } from "../list-record";

export interface TreeViewElement extends ListRecord {
  children: [],
  isLeaf: boolean;
  component?: any;
}