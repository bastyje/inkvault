<script lang="ts">

import Table from "../../../../table/Table.svelte";
import { TableColumnConfig, TableConfig } from "../../../../table/table-config";
import TextInput from "../../../../input/TextInput.svelte";
import InputGroup from "../../../../input/InputGroup.svelte";
import Form from "../../../../input/Form.svelte";
import TextButton from "../../../../buttons/TextButton.svelte";
import { WebAuthnKeyInfo } from "../../../../../../shared/web-authn-key-info";
import { shouldNotBeEmpty } from "../../../../../validation/guard";
import { register } from "./webauthn";
import { VaultStorage } from "../../../../../storage/vault-storage";

let name: string, userDisplayName: string, userEmail: string, salt: string;

let data: WebAuthnKeyInfo[] = [];
const vaultStorage = VaultStorage.instance;

vaultStorage.vault.then(v => {
  console.log(v)
  if (v !== null) {
    data = v.keys;
  }
});

vaultStorage.on('change', e => {
  data = e.vault.keys;
  console.log('data', data)
});

const localId = 'local', globalId = 'global';

const onSubmit = (e: SubmitEvent) => {
  e.preventDefault();
  e.stopPropagation();

  shouldNotBeEmpty(name);
  shouldNotBeEmpty(userDisplayName);
  shouldNotBeEmpty(userEmail);

  if (salt === '') {
    salt = 'asd';
  }

  register(userEmail, userDisplayName, new TextEncoder().encode(salt)).then(keyInfo => {
    keyInfo.userDisplayName = userDisplayName;
    keyInfo.userEmail = userEmail;
    keyInfo.keyName = name;
    keyInfo.salt = Array.from(keyInfo.salt);
    keyInfo.rawId = Array.from(keyInfo.rawId);

    switch (e.submitter?.id) {
      case localId:
        vaultStorage.vault.then(v => {
          if (v !== null) {
            window.api.webauthnKey.createLocal(v.path, keyInfo).then(_ => {
              window.api.webauthnKey.getKeys(v.path).then(d => { data = d; });
            });
          }
        });
        break;
      case globalId:
        vaultStorage.vault.then(v => {
          if (v !== null) {
            window.api.webauthnKey.createLocal(v.path, keyInfo).then(_ => {
              window.api.webauthnKey.getKeys(v.path).then(d => { data = d; });
            });
          }
        });
        break;
    }

    (e.target as HTMLFormElement).reset();
  });
}

const config = {
  columns: [
    {
      id: 'keyName',
      displayName: 'Key name',
      dataType: 'string'
    } as TableColumnConfig,
    {
      id: 'userDisplayName',
      displayName: 'User display name',
      dataType: 'string'
    } as TableColumnConfig,
    {
      id: 'userEmail',
      displayName: 'User email',
      dataType: 'string'
    } as TableColumnConfig
  ]
} as TableConfig;
</script>

<h2 class="HUGE title">WebAuthn</h2>
<div class="content">
  <section>
    <h3 class="LARGE subtitle">Global WebAuthn keys</h3>
    <Table {data} {config} />
  </section>
  <section>
    <h3 class="LARGE subtitle">WebAuthn keys assigned to this vault</h3>
    <Table {data} {config} />
  </section>
  <section>
    <h3 class="LARGE subtitle">Create new key</h3>
    <Form {onSubmit}>
      <InputGroup inputId="name" label="Name">
        <TextInput id="name" bind:value={name}/>
      </InputGroup>
      <InputGroup inputId="userDisplayName" label="User display name">
        <TextInput id="userDisplayName" bind:value={userDisplayName}/>
      </InputGroup>
      <InputGroup inputId="userEmail" label="User email">
        <TextInput id="userEmail" bind:value={userEmail}/>
      </InputGroup>
      <InputGroup inputId="salt" label="Salt (optional)">
        <TextInput id="salt" bind:value={salt}/>
      </InputGroup>
      <div class="buttons">
        <TextButton id="local" type="submit" text="Create as local"></TextButton>
        <TextButton id="global" type="submit" text="Create as global"></TextButton>
      </div>
    </Form>
  </section>
</div>

<style>
  .title {
    margin: 15px 17px
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 35px;
    box-sizing: border-box;
    margin: 35px 118px;
  }

  .subtitle {
    margin-bottom: 19px;
  }

  .buttons {
    display: flex;
    gap: 10px;
  }
</style>
