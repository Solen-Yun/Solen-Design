<script lang="ts">
import { onMount } from "svelte";
import { mountShareDialog, type ShareDialogOptions } from "../../components/share-dialog/ShareDialogEngine.js";
import type { MotionController } from "../../components/share-dialog/motion-runtime";
export let options: ShareDialogOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountShareDialog(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="share-dialog"></div>
