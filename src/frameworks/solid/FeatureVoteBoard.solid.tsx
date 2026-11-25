/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountFeatureVoteBoard, type FeatureVoteBoardOptions } from "../../components/feature-vote-board/FeatureVoteBoardEngine.js";
import type { MotionController } from "../../components/feature-vote-board/motion-runtime";

export function FeatureVoteBoard(props: { options?: FeatureVoteBoardOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountFeatureVoteBoard(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="feature-vote-board" />;
}
