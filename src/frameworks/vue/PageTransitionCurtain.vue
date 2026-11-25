<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountPageTransitionCurtain, type PageTransitionCurtainOptions } from "../../components/page-transition-curtain/PageTransitionCurtainEngine.js";
import type { MotionController } from "../../components/page-transition-curtain/motion-runtime";
const props = defineProps<{ options?: PageTransitionCurtainOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountPageTransitionCurtain(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="page-transition-curtain" /></template>
