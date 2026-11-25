/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountPlanCompareTable, type PlanCompareTableOptions } from "../../components/plan-compare-table/PlanCompareTableEngine.js";
import type { MotionController } from "../../components/plan-compare-table/motion-runtime";

export function PlanCompareTable(props: { options?: PlanCompareTableOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountPlanCompareTable(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="plan-compare-table" />;
}
