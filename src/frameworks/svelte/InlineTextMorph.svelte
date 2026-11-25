<script lang="ts">
import { onMount } from "svelte";
import { mountInlineTextMorph, type InlineTextMorphOptions } from "../../components/inline-text-morph/InlineTextMorphEngine.js";
import type { MotionController } from "../../components/inline-text-morph/motion-runtime";
export let options: InlineTextMorphOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountInlineTextMorph(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="inline-text-morph"></div>
