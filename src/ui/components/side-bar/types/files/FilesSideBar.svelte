<script lang="ts">
  import TextEditor from "../../../text-editor/TextEditor.svelte";
  import List from "../../../list/tree-list-object/List.svelte";
  import { FileSidebarElement } from "./file-sidebar-element";
  import { TabStore } from "../../../../storage/tab-store";
  import { FileInfo } from "../../../../../shared/file-info";
  import { mapTree } from "../../../../../utils/converters";
  import { VaultStorage } from "../../../../storage/vault-storage";
  import { VaultData } from "../../../../../shared/vault-info";
  import { TabStores } from "../../../../storage/tab-stores";

  let vault: VaultData | null, tabStore: TabStore;
  let onLeafClick;
  TabStore.getName().then(n => {
    tabStore = TabStores.instance.get(n);

    onLeafClick = (file: FileSidebarElement) => {
      tabStore.openTab(file.name, TextEditor, { path: file.path });
    };
  });

  VaultStorage.instance.vault.then(v => {
    vault = v;
    if (v !== null) {
      getFileTree(v.path);
    }
  });

  let files = {children: []} as FileSidebarElement;
  const getFileTree = (path: string) => {
    window.api.fs.getFileTree(path).then(tree => {
      files = mapTree<FileInfo, FileSidebarElement>({
        children: tree,
        name: 'root',
        path: path,
        type: 'directory'
      } as FileInfo, elem => ({
        isLeaf: elem.type !== 'directory',
        name: elem.name,
        path: elem.path,
        component: elem.type !== 'directory' ? TextEditor : null
      } as FileSidebarElement));
    });
  }

  VaultStorage.instance.on('change', e => {
    getFileTree(e.vault.path);
  });
</script>

{#if vault !== null}
  <List
    elements={files.children}
    {onLeafClick}
  />
{:else }
  No vault is open
{/if}