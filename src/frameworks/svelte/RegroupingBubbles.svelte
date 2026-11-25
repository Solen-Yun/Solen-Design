<script lang="ts">
import { onMount } from "svelte";
import { mountRegroupingBubbles, type RegroupingBubblesOptions } from "../../components/regrouping-bubbles/RegroupingBubblesEngine.js";
import type { MotionController } from "../../components/regrouping-bubbles/motion-runtime";
export let options: RegroupingBubblesOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountRegroupingBubbles(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="regrouping-bubbles"></div>
