<script lang="ts">
import { onMount } from "svelte";
import { mountFeatureVoteBoard, type FeatureVoteBoardOptions } from "../../components/feature-vote-board/FeatureVoteBoardEngine.js";
import type { MotionController } from "../../components/feature-vote-board/motion-runtime";
export let options: FeatureVoteBoardOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountFeatureVoteBoard(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="feature-vote-board"></div>
