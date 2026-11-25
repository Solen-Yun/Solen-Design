<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountLettersScatter, type LettersScatterOptions } from "../../components/letters-scatter/LettersScatterEngine.js";
import type { MotionController } from "../../components/letters-scatter/motion-runtime";
const props = defineProps<{ options?: LettersScatterOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountLettersScatter(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="letters-scatter" /></template>
