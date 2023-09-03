<script lang="ts">
  import List from "../../../list/tree-list-object/List.svelte";
  import { SETTINGS_TREE } from "./settings-tree-element";
  import { getContext } from "svelte";
  import { TabStore } from "../../../tabs/tab-store";

  const tabStore = getContext(`tab-group-${'undefined'}`) as TabStore;

</script>

<List
  elements={SETTINGS_TREE.children}
  onLeafClick={(leaf) => { tabStore.openTab(leaf.name, leaf.component) }}
/>