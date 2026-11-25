<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountGlowBorderCta, type GlowBorderCtaOptions } from "../../components/glow-border-cta/GlowBorderCtaEngine.js";
import type { MotionController } from "../../components/glow-border-cta/motion-runtime";
const props = defineProps<{ options?: GlowBorderCtaOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountGlowBorderCta(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="glow-border-cta" /></template>
