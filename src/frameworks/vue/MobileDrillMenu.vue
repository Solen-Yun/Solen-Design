<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountMobileDrillMenu, type MobileDrillMenuOptions } from "../../components/mobile-drill-menu/MobileDrillMenuEngine.js";
import type { MotionController } from "../../components/mobile-drill-menu/motion-runtime";
const props = defineProps<{ options?: MobileDrillMenuOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountMobileDrillMenu(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="mobile-drill-menu" /></template>
