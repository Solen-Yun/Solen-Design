<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountSelectionFlower, type SelectionFlowerOptions } from "../../components/selection-flower/SelectionFlowerEngine.js";
import type { MotionController } from "../../components/selection-flower/motion-runtime";
const props = defineProps<{ options?: SelectionFlowerOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountSelectionFlower(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="selection-flower" /></template>
