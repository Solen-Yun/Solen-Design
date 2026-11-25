<script lang="ts">
import { onMount } from "svelte";
import { mountStreakFlame, type StreakFlameOptions } from "../../components/streak-flame/StreakFlameEngine.js";
import type { MotionController } from "../../components/streak-flame/motion-runtime";
export let options: StreakFlameOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountStreakFlame(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="streak-flame"></div>
