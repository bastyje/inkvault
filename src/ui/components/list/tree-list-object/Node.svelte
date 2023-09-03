<script lang="ts" generics="T extends TreeViewElement">
  import Leaf from "./Leaf.svelte";

  export let isRoot: boolean, name: string, children: T[], onLeafClick: (leaf: T) => void;
  let opened = false;
  console.log(children)

  const toggle = () => {
    opened = !opened;
  }

</script>
{#if !isRoot}
  <button class="arrow small" on:click={toggle}>
    <img draggable="false" class="non-selectable" class:rotated={opened} src="icons/toggle-arrow.svg" alt="toggle">
    {name}
  </button>
{/if}
{#if opened || isRoot}
  <ul class:margin={!isRoot}>
    {#each children as child}
      <li>
        {#if child.isLeaf}
          <Leaf self={child} on:click={(e) => { onLeafClick(e.detail) }}/>
        {:else}
          <svelte:self isRoot={false} name={child.name} children={child.children} {onLeafClick} />
        {/if}
      </li>
    {/each}
  </ul>
{/if}

<style>
  .arrow {
    left: -15px;
    top: 5px;
  }

  .arrow > img {
    height: 10px;
    margin-right: 5px;
  }

  .rotated {
    transform: rotateZ(90deg);
  }

  .margin {
    margin-left: 15px;
    box-sizing: border-box;
  }
</style>