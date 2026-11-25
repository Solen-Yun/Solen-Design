<script lang="ts">
import { onMount } from "svelte";
import { mountPushNavigationStack, type PushNavigationStackOptions } from "../../components/push-navigation-stack/PushNavigationStackEngine.js";
import type { MotionController } from "../../components/push-navigation-stack/motion-runtime";
export let options: PushNavigationStackOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountPushNavigationStack(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="push-navigation-stack"></div>
