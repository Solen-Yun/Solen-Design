<script lang="ts">
import { onMount } from "svelte";
import { mountKineticCaptions, type KineticCaptionsOptions } from "../../components/kinetic-captions/KineticCaptionsEngine.js";
import type { MotionController } from "../../components/kinetic-captions/motion-runtime";
export let options: KineticCaptionsOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountKineticCaptions(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="kinetic-captions"></div>
