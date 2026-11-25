<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountRevealFooter, type RevealFooterOptions } from "../../components/reveal-footer/RevealFooterEngine.js";
import type { MotionController } from "../../components/reveal-footer/motion-runtime";
const props = defineProps<{ options?: RevealFooterOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountRevealFooter(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="reveal-footer" /></template>
