/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountChangelogFilter, type ChangelogFilterOptions } from "../../components/changelog-filter/ChangelogFilterEngine.js";
import type { MotionController } from "../../components/changelog-filter/motion-runtime";

export function ChangelogFilter(props: { options?: ChangelogFilterOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountChangelogFilter(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="changelog-filter" />;
}
