<script lang="ts">
import { onMount } from "svelte";
import { mountAutoFeatureTabs, type AutoFeatureTabsOptions } from "../../components/auto-feature-tabs/AutoFeatureTabsEngine.js";
import type { MotionController } from "../../components/auto-feature-tabs/motion-runtime";
export let options: AutoFeatureTabsOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountAutoFeatureTabs(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="auto-feature-tabs"></div>
