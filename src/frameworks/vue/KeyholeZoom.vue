<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountKeyholeZoom, type KeyholeZoomOptions } from "../../components/keyhole-zoom/KeyholeZoomEngine.js";
import type { MotionController } from "../../components/keyhole-zoom/motion-runtime";
const props = defineProps<{ options?: KeyholeZoomOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountKeyholeZoom(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="keyhole-zoom" /></template>
