<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountShaderFlood, type ShaderFloodOptions } from "../../components/shader-flood/ShaderFloodEngine.js";
import type { MotionController } from "../../components/shader-flood/motion-runtime";
const props = defineProps<{ options?: ShaderFloodOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountShaderFlood(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="shader-flood" /></template>
