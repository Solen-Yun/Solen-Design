/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountAgentComposer, type AgentComposerOptions } from "../../components/agent-composer/AgentComposerEngine.js";
import type { MotionController } from "../../components/agent-composer/motion-runtime";

export function AgentComposer(props: { options?: AgentComposerOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountAgentComposer(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="agent-composer" />;
}
