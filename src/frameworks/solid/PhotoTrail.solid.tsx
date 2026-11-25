/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountPhotoTrail, type PhotoTrailOptions } from "../../components/photo-trail/PhotoTrailEngine.js";
import type { MotionController } from "../../components/photo-trail/motion-runtime";

export function PhotoTrail(props: { options?: PhotoTrailOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountPhotoTrail(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="photo-trail" />;
}
