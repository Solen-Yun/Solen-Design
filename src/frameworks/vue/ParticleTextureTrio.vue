<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountParticleTextureTrio, type ParticleTextureTrioOptions } from "../../components/particle-texture-trio/ParticleTextureTrioEngine.js";
import type { MotionController } from "../../components/particle-texture-trio/motion-runtime";
const props = defineProps<{ options?: ParticleTextureTrioOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountParticleTextureTrio(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="particle-texture-trio" /></template>
