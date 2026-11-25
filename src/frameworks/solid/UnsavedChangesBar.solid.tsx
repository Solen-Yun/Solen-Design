/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountUnsavedChangesBar, type UnsavedChangesBarOptions } from "../../components/unsaved-changes-bar/UnsavedChangesBarEngine.js";
import type { MotionController } from "../../components/unsaved-changes-bar/motion-runtime";

export function UnsavedChangesBar(props: { options?: UnsavedChangesBarOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountUnsavedChangesBar(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="unsaved-changes-bar" />;
}
