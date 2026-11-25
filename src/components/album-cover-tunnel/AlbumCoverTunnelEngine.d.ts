import type { MotionOptions, MotionController } from "./motion-runtime";
export type AlbumCoverTunnelOptions = Omit<MotionOptions, "height"> & { images?: (string | { src: string; alt?: string })[]; paused?: boolean; autoTravel?: boolean; theme?: "dark" | "light"; active?: number; onSelect?: (index: number) => void };
export function mountAlbumCoverTunnel(target: HTMLElement, options?: AlbumCoverTunnelOptions): Omit<MotionController, "update"> & { update(options: AlbumCoverTunnelOptions): void };
