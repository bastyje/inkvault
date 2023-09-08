<script lang="ts">
  import SmallIconButton from "../buttons/SmallIconButton.svelte";
  import { DropdownMenuConfig } from "./dropdown-menu-config";
  import DropdownMenuActionsListItem from "./DropdownMenuActionsListItem.svelte";

  export let config: DropdownMenuConfig = {} as DropdownMenuConfig;
  let toggled;

  const toggle = () => {
    toggled = !toggled;
  }

</script>

<div class="menu-container">
  <SmallIconButton
    color="--transparent"
    hoverColor="--transparent"
    iconSrc='icons/three-dots.svg'
    alt='show-file-menu'
    onClick={toggle}
    width={30}
    height={30}
    imgStyle="transform: rotateZ(90deg) scale(1.5);"
  />

  <ul class:toggled={toggled === true} class:untoggled={toggled === false}>
    {#each config.items as action}
      <li>
        <DropdownMenuActionsListItem {action}/>
      </li>
    {/each}
  </ul>
</div>

<style lang="scss">
  $x-position: -170px;

  .menu-container {
    display: flex;
    gap: 15px;
  }

  ul {
    display: none;
  }


  .untoggled {
    display: flex;
    animation: slide-out-bck-left 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
  }

  .toggled {
    display: flex;
    animation: slide-in-fwd-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  }

  @keyframes slide-in-fwd-left {
    0% {
      transform: translateX($x-position) scaleX(0);
      opacity: 0;
    }
    100% {
      transform: translateX(0) scaleX(1);
      opacity: 1;
    }
  }

  @keyframes slide-out-bck-left {
    0% {
      transform: translateX(0) scaleX(1);
      opacity: 1;
    }
    100% {
      transform: translateX($x-position) scaleX(0);
      opacity: 0;
    }
  }



</style>