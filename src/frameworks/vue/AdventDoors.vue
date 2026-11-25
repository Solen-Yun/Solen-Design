<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountAdventDoors, type AdventDoorsOptions } from "../../components/advent-doors/AdventDoorsEngine.js";
import type { MotionController } from "../../components/advent-doors/motion-runtime";
const props = defineProps<{ options?: AdventDoorsOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountAdventDoors(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="advent-doors" /></template>
