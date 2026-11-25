/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountAnnouncementPill, type AnnouncementPillOptions } from "../../components/announcement-pill/AnnouncementPillEngine.js";
import type { MotionController } from "../../components/announcement-pill/motion-runtime";

export function AnnouncementPill(props: { options?: AnnouncementPillOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountAnnouncementPill(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="announcement-pill" />;
}
