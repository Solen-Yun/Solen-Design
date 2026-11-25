/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountShareDialog, type ShareDialogOptions } from "../../components/share-dialog/ShareDialogEngine.js";
import type { MotionController } from "../../components/share-dialog/motion-runtime";

export function ShareDialog(props: { options?: ShareDialogOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountShareDialog(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="share-dialog" />;
}
