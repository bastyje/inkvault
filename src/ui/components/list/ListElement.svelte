<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { ListRecord } from "./list-record";

  export let self: ListRecord;
  const dispatch = createEventDispatcher();

  const onClick = () => {
    dispatch('click', self);
  }
</script>
<button on:click={onClick} class="small">{self.name}</button>

<style>
  button {
    position: relative;
    left: 15px;
  }
</style>