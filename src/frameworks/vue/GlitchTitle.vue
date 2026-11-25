<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountGlitchTitle, type GlitchTitleOptions } from "../../components/glitch-title/GlitchTitleEngine.js";
import type { MotionController } from "../../components/glitch-title/motion-runtime";
const props = defineProps<{ options?: GlitchTitleOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountGlitchTitle(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="glitch-title" /></template>
