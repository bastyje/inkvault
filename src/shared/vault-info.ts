import { WebAuthnKeyInfo } from "./web-authn-key-info";

export interface VaultInfo {
  name: string;
  path: string;
}

export interface VaultData extends VaultInfo {
  name: string;
  keys: WebAuthnKeyInfo[]
}