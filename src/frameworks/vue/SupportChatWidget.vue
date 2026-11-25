<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountSupportChatWidget, type SupportChatWidgetOptions } from "../../components/support-chat-widget/SupportChatWidgetEngine.js";
import type { MotionController } from "../../components/support-chat-widget/motion-runtime";
const props = defineProps<{ options?: SupportChatWidgetOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountSupportChatWidget(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="support-chat-widget" /></template>
