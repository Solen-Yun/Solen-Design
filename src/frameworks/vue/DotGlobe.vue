<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountDotGlobe, type DotGlobeOptions } from "../../components/dot-globe/DotGlobeEngine.js";
import type { MotionController } from "../../components/dot-globe/motion-runtime";
const props = defineProps<{ options?: DotGlobeOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountDotGlobe(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="dot-globe" /></template>
