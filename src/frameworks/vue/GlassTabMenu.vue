<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountGlassTabMenu, type GlassTabMenuOptions } from "../../components/glass-tab-menu/GlassTabMenuEngine.js";
import type { MotionController } from "../../components/glass-tab-menu/motion-runtime";
const props = defineProps<{ options?: GlassTabMenuOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountGlassTabMenu(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="glass-tab-menu" /></template>
