<script lang="ts">
import { onMount } from "svelte";
import { mountTrendingSearchRoll, type TrendingSearchRollOptions } from "../../components/trending-search-roll/TrendingSearchRollEngine.js";
import type { MotionController } from "../../components/trending-search-roll/motion-runtime";
export let options: TrendingSearchRollOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountTrendingSearchRoll(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="trending-search-roll"></div>
