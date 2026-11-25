<script lang="ts">
import { onMount } from "svelte";
import { mountSpiderMusicPlayer, type SpiderMusicPlayerOptions } from "../../components/spider-music-player/SpiderMusicPlayerEngine.js";
import type { MotionController } from "../../components/spider-music-player/motion-runtime";
export let options: SpiderMusicPlayerOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountSpiderMusicPlayer(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="spider-music-player"></div>
