<script>
  import { getContext } from "svelte";
  export let contextName;

  const tabStore = getContext(`tab-group-${contextName}`);

  let { component, data } = tabStore.getSelectedComponent();
  tabStore.on('selectedChanged', _ => {
    const result = tabStore.getSelectedComponent();
    component = result.component;
    data = result.data;
  });
</script>

<svelte:component this={component} {...data}></svelte:component>