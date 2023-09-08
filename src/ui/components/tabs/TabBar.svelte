<script>
  import Tab from "./Tab.svelte";
  import SmallIconButton from "../buttons/SmallIconButton.svelte";
  import TextEditor from "../text-editor/TextEditor.svelte";
  import { TabStore } from "../../storage/tab-store";
  import { TabStores } from "../../storage/tab-stores";

  let tabStore, tabs = [], selectedName;
  let changeSelection, openTab, closeTab;
  TabStore.getName().then(n => {
    tabStore = TabStores.instance.get(n);
    tabs = tabStore.getTabs();
    selectedName = tabStore.getSelectedName();

    tabStore.on('selectedChanged', e => {
      selectedName = e.selectedTabName;
    });

    tabStore.on('tabOpened', e => {
      selectedName = e.selected;
      tabs = e.tabs;
    });

    tabStore.on('tabClosed', e => {
      selectedName = e.selected;
      tabs = e.tabs;
    });

    changeSelection = (event) => {
      tabStore.selectTab(event.detail.tabName);
    };

    openTab = () => {
      tabStore.openTab('new-file', TextEditor, {path: 'new-file'});
    };

    closeTab = (e) => {
      tabStore.closeTab(e.detail.tabName);
    };
  });

</script>

<div class="tabs-container">
  {#each tabs as tab}
    <Tab on:select={changeSelection} on:removeButtonClicked={closeTab} tabName={tab.name} selected={tab.name === selectedName}></Tab>
  {/each}
  <SmallIconButton
    iconSrc="icons/plus.svg"
    alt="add tab"
    color="--transparent"
    hoverColor="--primary-70"
    width={20}
    height={20}
    onClick={openTab}
  ></SmallIconButton>
</div>

<style>
  .tabs-container {
    display: flex;
    align-items: center;
    gap: 10px;
    height: calc(100% - 1px);
    -webkit-app-region: no-drag;
    cursor: auto;
  }
</style>