<script lang="ts">
import { onMount } from "svelte";
import { mountAnnouncementPill, type AnnouncementPillOptions } from "../../components/announcement-pill/AnnouncementPillEngine.js";
import type { MotionController } from "../../components/announcement-pill/motion-runtime";
export let options: AnnouncementPillOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountAnnouncementPill(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="announcement-pill"></div>
