<script lang="ts" generics="T extends TreeViewElement">
  import Leaf from "../ListElement.svelte";
  import { TreeViewElement } from './tree-view-element';

  export let isRoot: boolean, name: string, children: T[], onLeafClick: (leaf: T) => void;
  let opened = false, focused = false;

  const toggle = () => {
    opened = !opened;
  }

</script>
{#if !isRoot}
  <button class="arrow small" on:click={toggle}>
    <img draggable="false"
         class="non-selectable"
         class:rotated={opened}
         src="icons/toggle-arrow.svg"
         alt="toggle"
    >
    <span>{name}</span>
  </button>
{/if}
{#if opened || isRoot}
  <ul class:margin={!isRoot}>
    {#each children as child}
      <li>
        {#if child.isLeaf}
          <Leaf self={child} on:click={(e) => { onLeafClick(e.detail) }}/>
        {:else}
          <svelte:self isRoot={false} name={child.name} children={child.children} {onLeafClick}/>
        {/if}
      </li>
    {/each}
  </ul>
{/if}

<style lang="scss">
  .arrow {
    left: 15px;
    position: relative;
    width: 100%;
    text-align: left;
    box-sizing: border-box;

    &:focus {
      background-color: var(--primary-100);
    }

    & > img {
      height: 10px;
      top: 50%;
      position: relative;
    }

    & > span {
      position: absolute;
      left: 15px;
    }
  }

  .rotated {
    transform: rotateZ(90deg);
  }

  .margin {
    margin-left: 15px;
    box-sizing: border-box;
  }
</style>