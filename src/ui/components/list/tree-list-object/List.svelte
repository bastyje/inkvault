<script lang="ts" generics="T extends TreeViewElement">
  import Node from "./Node.svelte";
  import { TreeViewElement} from "./tree-view-element";

  export let elements: T[], onLeafClick: (leaf: T) => void;
</script>

<Node
  onLeafClick={onLeafClick}
  children={elements}
  isRoot={true}
  name="root"
/>