<script lang="ts">
  export let id: string, value: string = '';
</script>

<input id={id} type="text" class="small" bind:value={value}>

<style>
  input {
    border-radius: 4px;
    border: 1px solid var(--primary-100, #A9CD95);
    background: var(--primary-70, #E0EDD9);
    padding: 5px 10px;
    outline: none;
  }
</style>