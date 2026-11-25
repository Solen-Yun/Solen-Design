/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountAutoFeatureTabs, type AutoFeatureTabsOptions } from "../../components/auto-feature-tabs/AutoFeatureTabsEngine.js";
import type { MotionController } from "../../components/auto-feature-tabs/motion-runtime";

export function AutoFeatureTabs(props: { options?: AutoFeatureTabsOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountAutoFeatureTabs(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="auto-feature-tabs" />;
}
