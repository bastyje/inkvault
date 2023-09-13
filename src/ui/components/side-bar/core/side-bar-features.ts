import FilesSideBar from "../types/files/FilesSideBar.svelte";
import SettingsSideBar from "../types/settings/SettingsSideBar.svelte";
import { VaultStorage } from "../../../storage/vault-storage";
import ProjectsSideBar from "../types/projects/ProjectsSideBar.svelte";
import HelpSideBar from "../types/help/HelpSideBar.svelte";

export interface SideBarTitleAction {
  name: string;
  icon: string;
  handler: () => void
}

export interface SideBarFeature {
  name: string;
  icon: string;
  component: any;
  actions: SideBarTitleAction[];
}

export const EMPTY_FEATURE: SideBarFeature = {
  name: '',
  component: null,
  actions: [],
  icon: ''
};

export const SIDE_BAR_FEATURES: SideBarFeature[] = [
  {
    name: 'projects',
    icon: 'icons/folder.svg',
    component: ProjectsSideBar,
    actions: []
  },
  {
    name: 'notes',
    icon: 'icons/notes.svg',
    component: FilesSideBar,
    actions: [
      {
        name: 'openVault',
        icon: 'icons/plus.svg',
        handler: () => {

        }
      }
    ]
  },
  {
    name: 'settings',
    icon: 'icons/settings.svg',
    component: SettingsSideBar,
    actions: []
  },
  {
    name: 'help',
    icon: 'icons/help.svg',
    component: HelpSideBar,
    actions: []
  },
];