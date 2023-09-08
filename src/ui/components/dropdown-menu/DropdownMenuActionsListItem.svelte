<script lang="ts">
  import { DropdownMenuItem } from "./dropdown-menu-config";
  import SmallIconButton from "../buttons/SmallIconButton.svelte";

  export let action: DropdownMenuItem;

  const subMenuClick = (e: KeyboardEvent) => {
    e.stopPropagation();
    e.preventDefault();
  }

  const actionWrapper = (e: KeyboardEvent, action: (e: KeyboardEvent) => void) => {
    e.stopPropagation();
    e.preventDefault();
    action(e);
  }
</script>

<button class="main-menu-btn small" on:click={action.action}>
  {action.name}
  {#if action.subItems && action.subItems.length > 0}
    <SmallIconButton
      color="--transparent"
      hoverColor="--transparent"
      iconSrc='icons/toggle-arrow.svg'
      alt='show-options'
      onClick={subMenuClick}
      width={15}
      height={15}
      imgStyle="height: 10px; transform: rotateZ(90deg);"
    />
    <ul>
      {#each action.subItems as subItem}
        <li>
          <button on:click={(e) => {actionWrapper(e, subItem.action)}} class="small sub-menu-btn">
            {subItem.name}
          </button>
        </li>
      {/each}
    </ul>
  {/if}
</button>

<style lang="scss">
  .main-menu-btn {
    white-space: nowrap;
    cursor: pointer;
    height: 100%;
    width: 100%;
    text-align: left;
    padding: 5px 10px;
    display: flex;
    align-items: center;
    gap: 7px;
    position: relative;

    &:hover {
      padding-bottom: 3px;
      border-bottom: 2px solid var(--primary-100);
      & > ul {
        display: flex;
        flex-direction: column;
      }
    }
  }

  .sub-menu-btn {
    cursor: pointer;
    padding: 5px 10px;
    width: 100%;
    &:hover {
      background-color: var(--primary-70);
    }
  }

  ul {
    display: none;
    position: absolute;
    top: calc(100% + 2px);
    left: 0;
    background-color: var(--primary-10);
    width: 100%;
  }
</style>
