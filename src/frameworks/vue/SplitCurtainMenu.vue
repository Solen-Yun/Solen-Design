<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountSplitCurtainMenu, type SplitCurtainMenuOptions } from "../../components/split-curtain-menu/SplitCurtainMenuEngine.js";
import type { MotionController } from "../../components/split-curtain-menu/motion-runtime";
const props = defineProps<{ options?: SplitCurtainMenuOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountSplitCurtainMenu(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="split-curtain-menu" /></template>
