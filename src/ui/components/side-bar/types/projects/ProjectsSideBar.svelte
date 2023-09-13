<script lang="ts">
  import List from "../../../list/list/List.svelte";
  import { ProjectView } from "./project-view";
  import { VaultStorage } from "../../../../storage/vault-storage";
  import { VaultInfo } from "../../../../../shared/vault-info";
  import InputWithFloatingLabel from "../../../input/InputWithFloatingLabel.svelte";
  import TextButton from "../../../buttons/TextButton.svelte";

  export let opened: boolean = false;
  let projects: ProjectView[] = [];
  let filePath = '', projectName = '';
  window.api.fs.getAllVaultsFromComputer().then(r => {
    projects = r;
  });

  const onLeafClick = (e: VaultInfo) => {
    VaultStorage.instance.changeVault(e);
  };

  const onFileSelect = e => {
    filePath = e.detail.path;
  }
  const stringNotEmpty = (str: string) => str !== '';
  const submitNewProject = () => {
    if (stringNotEmpty(filePath) && stringNotEmpty(projectName)) {
      window.api.fs.createNewVault(filePath, projectName).then(r => {
        if (r === null) {
          return;
        }
        window.api.fs.getAllVaultsFromComputer().then(r => {
          projects = r;
        });
      });
    }
  }
</script>

<div class:hidden={!opened}>
  <section class="create-project">
    <InputWithFloatingLabel bind:value={projectName} label="Project name" id="project-name"/>
    <InputWithFloatingLabel on:fileSelect={onFileSelect} bind:value={filePath} label="Project location" id="project-location" file={true}/>
    <TextButton id="create-project" text="Create" onClick={submitNewProject}/>
  </section>
  <section>
    <List elements={projects} onElementClick={onLeafClick}/>
  </section>
</div>

<style>
  .hidden {
    display: none;
  }

  .create-project {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
</style>