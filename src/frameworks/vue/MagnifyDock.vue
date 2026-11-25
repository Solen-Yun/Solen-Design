<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountMagnifyDock, type MagnifyDockOptions } from "../../components/magnify-dock/MagnifyDockEngine.js";
import type { MotionController } from "../../components/magnify-dock/motion-runtime";
const props = defineProps<{ options?: MagnifyDockOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountMagnifyDock(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="magnify-dock" /></template>
