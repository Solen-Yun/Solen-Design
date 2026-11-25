/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountAlbumCoverTunnel, type AlbumCoverTunnelOptions } from "../../components/album-cover-tunnel/AlbumCoverTunnelEngine.js";
import type { MotionController } from "../../components/album-cover-tunnel/motion-runtime";

export function AlbumCoverTunnel(props: { options?: AlbumCoverTunnelOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountAlbumCoverTunnel(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="album-cover-tunnel" />;
}
