/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountAvatarStackJoin, type AvatarStackJoinOptions } from "../../components/avatar-stack-join/AvatarStackJoinEngine.js";
import type { MotionController } from "../../components/avatar-stack-join/motion-runtime";

export function AvatarStackJoin(props: { options?: AvatarStackJoinOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountAvatarStackJoin(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="avatar-stack-join" />;
}
