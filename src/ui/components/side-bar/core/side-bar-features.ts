import FilesSideBar from "../types/files/FilesSideBar.svelte";
import SettingsSideBar from "../types/settings/SettingsSideBar.svelte";

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
    name: 'notes',
    icon: 'icons/notes.svg',
    component: FilesSideBar,
    actions: [
      {
        name: 'openVault',
        icon: 'icons/plus.svg',
        handler: () => {
          window.api.fs.selectFromFileDialog().then(path => {
            console.log(path);
          })
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
    component: null,
    actions: []
  },
];