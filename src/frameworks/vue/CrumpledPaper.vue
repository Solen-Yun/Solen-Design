<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountCrumpledPaper, type CrumpledPaperOptions } from "../../components/crumpled-paper/CrumpledPaperEngine.js";
import type { MotionController } from "../../components/crumpled-paper/motion-runtime";
const props = defineProps<{ options?: CrumpledPaperOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountCrumpledPaper(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="crumpled-paper" /></template>
