<script lang="ts">
import { onMount } from "svelte";
import { mountTextScrambleDecode, type TextScrambleDecodeOptions } from "../../components/text-scramble-decode/TextScrambleDecodeEngine.js";
import type { MotionController } from "../../components/text-scramble-decode/motion-runtime";
export let options: TextScrambleDecodeOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountTextScrambleDecode(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="text-scramble-decode"></div>
