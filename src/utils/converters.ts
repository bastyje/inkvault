import { WebAuthnKeyInfo } from "../shared/web-authn-key-info";

export const bufferSourceToByteArray = (buffer: ArrayBuffer): Uint8Array => {
  return new Uint8Array(buffer);
}

export interface TreeElement<T> {
  children: T[];
}

export const mapTree = <T extends TreeElement<T>, U extends TreeElement<U>>(tree: T, mapFn: (elem: T) => U): U => {
  const newTree = mapFn(tree);
  if (newTree.children === null || newTree.children === undefined) newTree.children = [];

  if (tree.children.length > 0) {
    tree.children.forEach(child => {
      newTree.children.push(mapTree(child, mapFn));
    });
  }

  return newTree;
}

export const mapKeyToFileWrite = (key: WebAuthnKeyInfo): WebAuthnKeyInfo => ({
  keyName: key.keyName,
  userEmail: key.userEmail,
  userDisplayName: key.userDisplayName,
  salt: Array.from(key.salt),
  rawId: Array.from(key.rawId),
  transports: key.transports
});

export const mapKeyToUse = (keyFromFile: WebAuthnKeyInfo): WebAuthnKeyInfo => ({
  keyName: keyFromFile.keyName,
  userEmail: keyFromFile.userEmail,
  userDisplayName: keyFromFile.userDisplayName,
  salt: Uint8Array.from(keyFromFile.salt),
  rawId: Uint8Array.from(keyFromFile.rawId),
  transports: keyFromFile.transports
});
