<script lang="ts">
import { onMount } from "svelte";
import { mountSpringTuner, type SpringTunerOptions } from "../../components/spring-tuner/SpringTunerEngine.js";
import type { MotionController } from "../../components/spring-tuner/motion-runtime";
export let options: SpringTunerOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountSpringTuner(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="spring-tuner"></div>
