<script>
  import LeafNode from "./LeafNode.svelte";
  import InternalNode from "./InternalNode.svelte";

  export let elementNameSelector, isLeafSelector, getChildrenCallback, relativePath, leafClickAction;
  let list = [];
  getChildrenCallback(relativePath).then(r => { list = r; });
</script>

<ul>
  {#each list as elem}
    <li>
      {#if isLeafSelector(elem)}
        <LeafNode
          name={elementNameSelector(elem)}
          leafClickAction={leafClickAction}
          relativePath="{relativePath}"
        />
      {:else}
        <InternalNode
          name={elementNameSelector(elem)}
          getChildrenCallback={getChildrenCallback}
          isLeafSelector={isLeafSelector}
          elementNameSelector={elementNameSelector}
          relativePath={relativePath}
          leafClickAction={leafClickAction}
        />
      {/if}
    </li>
  {/each}
</ul>

<style>
  ul {
    margin-left: 15px;
    box-sizing: border-box;
  }
</style>