/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountExplodedAssembly, type ExplodedAssemblyOptions } from "../../components/exploded-assembly/ExplodedAssemblyEngine.js";
import type { MotionController } from "../../components/exploded-assembly/motion-runtime";

export function ExplodedAssembly(props: { options?: ExplodedAssemblyOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountExplodedAssembly(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="exploded-assembly" />;
}
