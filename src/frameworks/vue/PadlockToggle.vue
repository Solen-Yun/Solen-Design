<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountPadlockToggle, type PadlockToggleOptions } from "../../components/padlock-toggle/PadlockToggleEngine.js";
import type { MotionController } from "../../components/padlock-toggle/motion-runtime";
const props = defineProps<{ options?: PadlockToggleOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountPadlockToggle(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="padlock-toggle" /></template>
