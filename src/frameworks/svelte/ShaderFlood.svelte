<script lang="ts">
import { onMount } from "svelte";
import { mountShaderFlood, type ShaderFloodOptions } from "../../components/shader-flood/ShaderFloodEngine.js";
import type { MotionController } from "../../components/shader-flood/motion-runtime";
export let options: ShaderFloodOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountShaderFlood(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="shader-flood"></div>
