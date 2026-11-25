<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountVelocitySkewList, type VelocitySkewListOptions } from "../../components/velocity-skew-list/VelocitySkewListEngine.js";
import type { MotionController } from "../../components/velocity-skew-list/motion-runtime";
const props = defineProps<{ options?: VelocitySkewListOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountVelocitySkewList(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="velocity-skew-list" /></template>
