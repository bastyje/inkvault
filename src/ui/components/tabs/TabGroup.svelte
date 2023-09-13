<script lang="ts">
  import { TabStore, Tab } from "../../storage/tab-store";
  import Hello from "../Hello.svelte";
  import { TabStores } from "../../storage/tab-stores";

  TabStore.getName().then(n => {
    if (n) {
      TabStores.instance.add(n, new TabStore(
        n,
        new Tab('Welcome', Hello, {}),
      ))
    }
  });

</script>

<slot/>