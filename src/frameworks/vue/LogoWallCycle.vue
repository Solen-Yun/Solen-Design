<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountLogoWallCycle, type LogoWallCycleOptions } from "../../components/logo-wall-cycle/LogoWallCycleEngine.js";
import type { MotionController } from "../../components/logo-wall-cycle/motion-runtime";
const props = defineProps<{ options?: LogoWallCycleOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountLogoWallCycle(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="logo-wall-cycle" /></template>
