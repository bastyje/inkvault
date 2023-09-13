import { TabStore } from "./tab-store";

export class TabStores {

  private static _instance: TabStores;
  private tabStores: {key: string, tabStore: TabStore}[];

  private constructor() {
    this.tabStores = [];
    TabStores._instance = this;
  }

  public static get instance() {
    return TabStores._instance || new this();
  }

  public add(key: string, tabStore: TabStore): void {
    this.tabStores.push({key, tabStore});
  }

  public get(key: string| null): TabStore | null {
    if (key === null) return null;
    const found = this.tabStores.find(t => t.key === key);
    return found !== undefined ? found.tabStore : null;
  }
}