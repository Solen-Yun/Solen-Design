<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountParallaxMountains, type ParallaxMountainsOptions } from "../../components/parallax-mountains/ParallaxMountainsEngine.js";
import type { MotionController } from "../../components/parallax-mountains/motion-runtime";
const props = defineProps<{ options?: ParallaxMountainsOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountParallaxMountains(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="parallax-mountains" /></template>
