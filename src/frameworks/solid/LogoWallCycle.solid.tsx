/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountLogoWallCycle, type LogoWallCycleOptions } from "../../components/logo-wall-cycle/LogoWallCycleEngine.js";
import type { MotionController } from "../../components/logo-wall-cycle/motion-runtime";

export function LogoWallCycle(props: { options?: LogoWallCycleOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountLogoWallCycle(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="logo-wall-cycle" />;
}
