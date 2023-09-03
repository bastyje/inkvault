<script lang="ts">
  import MainSideBar from "./MainSideBar.svelte";
  import OpenedSideBar from "./OpenedSideBar.svelte";
  import { EMPTY_FEATURE, SIDE_BAR_FEATURES, SideBarFeature } from "./side-bar-features";

let feature: SideBarFeature = EMPTY_FEATURE;

  const changeSelection = (e) => {
    const sideBarName = e.detail.sideBarName;
    if (sideBarName !== null && sideBarName !== undefined) {
      const foundFeature = SIDE_BAR_FEATURES.find(f => f.name === sideBarName);
      feature = foundFeature !== undefined ? foundFeature : EMPTY_FEATURE;
    } else feature = EMPTY_FEATURE;
  };
</script>

<div>
  <MainSideBar on:sidebarChange={changeSelection} sideBarFeatures={SIDE_BAR_FEATURES}/>
  <OpenedSideBar {feature}></OpenedSideBar>
</div>

<style>
  div {
    display: flex;
  }
</style>