<script lang="ts">
import { onMount } from "svelte";
import { mountNotificationPriming, type NotificationPrimingOptions } from "../../components/notification-priming/NotificationPrimingEngine.js";
import type { MotionController } from "../../components/notification-priming/motion-runtime";
export let options: NotificationPrimingOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountNotificationPriming(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="notification-priming"></div>
