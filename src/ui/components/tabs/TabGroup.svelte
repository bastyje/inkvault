<script lang="ts">
  import { setContext } from "svelte";
  import { TabStore, Tab } from "./tab-store";
  import Example2 from "../Example2.svelte";
  import Hello from "../Hello.svelte";
  import WebAuthnSettings from "../side-bar/types/settings/webauthn-settings/WebAuthnSettings.svelte";

  export let contextName: string;

  const tabStore = new TabStore(
    new Tab('Welcome', Hello, {}),
    new Tab('example 1', WebAuthnSettings, {}),
    new Tab('example 2', Example2, {})
  );

  setContext(`tab-group-${contextName}`, tabStore);
</script>

<slot/>