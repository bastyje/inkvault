<script lang="ts" generics="T extends TreeViewElement">
  import Node from "./Node.svelte";

  export let elements: T[], onLeafClick: (leaf: T) => void;
  console.log(elements)
</script>

<Node
  onLeafClick={onLeafClick}
  children={elements}
  isRoot={true}
  name="root"
/>