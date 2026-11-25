<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountCircularThemeSwitch, type CircularThemeSwitchOptions } from "../../components/circular-theme-switch/CircularThemeSwitchEngine.js";
import type { MotionController } from "../../components/circular-theme-switch/motion-runtime";
const props = defineProps<{ options?: CircularThemeSwitchOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountCircularThemeSwitch(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="circular-theme-switch" /></template>
