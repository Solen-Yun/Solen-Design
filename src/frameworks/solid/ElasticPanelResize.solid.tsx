/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountElasticPanelResize, type ElasticPanelResizeOptions } from "../../components/elastic-panel-resize/ElasticPanelResizeEngine.js";
import type { MotionController } from "../../components/elastic-panel-resize/motion-runtime";

export function ElasticPanelResize(props: { options?: ElasticPanelResizeOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountElasticPanelResize(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="elastic-panel-resize" />;
}
