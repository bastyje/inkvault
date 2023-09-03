<script lang="ts">
  export let inputId: string, label: string;
</script>

<div class="container">
  <label class="normal" for={inputId}>{label}</label>
  <slot/>
</div>

<style>
  .container {
    display: flex;
    gap: 10px;
    align-items: center;
  }
</style>