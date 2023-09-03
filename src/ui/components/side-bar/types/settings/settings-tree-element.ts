import { TreeViewElement } from "../../../list/tree-list-object/tree-view-element";
// @ts-ignore TODO
import WebAuthnSettings from "./webauthn-settings/WebAuthnSettings.svelte";

export interface SettingsTreeElement extends TreeViewElement {}


export const SETTINGS_TREE = {
  name: 'Settings',
  isLeaf: false,
  children: [
    {
      name: 'Privacy',
      isLeaf: false,
      children: [
        {
          name: 'Encryption',
          isLeaf: false,
          children: [
            {
              name: 'WebAuthn',
              isLeaf: true,
              children: [] as SettingsTreeElement[],
              component: WebAuthnSettings
            }
          ] as SettingsTreeElement[]
        }
      ] as SettingsTreeElement[]
    }
  ] as SettingsTreeElement[]
} as SettingsTreeElement;