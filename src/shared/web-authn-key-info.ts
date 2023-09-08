export interface WebAuthnKeyInfo {
  keyName: string;
  userDisplayName?: string;
  userEmail?: string;
  salt: ArrayLike<number>;
  rawId: ArrayLike<number>;
  transports: string[];
}