<script lang="ts">
import { onMount } from "svelte";
import { mountTactilePushButton, type TactilePushButtonOptions } from "../../components/tactile-push-button/TactilePushButtonEngine.js";
import type { MotionController } from "../../components/tactile-push-button/motion-runtime";
export let options: TactilePushButtonOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountTactilePushButton(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="tactile-push-button"></div>
