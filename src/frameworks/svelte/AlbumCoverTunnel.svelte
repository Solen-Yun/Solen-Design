<script lang="ts">
import { onMount } from "svelte";
import { mountAlbumCoverTunnel, type AlbumCoverTunnelOptions } from "../../components/album-cover-tunnel/AlbumCoverTunnelEngine.js";
import type { MotionController } from "../../components/album-cover-tunnel/motion-runtime";
export let options: AlbumCoverTunnelOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountAlbumCoverTunnel(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="album-cover-tunnel"></div>
