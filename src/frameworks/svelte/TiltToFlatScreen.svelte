<script lang="ts">
import { onMount } from "svelte";
import { mountTiltToFlatScreen, type TiltToFlatScreenOptions } from "../../components/tilt-to-flat-screen/TiltToFlatScreenEngine.js";
import type { MotionController } from "../../components/tilt-to-flat-screen/motion-runtime";
export let options: TiltToFlatScreenOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountTiltToFlatScreen(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="tilt-to-flat-screen"></div>
