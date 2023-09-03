<script lang="ts">
  import { TableConfig } from "./table-config";

  export let data: ArrayLike<any>, config: TableConfig;
</script>

<table>
  <thead>
    <tr>
      {#each config.columns as column}
        <th class="normal normal--bold">{column.displayName}</th>
      {/each}
    </tr>
  </thead>
  <tbody>
  {#each data as record}
    <tr>
      {#each config.columns as column}
        <td class="normal">{record[column.id]}</td>
      {/each}
    </tr>
  {/each}
  </tbody>
</table>

<style>
  table {
    background-color: var(--primary-70);
    border-radius: 8px;
    padding: 5px;
  }

  th, td {
    padding: 2px 8px;
    text-align: start;
  }

  th {
    border-bottom: 1px solid var(--primary-100);
  }
</style>