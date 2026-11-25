/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountTactilePushButton, type TactilePushButtonOptions } from "../../components/tactile-push-button/TactilePushButtonEngine.js";
import type { MotionController } from "../../components/tactile-push-button/motion-runtime";

export function TactilePushButton(props: { options?: TactilePushButtonOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountTactilePushButton(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="tactile-push-button" />;
}
