/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountGlowBorderCta, type GlowBorderCtaOptions } from "../../components/glow-border-cta/GlowBorderCtaEngine.js";
import type { MotionController } from "../../components/glow-border-cta/motion-runtime";

export function GlowBorderCta(props: { options?: GlowBorderCtaOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountGlowBorderCta(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="glow-border-cta" />;
}
