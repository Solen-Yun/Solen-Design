/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountRepoStarButton, type RepoStarButtonOptions } from "../../components/repo-star-button/RepoStarButtonEngine.js";
import type { MotionController } from "../../components/repo-star-button/motion-runtime";

export function RepoStarButton(props: { options?: RepoStarButtonOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountRepoStarButton(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="repo-star-button" />;
}
