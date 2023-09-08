<script>
  import TitleBarButtons from "./TitleBarButtons.svelte";
  import TabBar from "../tabs/TabBar.svelte";
  import { MAIN_TAB_BAR_NAME } from "../tabs/tab-bars-names";
</script>

<nav class="title-bar">
  <div class="left-side">
    <div class="logo-container">
      <img class="logo" src="icons/logo.svg" alt="logo">
    </div>
    <TabBar></TabBar>
  </div>
  <TitleBarButtons/>
</nav>

<style lang="scss">
  .title-bar {
    height: 39px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--primary-100);
    -webkit-app-region: drag;
    cursor: pointer;
  }

  .logo-container {
    height: 100%;
    width: 54px;
    display: flex;
    align-items: center;
    justify-content: center;
    & > .logo {
      height: 15px;
    }
  }

  .left-side {
    display: flex;
    align-items: center;
    height: 100%;
  }
</style>