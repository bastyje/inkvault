import { mapComponentToString, mapStringToComponent } from "../components/component-mappings";
import { Tab } from "./tab-store";
import { VaultInfo } from "../../shared/vault-info";

export const getTabsFromStorage = (tabGroupName: string): Tab[] => {
  const objectFromStorage = JSON.parse(localStorage.getItem(tabGroupName)!);
  return objectFromStorage ? objectFromStorage.map((x: Tab) => ({
    component: mapStringToComponent(x.component),
    data: x.data,
    name: x.name
  } as Tab)) : [];
};

export const storeTabs = (tabGroupName: string, tabs: Tab[]): void => {
  localStorage.setItem(tabGroupName, JSON.stringify(tabs.map(x => ({
      component: mapComponentToString(x.component),
      name: x.name,
      data: x.data
    } as Tab
  ))));
};