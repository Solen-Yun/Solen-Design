<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountTerminalDemo, type TerminalDemoOptions } from "../../components/terminal-demo/TerminalDemoEngine.js";
import type { MotionController } from "../../components/terminal-demo/motion-runtime";
const props = defineProps<{ options?: TerminalDemoOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountTerminalDemo(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="terminal-demo" /></template>
