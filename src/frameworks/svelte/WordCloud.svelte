<script lang="ts">
import { onMount } from "svelte";
import { mountWordCloud, type WordCloudOptions } from "../../components/word-cloud/WordCloudEngine.js";
import type { MotionController } from "../../components/word-cloud/motion-runtime";
export let options: WordCloudOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountWordCloud(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="word-cloud"></div>
