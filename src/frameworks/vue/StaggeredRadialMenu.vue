<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountStaggeredRadialMenu, type StaggeredRadialMenuOptions } from "../../components/staggered-radial-menu/StaggeredRadialMenuEngine.js";
import type { MotionController } from "../../components/staggered-radial-menu/motion-runtime";
const props = defineProps<{ options?: StaggeredRadialMenuOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountStaggeredRadialMenu(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="staggered-radial-menu" /></template>
