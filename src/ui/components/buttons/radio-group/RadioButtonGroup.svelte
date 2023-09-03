<script>
  import SmallIconRadioButton from "./SmallIconRadioButton.svelte";
  import { createEventDispatcher } from "svelte";

  export let buttons, height, width, color, clickedColor, hoverColor;
  const dispatch = createEventDispatcher();
  let active = new Array(buttons ? buttons.length : 0);
  active.fill(false);
  const select = (button, index = 0) => {
    active.fill(false);
    if (button !== null) {
      active[index] = true;
    }

    dispatch('radioChange', {
      radioButtonObject: button
    });
  };
</script>

{#each buttons as button, i}
  <SmallIconRadioButton
    iconSrc={button.icon}
    alt={button.name}
    height={height}
    width={width}
    color={color}
    clickedColor={clickedColor}
    hoverColor={hoverColor}
    onClick={() => { select(button, i) }}
    onUnClick={() => { select(null) }}
    active={active[i]}
  ></SmallIconRadioButton>
{/each}
