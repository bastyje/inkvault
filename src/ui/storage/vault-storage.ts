import { VaultData, VaultInfo } from "../../shared/vault-info";
import { WebAuthnKeyInfo } from "../../shared/web-authn-key-info";

export const VAULT_STORAGE_CONTEXT_KEY = 'vault-storage';

interface VaultStorageEvent {
  type: keyof VaultStorageEventType,
  vault: VaultData
}

interface VaultStorageEventType {
  change: ((event: VaultStorageEvent) => void)[],
  any: ((event: VaultStorageEvent) => void)[]
}

export class VaultStorage {

  private static _instance: VaultStorage;
  private _subscribers: VaultStorageEventType;
  private readonly VAULT_STORAGE_KEY = 'vault-info';
  private _vault: VaultData | null;
  private _promise: Promise<void | WebAuthnKeyInfo[]> | null = null;

  private constructor() {
    const vaultInfo = this._getPreviouslyOpenVault();
    this._vault = null;
    if (vaultInfo !== null) {
      this._promise = window.api.webauthnKey.getKeys(vaultInfo.path).then(k => {
        this._vault = {
          name: vaultInfo.path.replace(/^.*[\\\/]/, ''),
          path: vaultInfo.path,
          keys: k
        }
      })
    }

    this._subscribers = {
      change: [],
      any: []
    };

    VaultStorage._instance = this;
  }

  public static get instance() {
    return this._instance || new this();
  }

  public get vault(): Promise<VaultData | null> {
    return this._promise!.then(_ => this._vault);
  }

  public on(eventType: keyof VaultStorageEventType, callback: (event: VaultStorageEvent) => void): void {
    this._subscribers[eventType].push(callback)
  }

  public changeVault(vaultInfo: VaultInfo): void {
    this._setOpenedVault(vaultInfo);
    this._emit({
      type: 'change',
      vault: vaultInfo
    } as VaultStorageEvent);
    this._emit({
      type: 'any',
      vault: vaultInfo
    } as VaultStorageEvent);
  }

  private _emit(event: VaultStorageEvent): void {
    this._subscribers[event.type].forEach(s => {
      s(event);
    });
  }

  private _getPreviouslyOpenVault(): VaultInfo | null {
    const vaultString = localStorage.getItem(this.VAULT_STORAGE_KEY);
    return vaultString === null ? null : JSON.parse(vaultString) as VaultInfo;
  }

  private _setOpenedVault(vault: VaultInfo): void {
    localStorage.setItem(this.VAULT_STORAGE_KEY, JSON.stringify(vault));
  }
}