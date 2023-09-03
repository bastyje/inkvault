<script lang="ts">
  import { GuardException } from "../../validation/guard";
  import { ErrorMessage } from "../../validation/error-messages";

  export let onSubmit: (e: SubmitEvent) => void;
  let errors: ErrorMessage[] = []

  const onSubmitWrapper = (e: SubmitEvent): void => {
    errors = [];
    try {
      onSubmit(e);
    } catch (e) {
      if (e instanceof GuardException) {
        errors = [...errors, e.errorMessage];
      }
    }
  }
</script>

<form class="container" on:submit={onSubmitWrapper}>
  <slot/>
</form>
{#if errors.length > 0}
  <ul>
    {#each errors as error}
      <li>{error.message}</li>
    {/each}
  </ul>
{/if}

<style>
  .container {
    display: flex;
    flex-direction: column;
    gap: 17px;
  }
</style>