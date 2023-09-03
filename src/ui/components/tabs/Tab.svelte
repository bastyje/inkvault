<script>
  import { createEventDispatcher } from "svelte";

  export let tabName, selected;
  const dispatch = createEventDispatcher();
  const onSelect = () => {
    dispatch('select', {
      tabName: tabName
    });
  };

  const onRemoveButtonClicked = (e) => {
    e.preventDefault();
    dispatch('removeButtonClicked', {
      tabName: tabName
    })
  };
</script>

<button tabindex={-1} on:click={() => { onSelect() }} class="non-selectable tab normal" class:selected={selected}>
  {tabName}
  <button tabindex={-1} class="close-btn" on:click={(e) => { onRemoveButtonClicked(e) }}>
    <img draggable="false" class="non-selectable" src="icons/x.svg" alt="close">
  </button>
</button>

<style>
  .tab {
    display: flex;
    align-items: center;
    gap: 20px;
    background-color: var(--transparent);
    border-radius: 8px;
    max-width: 203px;
    padding: 5px 14px 5px 14px;
    box-sizing: border-box;
    max-height: 33px;
  }

  .close-btn {
    display: flex;
    align-items: center;
  }

  img {
    height: 10px;
    cursor: pointer;
  }

  .selected {
    background-color: var(--secondary-100);
    color: var(--primary-100-text);
  }
</style>
