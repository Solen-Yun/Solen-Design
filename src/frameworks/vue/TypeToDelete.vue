<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountTypeToDelete, type TypeToDeleteOptions } from "../../components/type-to-delete/TypeToDeleteEngine.js";
import type { MotionController } from "../../components/type-to-delete/motion-runtime";
const props = defineProps<{ options?: TypeToDeleteOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountTypeToDelete(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="type-to-delete" /></template>
