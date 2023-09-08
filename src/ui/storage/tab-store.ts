import { getTabsFromStorage, storeTabs } from "./storage";
import { VaultStorage } from "./vault-storage";

export class Tab {
  constructor(name: string, component: any, data: any) {
    this.name = name;
    this.component = component;
    this.data = data;
  }

  public name: string;
  public component: any;
  public data: any;
}

interface TabStoreEventType {
  selectedChanged: ((event: TabStoreEvent) => void)[],
  any: ((event: TabStoreEvent) => void)[],
  tabOpened: ((event: TabStoreEvent) => void)[],
  tabClosed: ((event: TabStoreEvent) => void)[]
}

interface TabStoreEvent {
  type: keyof TabStoreEventType;
  selected: string;
  tabs: Tab[];
}

interface ClosedTabEvent extends TabStoreEvent {
  closedTabName: string;
}

interface OpenedTabEvent extends TabStoreEvent {
  openedTabName: string;
}

interface SelectedTabEvent extends TabStoreEvent {
  selectedTabName: string;
}

export class TabStore {

  private readonly _defaultTab: Tab;
  private readonly _tabs: Tab[];
  private _subscribers: TabStoreEventType;
  private _selected: string;
  private _name: string;

  constructor(name: string, defaultTab: Tab, ...openedTabs: Tab[]) {
    this._subscribers = {
      selectedChanged: [],
      tabOpened: [],
      tabClosed: [],
      any: []
    };

    this._name = name;
    this._defaultTab = defaultTab;

    const tabsFromStorage: Tab[] = getTabsFromStorage(this._name);
    if (tabsFromStorage !== null && tabsFromStorage.length > 0) {
      openedTabs = [...tabsFromStorage, ...openedTabs];
    }

    if (openedTabs.length > 0) {
      this._tabs = openedTabs;
    } else {
      this._tabs = [this._defaultTab];
    }

    this._selected = this._tabs[0].name;

    this.on('any', e => {
      storeTabs(this._name, this._tabs);
    });
  }

  public static getName(): Promise<string | null> {
    return VaultStorage.instance.vault.then(vault => {
      return vault === null ? null : `tab-group-${vault.name}`;
    });
  }

  public getTabs = (): Tab[] => [...this._tabs];
  public getSelectedName = (): string => this._selected;

  public getSelectedComponent(): any {
    const tab = this._tabs.find(t => t.name === this._selected);
    return tab ? { component: tab.component, data: tab.data } : null;
  };

  public openTab(tabName: string, component: any, data: any = null) {
    if (this._tabs.some(t => t.name === tabName)) {
      this.selectTab(tabName);
      return;
    }

    this._tabs.push(new Tab(tabName, component, data));
    this._emit({
      type: 'tabOpened',
      tabs: [...this._tabs],
      selected: this._selected,
      openedTabName: tabName
    } as OpenedTabEvent);
    this._emit({
      type: 'any',
      tabs: [...this._tabs],
      selected: this._selected,
      openedTabName: tabName
    } as OpenedTabEvent);
    this.selectTab(tabName);
  }

  public closeTab(tabName: string) {
    if (this._tabs.splice(this._tabs.findIndex(t => t.name === tabName), 1).length === 1) {
      this._emit({
        type: 'tabClosed',
        tabs: [...this._tabs],
        selected: this._selected,
        closedTabName: tabName
      } as ClosedTabEvent);
      this._emit({
        type: 'any',
        tabs: [...this._tabs],
        selected: this._selected,
        closedTabName: tabName
      } as ClosedTabEvent);
    }

    if (this._tabs.length === 0) {
      this.openTab(this._defaultTab.name, this._defaultTab.component);
    }

    if (!this._tabs.some(t => t.name === this._selected)) {
      this.selectTab(this._tabs[this._tabs.length - 1].name);
    }
  }

  public selectTab(tabName: string) {
    if (this._selected === tabName) return;

    if (this._tabs.some(t => t.name === tabName)) {
      this._selected = tabName;
      this._emit({
        type: 'selectedChanged',
        tabs: [...this._tabs],
        selected: this._selected,
        selectedTabName: tabName
      } as SelectedTabEvent);
      this._emit({
        type: 'any',
        tabs: [...this._tabs],
        selected: this._selected,
        selectedTabName: tabName
      } as SelectedTabEvent);
    }
  }

  public on(event: keyof TabStoreEventType, handler: (event: TabStoreEvent) => void) {
    this._subscribers[event].push(handler);
  }

  private _emit(event: TabStoreEvent) {
    this._subscribers[event.type].forEach(s => {
      s(event);
    });
  }
}