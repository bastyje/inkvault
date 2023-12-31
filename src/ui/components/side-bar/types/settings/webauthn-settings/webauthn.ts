import { WebAuthnKeyInfo } from "../../../../../../shared/web-authn-key-info";

export const register = async (email: string, displayName: string, salt: Uint8Array): Promise<WebAuthnKeyInfo> => {
  const credentialCreationOptions: CredentialCreationOptions = {
    publicKey: {
      challenge: new Uint8Array(4).fill(1),
      rp: {name: 'ink-vault'},
      user: {
        id: new Uint8Array(4).fill(1),
        name: email,
        displayName: displayName
      },
      pubKeyCredParams: [
        {type: 'public-key', alg: -7}
      ],
      authenticatorSelection: {
        userVerification: 'required'
      },
      extensions: {
        // @ts-ignore
        prf: {eval: {first: salt}}
      }
    }
  };

  const credential = await navigator.credentials.create(credentialCreationOptions);
  //@ts-ignore
  return {
    // @ts-ignore
    rawId: new Uint8Array(credential.rawId),
    // @ts-ignore
    transports: credential?.response.getTransports(),
    salt
  }
};

const getKey = async (salt: ArrayBufferLike, rawId: BufferSource, transports: string[]): Promise<CryptoKey> => {
  const credential = await navigator.credentials.get({
    publicKey: {
      challenge: new Uint8Array([9, 0, 1, 2]),
      allowCredentials: [
        {
          id: rawId,
          // @ts-ignore
          transports: transports,
          type: 'public-key',
        },
      ],
      userVerification: 'required',
      extensions: {
        // @ts-ignore
        prf: { eval: { first: salt } },
      },
    },
  });

  return await crypto.subtle.importKey(
    'raw',
    // @ts-ignore
    new Uint8Array(credential.getClientExtensionResults().prf.results.first),
    'HKDF',
    false,
    ['deriveKey']
  );
};

const getPublicKey = async (salt: ArrayBufferLike, rawId: BufferSource, transports: string[]): Promise<CryptoKey> => {
  const key = await getKey(salt, rawId, transports);
  const label = 'encryption key';
  const info = new TextEncoder().encode(label);
  const salt1 = new Uint8Array();

  return await crypto.subtle.deriveKey(
    { name: 'HKDF', info, salt: salt1, hash: 'SHA-256' },
    key,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt']
  );
};

const getPrivateKey = async (salt: ArrayBufferLike, rawId: BufferSource, transports: string[]): Promise<CryptoKey> => {
  const key = await getKey(salt, rawId, transports);
  const label = 'encryption key';
  const info = new TextEncoder().encode(label);
  const salt1 = new Uint8Array();

  return await crypto.subtle.deriveKey(
    { name: 'HKDF', info, salt: salt1, hash: 'SHA-256' },
    key,
    { name: 'AES-GCM', length: 256 },
    false,
    ['decrypt']
  );
};

export const encrypt = async (salt: Uint8Array, data: string, nonce: Uint8Array, rawId: Uint8Array, transports: string[]): Promise<string> => {
  const publicKey = await getPublicKey(salt, rawId, transports);
  return btoa(String.fromCharCode(...new Uint8Array(await crypto.subtle.encrypt(
    { name: "AES-GCM", iv: nonce },
    publicKey,
    new TextEncoder().encode(data)
  ))));
};

export const decrypt = async (salt: Uint8Array, data: string, nonce: Uint8Array, rawId: Uint8Array, transports: string[]): Promise<string> => {
  return getPrivateKey(salt, rawId, transports)
    .then(privateKey => crypto.subtle.decrypt(
      { name: "AES-GCM", iv: nonce },
      privateKey,
      Uint8Array.from(atob(data), c => c.charCodeAt(0)))
      .then(decrypted => new TextDecoder().decode(decrypted)));
};