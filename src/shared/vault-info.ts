import { WebAuthnKeyInfo } from "./web-authn-key-info";

export interface VaultInfo {
  path: string;
}

export interface VaultData extends VaultInfo {
  name: string;
  keys: WebAuthnKeyInfo[]
}