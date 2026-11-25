<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountApiPlayground, type ApiPlaygroundOptions } from "../../components/api-playground/ApiPlaygroundEngine.js";
import type { MotionController } from "../../components/api-playground/motion-runtime";
const props = defineProps<{ options?: ApiPlaygroundOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountApiPlayground(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="api-playground" /></template>
