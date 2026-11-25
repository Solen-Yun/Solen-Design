/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountMentionComment, type MentionCommentOptions } from "../../components/mention-comment/MentionCommentEngine.js";
import type { MotionController } from "../../components/mention-comment/motion-runtime";

export function MentionComment(props: { options?: MentionCommentOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountMentionComment(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="mention-comment" />;
}
