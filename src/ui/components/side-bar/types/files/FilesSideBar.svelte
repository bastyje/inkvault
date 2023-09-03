<script lang="ts">
  import { getContext } from "svelte";
  import TextEditor from "../../../TextEditor.svelte";
  import List from "../../../list/tree-list-object/List.svelte";
  import { FileSidebarElement } from "./file-sidebar-element";
  import { TabStore } from "../../../tabs/tab-store";
  import { FileInfo } from "../../../../../shared/file-info";
  import { mapTree } from "../../../../../utils/converters";

  const tabStore: TabStore = getContext(`tab-group-${'undefined'}`);
  const onLeafClick = (file: FileSidebarElement) => {
    window.api.fs.readFile(file.path, '').then(text => {
      tabStore.openTab(file.name, TextEditor, {fileContent: text, path: file.path});
    });
  }

  let files = {children: []} as FileSidebarElement;
  window.api.fs.getFileTree('C:\\Users\\sebas\\test').then(tree => {
    files = mapTree<FileInfo, FileSidebarElement>({
      children: tree,
      name: 'root',
      path: 'C:\\Users\\sebas\\test',
      type: 'directory'
    } as FileInfo, elem => ({
      isLeaf: elem.type !== 'directory',
      name: elem.name,
      path: elem.path,
      component: elem.type !== 'directory' ? TextEditor : null
    } as FileSidebarElement));
  });
</script>

<List
  elements={files.children}
  {onLeafClick}
/>