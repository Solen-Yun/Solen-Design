/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountStoryProgress, type StoryProgressOptions } from "../../components/story-progress/StoryProgressEngine.js";
import type { MotionController } from "../../components/story-progress/motion-runtime";

export function StoryProgress(props: { options?: StoryProgressOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountStoryProgress(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="story-progress" />;
}
