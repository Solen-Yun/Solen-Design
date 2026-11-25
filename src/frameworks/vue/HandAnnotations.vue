<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountHandAnnotations, type HandAnnotationsOptions } from "../../components/hand-annotations/HandAnnotationsEngine.js";
import type { MotionController } from "../../components/hand-annotations/motion-runtime";
const props = defineProps<{ options?: HandAnnotationsOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountHandAnnotations(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="hand-annotations" /></template>
