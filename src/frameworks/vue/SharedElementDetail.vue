<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountSharedElementDetail, type SharedElementDetailOptions } from "../../components/shared-element-detail/SharedElementDetailEngine.js";
import type { MotionController } from "../../components/shared-element-detail/motion-runtime";
const props = defineProps<{ options?: SharedElementDetailOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountSharedElementDetail(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="shared-element-detail" /></template>
