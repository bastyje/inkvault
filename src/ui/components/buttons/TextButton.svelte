<script lang="ts">
  export let id: string | null = null,
    onClick: (e: MouseEvent) => void = (_: MouseEvent) => {},
    text: string,
    type: 'button' | 'submit' | 'reset' | null | undefined = 'button';
</script>

<button id={id} on:click={onClick} type={type} class="small small--bold" >{text}</button>

<style>
  button {
    border-radius: 8px;
    background: var(--primary-100);
    padding: 5px 10px;
    cursor: pointer;
  }
</style>