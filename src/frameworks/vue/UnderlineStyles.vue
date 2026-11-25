<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountUnderlineStyles, type UnderlineStylesOptions } from "../../components/underline-styles/UnderlineStylesEngine.js";
import type { MotionController } from "../../components/underline-styles/motion-runtime";
const props = defineProps<{ options?: UnderlineStylesOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountUnderlineStyles(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="underline-styles" /></template>
