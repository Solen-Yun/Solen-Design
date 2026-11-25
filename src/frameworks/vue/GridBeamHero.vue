<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountGridBeamHero, type GridBeamHeroOptions } from "../../components/grid-beam-hero/GridBeamHeroEngine.js";
import type { MotionController } from "../../components/grid-beam-hero/motion-runtime";
const props = defineProps<{ options?: GridBeamHeroOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountGridBeamHero(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="grid-beam-hero" /></template>
