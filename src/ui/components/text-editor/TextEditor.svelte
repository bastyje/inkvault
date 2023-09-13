<script lang="ts">
  import { decrypt, encrypt } from "../side-bar/types/settings/webauthn-settings/webauthn";
  import { EncryptedFile } from "../../../shared/encrypted-file";
  import DropdownMenu from "../dropdown-menu/DropdownMenu.svelte";
  import { DropdownMenuConfig } from "../dropdown-menu/dropdown-menu-config";
  import SmallIconButton from "../buttons/SmallIconButton.svelte";
  import { WebAuthnKeyInfo } from "../../../shared/web-authn-key-info";
  import { VaultStorage } from "../../storage/vault-storage";
  import { VaultData } from "../../../shared/vault-info";

  export let path: string;
  let saved = true, fileContent = '', fileName = '', encrypted: boolean, keys: WebAuthnKeyInfo[] = [];
  let TEXT_EDITOR_MENU_CONFIG: DropdownMenuConfig;

  let vaultStorage = VaultStorage.instance;
  let openedVault: VaultData | null;
  let isAnyVaultOpen: boolean;

  vaultStorage.vault.then(v => {
    openedVault = v;
    isAnyVaultOpen = openedVault !== null;
    if (openedVault !== null) {
      keys = openedVault.keys;
    }
  });

  vaultStorage.on('change', e => {

  });

  if (path) {
      window.api.fs.readFile(path).then(file => {
        fileContent = file.encrypted ? '' : file.content;
        encrypted = file.encrypted;
      }).catch(_ => {
        fileContent = '';
        encrypted = false;
      });
    }

  $: {
    TEXT_EDITOR_MENU_CONFIG = {
      items: [
        {
          name: 'Encrypt',
          action: () => {
            encryptFile()
          },
          subItems: keys.map(k => ({
            name: k.keyName,
            action: (e) => {
              e.stopPropagation();
              e.preventDefault();
              encryptFile(k.keyName)
            }
          }))
        },
        {
          name: 'Delete'
        },
        {
          name: 'Copy file'
        },
        {
          name: 'Insert image or URL'
        }
      ]
    } as DropdownMenuConfig;
  }

  const onInput = _ => {
    saved = false;
  };

  const onKeydown = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.key === 's') {
      window.api.fs.writeFile(path, fileContent).then(_ => {
        saved = true;
      });
    }

    if (e.key === 'Tab') {
      e.preventDefault();
      if (e.shiftKey) {

      } else {
        const target = e.target as HTMLTextAreaElement;
        const start = target.selectionStart, end = target.selectionEnd;
        target.value = `${target.value.substring(0, start)}\t${target.value.substring(end)}`;
        target.selectionStart = target.selectionEnd = start + 1;
      }
    }
  }

  const encryptFile = (keyName: string | null = null) => {
    let key;
    if (keyName === null) {
      key = keys[0];
    } else {
      key = keys.find(k => k.keyName === keyName);
    }
    encrypt(key.salt as Uint8Array, fileContent, new Uint8Array([1, 2, 3, 4]), key.rawId as Uint8Array, key.transports).then(cipher => {
      window.api.fs.writeEncryptedFile({
        salt: {
          value: Array.from(key.salt),
          fromUserInput: false
        },
        keyName: key.keyName,
        content: cipher
      } as EncryptedFile, path).then(_ => {
        window.api.fs.readFile(path).then(file => {
          fileContent = file.encrypted ? '' : file.content;
          encrypted = file.encrypted;
        });
      });
    });
  };

  const decryptFile = () => {
    window.api.fs.readEncryptedFile(path).then(file => {
      window.api.webauthnKey.getKey('C:\\Users\\sebas\\test', file.keyName).then(key => {
        if (key) {
          decrypt(key.salt as Uint8Array, file.content, new Uint8Array([1, 2, 3, 4]), key.rawId as Uint8Array, key.transports).then(text => {
            window.api.fs.writeFile(path, text).then(_ => {
              window.api.fs.readFile(path).then(file => {
                fileContent = file.encrypted ? '' : file.content;
                encrypted = file.encrypted;
              });
            });
          }).catch(e => {
          });
        }
      })
    });
  };
</script>


<div class="container">
  <section class="head">
    <h1 class="small small--bold">{path}{#if !saved}*{/if}</h1>
    {#if !encrypted}
      <DropdownMenu config={TEXT_EDITOR_MENU_CONFIG}/>
    {/if}
  </section>
  <section class="editor" class:center={encrypted}>
    {#if encrypted}
      <div class="encrypted-message-container">
        <SmallIconButton
          color="--transparent"
          hoverColor="--transparent"
          iconSrc="icons/lock.svg"
          alt="decrypt"
          onClick={decryptFile}
          width={160}
          height={190}
        />
        <div class="text">
          <h3 class="LARGE">File is encrypted</h3>
          <p class="normal">To access this file, you must first decrypt it by picking the lock on the left side of this text and following next instructions</p>
        </div>
      </div>
    {:else }
      <textarea
        contenteditable="true"
        autocapitalize="off"
        spellcheck="false"
        on:input={onInput}
        on:keydown={onKeydown}
        bind:value={fileContent}
      ></textarea>
    {/if}
  </section>
</div>

<style lang="scss">
  .container {
    width: 100%;
    height: 100%;
    padding: 19px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    background-color: var(--primary-10);
  }

  .editor {
    margin: 35px 7%;
    height: 100%;
  }

  .editor > textarea {
    background-color: var(--transparent);
    resize: none;
    outline: none;
    border: none;
    overflow-y: auto;
    height: 100%;
    width: 100%;
    padding-right: 20px;
  }

  .head {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .encrypted-message-container {
    max-width: 617px;
    display: flex;
    align-items: center;
    gap: 28px;
    transform: translateY(-100px);
  }

  p {
    margin: 0;
  }

  .center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>