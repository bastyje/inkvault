<script>
  import { createEventDispatcher } from "svelte";
  import RadioButtonGroup from "../../buttons/radio-group/RadioButtonGroup.svelte";

  export let sideBarFeatures;

  const dispatch = createEventDispatcher();
  const sidebarChange = (name) => {
    dispatch('sidebarChange', {
      sideBarName: name
    });
  };


</script>

<div class="non-selectable" draggable="false">
  <RadioButtonGroup
    buttons={sideBarFeatures}
    height={30}
    width={30}
    color="--transparent"
    clickedColor="--primary-100"
    hoverColor="--primary-100"
    on:radioChange={(e) => { sidebarChange(e.detail.radioButtonObject?.name) }}
  ></RadioButtonGroup>
</div>

<style lang="scss">
  div {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 53px;
    min-width: 53px;
    max-width: 53px;
    height: 100%;
    border-right: 1px solid var(--primary-100);
    background: var(--primary-70);
    padding-top: 19px;
    gap: 19px;
  }
</style>