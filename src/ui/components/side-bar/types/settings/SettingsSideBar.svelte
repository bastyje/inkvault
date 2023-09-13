<script lang="ts">
  import List from "../../../list/tree-list/TreeList.svelte";
  import { SETTINGS_TREE } from "./settings-tree-element";
  import { TabStore } from "../../../../storage/tab-store";
  import { TabStores } from "../../../../storage/tab-stores";

  export let opened: boolean = false;
  let tabStore: TabStore | null;
  TabStore.getName().then(n => {
    tabStore = TabStores.instance.get(n);
  });

</script>

<div class:hidden={!opened}>
  <List
    elements={SETTINGS_TREE.children}
    onLeafClick={(leaf) => { tabStore.openTab(leaf.name, leaf.component) }}
  />
</div>

<style>
  .hidden {
    display: none;
  }
</style>
