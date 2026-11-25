<script lang="ts">
import { onMount } from "svelte";
import { mountFoldedEmojiScroll, type FoldedEmojiScrollOptions } from "../../components/folded-emoji-scroll/FoldedEmojiScrollEngine.js";
import type { MotionController } from "../../components/folded-emoji-scroll/motion-runtime";
export let options: FoldedEmojiScrollOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountFoldedEmojiScroll(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="folded-emoji-scroll"></div>
