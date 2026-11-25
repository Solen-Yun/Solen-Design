<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountCollapsingLargeTitle, type CollapsingLargeTitleOptions } from "../../components/collapsing-large-title/CollapsingLargeTitleEngine.js";
import type { MotionController } from "../../components/collapsing-large-title/motion-runtime";
const props = defineProps<{ options?: CollapsingLargeTitleOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountCollapsingLargeTitle(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="collapsing-large-title" /></template>
