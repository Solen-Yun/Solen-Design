/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountTerminalDemo, type TerminalDemoOptions } from "../../components/terminal-demo/TerminalDemoEngine.js";
import type { MotionController } from "../../components/terminal-demo/motion-runtime";

export function TerminalDemo(props: { options?: TerminalDemoOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountTerminalDemo(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="terminal-demo" />;
}
