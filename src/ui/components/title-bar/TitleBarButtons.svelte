<script>
  import SmallIconButton from "../buttons/SmallIconButton.svelte";
</script>

<div class="buttons-container">
  <SmallIconButton
    color="--transparent"
    hoverColor="--primary-70"
    iconSrc="icons/minimize.svg"
    alt="minimize"
    onClick={window.api.windowManipulation.maximize}
    width={30}
    height={30}
  ></SmallIconButton>
  <SmallIconButton
    color="--transparent"
    hoverColor="--primary-70"
    iconSrc="icons/maximize.svg"
    alt="maximize"
    onClick={window.api.windowManipulation.maximize}
    width={30}
    height={30}
  ></SmallIconButton>
  <SmallIconButton
    color="--transparent"
    hoverColor="--primary-70"
    iconSrc="icons/x.svg"
    alt="exit"
    onClick={window.api.windowManipulation.close}
    width={30}
    height={30}
  ></SmallIconButton>
</div>

<style lang="scss">
  .buttons-container {
    display: flex;
    justify-content: space-between;
    gap: 5px;
    -webkit-app-region: no-drag;
    cursor: auto;
  }
</style>