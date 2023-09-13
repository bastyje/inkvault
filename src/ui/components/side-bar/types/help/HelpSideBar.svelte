<script lang="ts">
  export let opened: boolean = false;
</script>

<div class:hidden={!opened}>
</div>

<style>
  .hidden {
    display: none;
  }
</style>