/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountBlisterDropdown, type BlisterDropdownOptions } from "../../components/blister-dropdown/BlisterDropdownEngine.js";
import type { MotionController } from "../../components/blister-dropdown/motion-runtime";

export function BlisterDropdown(props: { options?: BlisterDropdownOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountBlisterDropdown(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="blister-dropdown" />;
}
