<script>
  import TitleBar from "../components/title-bar/TitleBar.svelte";
  import SideBar from "../components/side-bar/core/SideBar.svelte";
  import TabOutlet from "../components/tabs/TabOutlet.svelte";
  import TabGroup from "../components/tabs/TabGroup.svelte";
</script>

<div class="layout">
  <TabGroup>
    <TitleBar></TitleBar>
    <div class="page">
      <SideBar></SideBar>
      <main>
        <TabOutlet></TabOutlet>
      </main>
    </div>
  </TabGroup>
</div>

<style>
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
  }
</style>

