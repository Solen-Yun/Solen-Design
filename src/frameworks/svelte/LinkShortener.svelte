<script lang="ts">
import { onMount } from "svelte";
import { mountLinkShortener, type LinkShortenerOptions } from "../../components/link-shortener/LinkShortenerEngine.js";
import type { MotionController } from "../../components/link-shortener/motion-runtime";
export let options: LinkShortenerOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountLinkShortener(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="link-shortener"></div>
