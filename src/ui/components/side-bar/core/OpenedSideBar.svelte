<script lang="ts">
  import { SideBarFeature } from "./side-bar-features";
  import SmallIconButton from "../../buttons/SmallIconButton.svelte";

  export let feature: SideBarFeature;
</script>

{#if feature.component}
  <div class="container">
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
    <svelte:component this={feature.component}/>
  </div>
{/if}

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

</style>