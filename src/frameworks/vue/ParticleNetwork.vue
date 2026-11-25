<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountParticleNetwork, type ParticleNetworkOptions } from "../../components/particle-network/ParticleNetworkEngine.js";
import type { MotionController } from "../../components/particle-network/motion-runtime";
const props = defineProps<{ options?: ParticleNetworkOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountParticleNetwork(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="particle-network" /></template>
