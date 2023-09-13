<script lang="ts">
  import { SideBarFeature } from "./side-bar-features";
  import SmallIconButton from "../../buttons/SmallIconButton.svelte";
  import { onMount } from "svelte";

  export let feature: SideBarFeature, ref: any, opened: boolean;
</script>

<div class:hide={!opened} class="container">
  <div class="header">
    <h2 class="normal">{feature.name}</h2>
    {#each feature.actions as action}
      <SmallIconButton
        color="--transparent"
        hoverColor="--primary-100"
        iconSrc={action.icon}
        alt={action.name}
        onClick={action.handler}
        width={21}
        height={21}
      />
    {/each}
  </div>
  <div bind:this={ref}></div>
</div>

<style>
  .container {
    padding: 10px 14px;
    min-width: 178px;
    border-right: 1px solid var(--primary-100);
    background: var(--primary-70);
  }

  .header {
    display: flex;
    justify-content: space-between;
  }

  h2 {
    text-transform: uppercase;
  }

  .hide {
    display: none;
  }
</style>