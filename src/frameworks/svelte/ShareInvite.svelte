<script lang="ts">
import { onMount } from "svelte";
import { mountShareInvite, type ShareInviteOptions } from "../../components/share-invite/ShareInviteEngine.js";
import type { MotionController } from "../../components/share-invite/motion-runtime";
export let options: ShareInviteOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountShareInvite(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="share-invite"></div>
