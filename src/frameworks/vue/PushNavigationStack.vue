<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountPushNavigationStack, type PushNavigationStackOptions } from "../../components/push-navigation-stack/PushNavigationStackEngine.js";
import type { MotionController } from "../../components/push-navigation-stack/motion-runtime";
const props = defineProps<{ options?: PushNavigationStackOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountPushNavigationStack(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="push-navigation-stack" /></template>
