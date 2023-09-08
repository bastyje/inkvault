<script lang="ts">
  import List from "../../../list/tree-list-object/List.svelte";
  import { SETTINGS_TREE } from "./settings-tree-element";
  import { TabStore } from "../../../../storage/tab-store";
  import { TabStores } from "../../../../storage/tab-stores";

  let tabStore: TabStore| null;
  TabStore.getName().then(n => {
    tabStore = TabStores.instance.get(n);
  });

</script>

<List
  elements={SETTINGS_TREE.children}
  onLeafClick={(leaf) => { tabStore.openTab(leaf.name, leaf.component) }}
/>