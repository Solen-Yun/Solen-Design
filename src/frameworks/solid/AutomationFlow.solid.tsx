/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountAutomationFlow, type AutomationFlowOptions } from "../../components/automation-flow/AutomationFlowEngine.js";
import type { MotionController } from "../../components/automation-flow/motion-runtime";

export function AutomationFlow(props: { options?: AutomationFlowOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountAutomationFlow(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="automation-flow" />;
}
