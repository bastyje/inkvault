<script>
  import SmallIconButton from "./SmallIconButton.svelte";
  export let iconSrc, alt, onClick, onUnClick, height, width, color, hoverColor, clickedColor;
  let active = false;
  let childColor = color;
  const clickHandler = (event) => {
    if (active) {
      active = false;
      childColor = color;
      onUnClick(event);
    } else {
      active = true;
      childColor = clickedColor;
      onClick(event);
    }
  }
</script>

<SmallIconButton
  iconSrc={iconSrc}
  alt={alt}
  height={height}
  width={width}
  color={childColor}
  hoverColor={hoverColor}
  onClick={clickHandler}
></SmallIconButton>