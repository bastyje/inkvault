<script lang="ts">
  import MainSideBar from "./MainSideBar.svelte";
  import OpenedSideBar from "./OpenedSideBar.svelte";
  import { EMPTY_FEATURE, SIDE_BAR_FEATURES, SideBarFeature } from "./side-bar-features";
  import { onMount } from "svelte";

  let ref: any, sideBars, opened = false;
  onMount(() => {
    sideBars = SIDE_BAR_FEATURES.map(s => ({
      name: s.name,
      componentInstance: new s.component({target: ref})
    }));
  });

  let feature: SideBarFeature = EMPTY_FEATURE;
  const changeSelection = (e) => {
    const sideBarName = e.detail.sideBarName;
    if (sideBarName !== null && sideBarName !== undefined) {
      const foundFeature = SIDE_BAR_FEATURES.find(f => f.name === sideBarName);
      sideBars.find(s => s.name === feature.name)?.componentInstance.$set({opened: false});
      feature = foundFeature !== undefined ? foundFeature : EMPTY_FEATURE;
      sideBars.find(s => s.name === sideBarName).componentInstance.$set({opened: true})
      opened = true;
    } else {
      sideBars.find(s => s.name === feature.name).componentInstance.$set({opened: false});
      feature = EMPTY_FEATURE;
      opened = false;
    }
  };

</script>

<div>
  <MainSideBar on:sidebarChange={changeSelection} sideBarFeatures={SIDE_BAR_FEATURES}/>
  <OpenedSideBar {opened} {feature} bind:ref={ref}></OpenedSideBar>
</div>

<style>
  div {
    display: flex;
  }
</style>