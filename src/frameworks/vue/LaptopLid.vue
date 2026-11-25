<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountLaptopLid, type LaptopLidOptions } from "../../components/laptop-lid/LaptopLidEngine.js";
import type { MotionController } from "../../components/laptop-lid/motion-runtime";
const props = defineProps<{ options?: LaptopLidOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountLaptopLid(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="laptop-lid" /></template>
