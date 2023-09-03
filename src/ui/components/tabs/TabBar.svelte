<script>
  import { getContext} from "svelte";
  import Tab from "./Tab.svelte";
  import SmallIconButton from "../buttons/SmallIconButton.svelte";
  import TextEditor from "../TextEditor.svelte";

  export let contextName;

  const tabStore = getContext(`tab-group-${contextName}`);
  let tabs = tabStore.getTabs();
  let selectedName = tabStore.getSelectedName();

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

  const changeSelection = (event) => {
    tabStore.selectTab(event.detail.tabName);
  }

  const openTab = () => {
    tabStore.openTab('Test', TextEditor);
  }

  const closeTab = (e) => {
    tabStore.closeTab(e.detail.tabName);
  }
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