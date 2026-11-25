<script lang="ts">
import { onMount } from "svelte";
import { mountTextOnWavePath, type TextOnWavePathOptions } from "../../components/text-on-wave-path/TextOnWavePathEngine.js";
import type { MotionController } from "../../components/text-on-wave-path/motion-runtime";
export let options: TextOnWavePathOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountTextOnWavePath(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="text-on-wave-path"></div>
