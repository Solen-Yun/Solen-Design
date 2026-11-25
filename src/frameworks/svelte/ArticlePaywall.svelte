<script lang="ts">
import { onMount } from "svelte";
import { mountArticlePaywall, type ArticlePaywallOptions } from "../../components/article-paywall/ArticlePaywallEngine.js";
import type { MotionController } from "../../components/article-paywall/motion-runtime";
export let options: ArticlePaywallOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountArticlePaywall(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="article-paywall"></div>
