<script>
  import SmallIconButton from "../SmallIconButton.svelte";

  export let iconSrc, alt, onClick, onUnClick, height, width, color, hoverColor, clickedColor, active;
  const clickHandler = (event) => {
    if (active) {
      active = false;
      onUnClick(event);
    } else {
      active = true;
      onClick(event);
    }
  }
</script>

<SmallIconButton
  iconSrc={iconSrc}
  alt={alt}
  height={height}
  width={width}
  color={active ? clickedColor : color}
  hoverColor={hoverColor}
  onClick={clickHandler}
></SmallIconButton>
