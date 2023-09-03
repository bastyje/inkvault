<script lang="ts">
  import { decrypt, encrypt } from "./side-bar/types/settings/webauthn-settings/webauthn";

  export let fileContent = '', path;

  const encryptFile = () => {
    window.api.webauthnKey.getKeys('C:\\Users\\sebas\\test').then(keys => {
      let key = keys[0];
      const rawId = new Uint8Array(key.rawId);
      const salt = new Uint8Array(key.salt);
      encrypt(salt, fileContent, new Uint8Array([1, 2, 3, 4]), rawId, key.transports).then(cipher => {
        console.log(cipher);
        window.api.fs.writeFile(path, cipher);
      });
    });
  };

  const decryptFile = () => {
    window.api.webauthnKey.getKeys('C:\\Users\\sebas\\test').then(keys => {
      let key = keys[0];
      const rawId = new Uint8Array(key.rawId);
      const salt = new Uint8Array(key.salt);
      decrypt(salt, fileContent, new Uint8Array([1, 2, 3, 4]), rawId, key.transports).then(text => {
        console.log(text)
        window.api.fs.writeFile(path, text);
      });
    });
  };
</script>

<div class="container">
  <div class="head">
    <h1 class="HUGE">Note title</h1>
    <button on:click={encryptFile}>Encrypt</button>
    <button on:click={decryptFile}>Decrypt</button>
  </div>
  <section class="editor">
    <textarea contentEditable autocapitalize="off" spellcheck="false" bind:value={fileContent}></textarea>
  </section>
</div>

<style>
  .container {
    width: 100%;
    height: 100%;
    padding: 1.19rem;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    background-color: var(--primary-10);
  }

  .editor {
    margin: 19px 115px;
  }

  .editor > div {
    display: block;
    resize: none;
    border: none;
    outline: none;
    min-height: 5rem;
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;
    background-color: var(--transparent);
    border-right: 0.3px solid var(--primary-100-text, #112A46);
    border-left: 0.3px solid var(--primary-100-text, #112A46);
    overflow: auto;
    font-weight: 500;
  }
</style>