<script>
  import TreeList from "./TreeList.svelte";

  export let name, getChildrenCallback, elementNameSelector, isLeafSelector, relativePath, leafClickAction;

  let newPath = `${relativePath}/${name}`;
  let opened = false;

  const toggle = () => {
    opened = !opened;
  }
</script>

<div class="node non-selectable">
  <button class="arrow" on:click={toggle}>
    <img draggable="false" class="non-selectable" class:rotated={opened} src="icons/toggle-arrow.svg" alt="toggle">
  </button>
  {name}
  <div class="padding-left">
    {#if opened}
      <TreeList
        elementNameSelector={elementNameSelector}
        getChildrenCallback={getChildrenCallback}
        isLeafSelector={isLeafSelector}
        relativePath={newPath}
        leafClickAction={leafClickAction}
      />
    {/if}
  </div>
</div>

<style>
  .node {
    position: relative;
  }

  .padding-left {
    padding-left: 15px;
  }

  .arrow {
    position: absolute;
    left: -15px;
    top: 5px;
  }

  .arrow > img {
    height: 10px;
  }

  .rotated {
    transform: rotateZ(90deg);
  }
</style>