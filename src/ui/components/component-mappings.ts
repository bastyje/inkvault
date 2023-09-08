import TextEditor from "./text-editor/TextEditor.svelte";
import Hello from "./Hello.svelte";
import WebAuthnSettings from "./side-bar/types/settings/webauthn-settings/WebAuthnSettings.svelte";

interface ComponentMap {
  name: string;
  component: any;
}

const COMPONENT_MAPS = [
  {
    name: 'TextEditor',
    component: TextEditor
  },
  {
    name: 'Hello',
    component: Hello
  },
  {
    name: 'WebAuthnSettings',
    component: WebAuthnSettings
  }
] as ComponentMap[];


export const mapComponentToString = (component: any): string | null => {
  const found = COMPONENT_MAPS.find(m => m.component === component);
  return found ? found.name : null;
}
export const mapStringToComponent = (str: string): any | null => {
  const found = COMPONENT_MAPS.find(m => m.name === str);
  return found ? found.component : null;
}
