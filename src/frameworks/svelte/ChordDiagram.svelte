<script lang="ts">
import { onMount } from "svelte";
import { mountChordDiagram, type ChordDiagramOptions } from "../../components/chord-diagram/ChordDiagramEngine.js";
import type { MotionController } from "../../components/chord-diagram/motion-runtime";
export let options: ChordDiagramOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountChordDiagram(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="chord-diagram"></div>
