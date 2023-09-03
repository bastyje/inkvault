<script>
    export let iconSrc, alt, onClick, height, width, color, hoverColor;
</script>

<button
  tabindex="-1"
  on:click={onClick}
  style:height={`${height}px`}
  style:width={`${width}px`}
  style:--color="var({color})"
  style:--hover-color="var({hoverColor})"
>
  <img class="non-selectable" draggable="false" src={iconSrc} alt={alt}>
</button>

<style lang="scss">
  button {
    cursor: pointer;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--color, transparent);
    &:hover {
      background-color: var(--hover-color, transparent);
    }
  }
</style>