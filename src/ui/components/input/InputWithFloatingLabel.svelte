<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let id: string, label: string, file: boolean = false, value: string = '';
  const dispatch = createEventDispatcher();

  const onClick = () => {
    window.api.fs.getPathFromModal().then(path => {
      dispatch('fileSelect', { path })
    });
  };
</script>

<div class="container">
  <label for={id} class="little little--bold">{label}</label>
  <input {id} class="small" type="text" bind:value={value}>
  {#if file}
    <button on:click={onClick}><img src="icons/folder.svg" alt="select-file"></button>
  {/if}
</div>

<style>
  .container {
    position: relative;
    margin-top: 7px;
    border-radius: 4px;
    border: 1px solid var(--primary-100);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 10px;
  }

  label {
    position: absolute;
    top: 0;
    transform: translateY(-50%) translateX(10px);
    background-color: var(--primary-70);
  }

  input {
    border-radius: inherit;
    background-color: var(--primary-70);
    border: none;
    flex-grow: 1;
  }

  button {
    cursor: pointer;
    height: 15px;
    & > img {
      height: 15px;
    }
  }
</style>