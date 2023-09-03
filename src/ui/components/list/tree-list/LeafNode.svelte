<script>
  export let name, leafClickAction, relativePath;

  let realPath = `${relativePath}/${name}`;
</script>
<div class="non-selectable" on:click={() => { leafClickAction(realPath) }}>
  {name}
</div>
