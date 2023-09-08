<script lang="ts">
  import TitleBar from "../components/title-bar/TitleBar.svelte";
  import SideBar from "../components/side-bar/core/SideBar.svelte";
  import TabOutlet from "../components/tabs/TabOutlet.svelte";
  import TabGroup from "../components/tabs/TabGroup.svelte";

  let ref;
</script>

<div class="layout">
  <TabGroup>
    <TitleBar></TitleBar>
    <div class="page">
      <SideBar></SideBar>
      <main bind:this={ref}>
        <TabOutlet {ref}></TabOutlet>
      </main>
    </div>
  </TabGroup>
</div>

<style lang="scss">
  .layout {
    height: 100%;
  }

  .page {
    height: calc(100% - 40px);
    width: 100%;
    display: flex;
  }

  main {
    flex-grow: 1;
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 10px;
      border-radius: 8px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: var(--primary-70);
      &:hover {
        background-color: var(--primary-100);
      }
    }
    &::-webkit-scrollbar-track {
      background-color: var(--transparent);
    }
  }
</style>

