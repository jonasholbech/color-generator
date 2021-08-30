<script>
  import { copyToClipboard, getOutput } from "./helpers";
  import { toast, SvelteToast } from "@zerodevx/svelte-toast";
  import Color from "./Color.svelte";
  import { colors } from "./color-store.js";
  let hue = 0;
  let saturation = 50;
  let name = "";
  $: selected = `hsl(${hue}, ${saturation}%, ${50}%)`;
  $: output = getOutput($colors);

  function textareaClicked() {
    copyToClipboard();
    toast.push("Copied to clipboard");
  }
  const addColor = () => {
    $colors = [
      ...$colors,
      {
        h: hue,
        s: saturation,
        name,
      },
    ];
    localStorage.setItem("colors", JSON.stringify($colors));
    name = "";
    hue = 0;
    saturation = 50;
  };
</script>

<main>
  <div class="colorpicker">
    <section>
      <div>
        <label for="hue">Hue: {hue}</label>
        <input
          type="range"
          id="hue"
          name="hue"
          min="0"
          max="360"
          bind:value={hue}
        />
      </div>
      <div>
        <label for="saturation">Saturation: {saturation}</label>
        <input
          type="range"
          id="saturation"
          name="saturation"
          min="0"
          max="100"
          bind:value={saturation}
        />
      </div>
    </section>
    <div class="coloroutput" style={`background: ${selected}`}>
      <p><span>{selected}</span><span>{selected}</span></p>
    </div>
    <input
      type="text"
      name="name"
      placeholder="Name your color"
      bind:value={name}
    />
    <button on:click={addColor}> Save </button>
  </div>
  <fieldset>
    <legend>Preview</legend>
    <Color h={hue} s={saturation} />
  </fieldset>
  <fieldset>
    <legend>Saved Colors</legend>
    {#each $colors as item}
      <Color h={item.h} s={item.s} name={item.name} />
    {/each}
  </fieldset>
  <fieldset>
    <legend>CSS</legend>
    <textarea bind:value={output} on:click={textareaClicked} />
  </fieldset>
  <SvelteToast />
</main>

<style>
  main {
    grid-column: 2;
  }
  .colorpicker {
    display: grid;
    grid-template-columns: auto auto;
  }
  section {
    margin-bottom: 1rem;
  }
  button,
  input[name="name"] {
    margin-top: 1rem;
    grid-column: 1/-1;
  }
  .coloroutput {
    border: 1px solid #000;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    gap: 1rem;
  }
  .coloroutput span {
    display: block;
    margin-right: 1rem;
  }
  .coloroutput span:first-child {
    color: white;
  }
  textarea {
    width: 100%;
    min-height: 400px;
  }
</style>
