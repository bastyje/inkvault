export interface SettingsNode {
  displayName: string;
}

export interface SettingsLeaf extends SettingsNode {
  _component: any;
}

export interface AppearanceSettings extends SettingsNode {}

export interface EditorSettings extends SettingsNode {}

export interface WebAuthnSettings extends SettingsLeaf {}

export interface EncryptionSettings extends SettingsNode {
  WebAuthn: WebAuthnSettings;
}

export interface PrivacySettings extends SettingsNode {
  Encryption: EncryptionSettings;
}

export interface Settings {
  Appearance: AppearanceSettings;
  Editor: EditorSettings;
  Privacy: PrivacySettings;
}