<script lang="ts" generics="T extends ListRecord">
  import ListElement from "../ListElement.svelte";
  import { ListRecord } from "../list-record";

  export let elements: ListRecord[] = [], onElementClick: (e: T) => void;
</script>

<ul>
  {#each elements as element}
    <li>
      <ListElement self={element} on:click={e => { onElementClick(e.detail) }}/>
    </li>
  {/each}
</ul>