<script lang="ts">
import { onMount } from "svelte";
import { mountSupportChatWidget, type SupportChatWidgetOptions } from "../../components/support-chat-widget/SupportChatWidgetEngine.js";
import type { MotionController } from "../../components/support-chat-widget/motion-runtime";
export let options: SupportChatWidgetOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountSupportChatWidget(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="support-chat-widget"></div>
