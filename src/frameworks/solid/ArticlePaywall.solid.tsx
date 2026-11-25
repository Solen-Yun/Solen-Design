/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountArticlePaywall, type ArticlePaywallOptions } from "../../components/article-paywall/ArticlePaywallEngine.js";
import type { MotionController } from "../../components/article-paywall/motion-runtime";

export function ArticlePaywall(props: { options?: ArticlePaywallOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountArticlePaywall(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="article-paywall" />;
}
