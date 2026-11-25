import { mountAlbumCoverTunnel, type AlbumCoverTunnelOptions } from "../../components/album-cover-tunnel/AlbumCoverTunnelEngine.js";
import type { MotionController } from "../../components/album-cover-tunnel/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: AlbumCoverTunnelOptions = {}): ReturnType<typeof mountAlbumCoverTunnel> {
  return mountAlbumCoverTunnel(target, options);
}
export type { AlbumCoverTunnelOptions };
