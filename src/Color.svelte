<script>
  import { colors } from "./color-store.js";
  import { getLightnessSteps } from "./helpers";
  export let h;
  export let s;
  export let name = "";

  const removeColor = () => {
    $colors = $colors.filter((col) => col.name !== name);
    localStorage.setItem("colors", JSON.stringify($colors));
  };
</script>

<h3 on:click={removeColor}>{name}</h3>
<section>
  {#each getLightnessSteps() as item}
    <div style={`background: hsl(${h},${s}%,${item}%)`} />
  {/each}
</section>

<style>
  section {
    margin-bottom: 0.5rem;
    display: flex;
    gap: 0.3rem;
    flex-wrap: wrap;
  }
  h3 {
    font-weight: 400;
    font-size: 1rem;
    color: rgba(0, 0, 0, 0.6);
    margin-bottom: 0.2rem;
    cursor: pointer;
  }
  div {
    flex-grow: 1;
    border: 1px solid #000;
    min-height: 25px;
  }

  h3:hover + section {
    opacity: 0.4;
  }
</style>
