import { mountSpiderMusicPlayer, type SpiderMusicPlayerOptions } from "../../components/spider-music-player/SpiderMusicPlayerEngine.js";
import type { MotionController } from "../../components/spider-music-player/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: SpiderMusicPlayerOptions = {}): ReturnType<typeof mountSpiderMusicPlayer> {
  return mountSpiderMusicPlayer(target, options);
}
export type { SpiderMusicPlayerOptions };
