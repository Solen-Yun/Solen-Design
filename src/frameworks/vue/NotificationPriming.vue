<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountNotificationPriming, type NotificationPrimingOptions } from "../../components/notification-priming/NotificationPrimingEngine.js";
import type { MotionController } from "../../components/notification-priming/motion-runtime";
const props = defineProps<{ options?: NotificationPrimingOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountNotificationPriming(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="notification-priming" /></template>
