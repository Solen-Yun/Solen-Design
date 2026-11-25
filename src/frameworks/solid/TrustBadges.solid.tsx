/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountTrustBadges, type TrustBadgesOptions } from "../../components/trust-badges/TrustBadgesEngine.js";
import type { MotionController } from "../../components/trust-badges/motion-runtime";

export function TrustBadges(props: { options?: TrustBadgesOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountTrustBadges(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="trust-badges" />;
}
