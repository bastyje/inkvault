<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { TreeViewElement } from "./tree-view-element";

  export let self: TreeViewElement;
  const dispatch = createEventDispatcher();

  const onClick = () => {
    dispatch('click', self);
  }
</script>
<button on:click={onClick} class="small">{self.name}</button>