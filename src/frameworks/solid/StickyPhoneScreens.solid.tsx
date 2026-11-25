/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountStickyPhoneScreens, type StickyPhoneScreensOptions } from "../../components/sticky-phone-screens/StickyPhoneScreensEngine.js";
import type { MotionController } from "../../components/sticky-phone-screens/motion-runtime";

export function StickyPhoneScreens(props: { options?: StickyPhoneScreensOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountStickyPhoneScreens(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="sticky-phone-screens" />;
}
