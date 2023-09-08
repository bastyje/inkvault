<script>
  import { TabStore } from "../../storage/tab-store";
  import { TabStores } from "../../storage/tab-stores";

  export let ref;
  let instance, tabStore, selected;
  TabStore.getName().then(n => {
    tabStore = TabStores.instance.get(n);
    selected = tabStore.getSelectedComponent();

    setTimeout(_ => {
      instance = new selected.component({
        target: ref,
        props: selected.data
      });
    }, 0);

    tabStore.on('selectedChanged', _ => {
      selected = tabStore.getSelectedComponent();
      if (instance) {
        instance.$destroy()
      }
      instance = new selected.component({
        target: ref,
        props: selected.data
      });
    });

    tabStore.on('tabClosed', _ => {

    });
  });
</script>