<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountSodaCan, type SodaCanOptions } from "../../components/soda-can/SodaCanEngine.js";
import type { MotionController } from "../../components/soda-can/motion-runtime";
const props = defineProps<{ options?: SodaCanOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountSodaCan(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="soda-can" /></template>
