<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountVelocityFocusDrag, type VelocityFocusDragOptions } from "../../components/velocity-drag/VelocityFocusDragEngine.js";
import type { MotionController } from "../../components/velocity-drag/motion-runtime";
const props = defineProps<{ options?: VelocityFocusDragOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountVelocityFocusDrag(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="velocity-drag" /></template>
