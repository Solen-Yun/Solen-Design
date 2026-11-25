/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountCircularThemeSwitch, type CircularThemeSwitchOptions } from "../../components/circular-theme-switch/CircularThemeSwitchEngine.js";
import type { MotionController } from "../../components/circular-theme-switch/motion-runtime";

export function CircularThemeSwitch(props: { options?: CircularThemeSwitchOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountCircularThemeSwitch(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="circular-theme-switch" />;
}
