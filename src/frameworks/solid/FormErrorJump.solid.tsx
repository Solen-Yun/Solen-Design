/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountFormErrorJump, type FormErrorJumpOptions } from "../../components/form-error-jump/FormErrorJumpEngine.js";
import type { MotionController } from "../../components/form-error-jump/motion-runtime";

export function FormErrorJump(props: { options?: FormErrorJumpOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountFormErrorJump(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="form-error-jump" />;
}
