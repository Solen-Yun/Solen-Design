<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountMatchaPowderReveal, type MatchaPowderRevealOptions } from "../../components/matcha-powder-reveal/MatchaPowderRevealEngine.js";
import type { MotionController } from "../../components/matcha-powder-reveal/motion-runtime";
const props = defineProps<{ options?: MatchaPowderRevealOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountMatchaPowderReveal(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="matcha-powder-reveal" /></template>
