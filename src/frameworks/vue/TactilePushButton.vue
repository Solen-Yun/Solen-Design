<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountTactilePushButton, type TactilePushButtonOptions } from "../../components/tactile-push-button/TactilePushButtonEngine.js";
import type { MotionController } from "../../components/tactile-push-button/motion-runtime";
const props = defineProps<{ options?: TactilePushButtonOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountTactilePushButton(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="tactile-push-button" /></template>
