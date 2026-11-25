/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountShareInvite, type ShareInviteOptions } from "../../components/share-invite/ShareInviteEngine.js";
import type { MotionController } from "../../components/share-invite/motion-runtime";

export function ShareInvite(props: { options?: ShareInviteOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountShareInvite(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="share-invite" />;
}
