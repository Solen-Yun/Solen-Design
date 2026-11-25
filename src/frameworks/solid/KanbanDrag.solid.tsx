/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountKanbanDrag, type KanbanDragOptions } from "../../components/kanban-drag/KanbanDragEngine.js";
import type { MotionController } from "../../components/kanban-drag/motion-runtime";

export function KanbanDrag(props: { options?: KanbanDragOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountKanbanDrag(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="kanban-drag" />;
}
