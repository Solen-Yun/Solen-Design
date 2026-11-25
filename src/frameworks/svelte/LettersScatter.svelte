<script lang="ts">
import { onMount } from "svelte";
import { mountLettersScatter, type LettersScatterOptions } from "../../components/letters-scatter/LettersScatterEngine.js";
import type { MotionController } from "../../components/letters-scatter/motion-runtime";
export let options: LettersScatterOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountLettersScatter(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="letters-scatter"></div>
