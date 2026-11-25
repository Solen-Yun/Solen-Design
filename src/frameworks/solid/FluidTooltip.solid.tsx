/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountFluidTooltip, type FluidTooltipOptions } from "../../components/fluid-tooltip/FluidTooltipEngine.js";
import type { MotionController } from "../../components/fluid-tooltip/motion-runtime";

export function FluidTooltip(props: { options?: FluidTooltipOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountFluidTooltip(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="fluid-tooltip" />;
}
