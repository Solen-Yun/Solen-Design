<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountCosmicPanels, type CosmicPanelsOptions } from "../../components/cosmic-panels/CosmicPanelsEngine.js";
import type { MotionController } from "../../components/cosmic-panels/motion-runtime";
const props = defineProps<{ options?: CosmicPanelsOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountCosmicPanels(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="cosmic-panels" /></template>
