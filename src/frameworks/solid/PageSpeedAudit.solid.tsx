/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountPageSpeedAudit, type PageSpeedAuditOptions } from "../../components/page-speed-audit/PageSpeedAuditEngine.js";
import type { MotionController } from "../../components/page-speed-audit/motion-runtime";

export function PageSpeedAudit(props: { options?: PageSpeedAuditOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountPageSpeedAudit(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="page-speed-audit" />;
}
