<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountSpoilerReveal, type SpoilerRevealOptions } from "../../components/spoiler-reveal/SpoilerRevealEngine.js";
import type { MotionController } from "../../components/spoiler-reveal/motion-runtime";
const props = defineProps<{ options?: SpoilerRevealOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountSpoilerReveal(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="spoiler-reveal" /></template>
