<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountXrayCodeLens, type XrayCodeLensOptions } from "../../components/xray-code-lens/XrayCodeLensEngine.js";
import type { MotionController } from "../../components/xray-code-lens/motion-runtime";
const props = defineProps<{ options?: XrayCodeLensOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountXrayCodeLens(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="xray-code-lens" /></template>
