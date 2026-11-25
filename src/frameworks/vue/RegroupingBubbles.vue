<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountRegroupingBubbles, type RegroupingBubblesOptions } from "../../components/regrouping-bubbles/RegroupingBubblesEngine.js";
import type { MotionController } from "../../components/regrouping-bubbles/motion-runtime";
const props = defineProps<{ options?: RegroupingBubblesOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountRegroupingBubbles(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="regrouping-bubbles" /></template>
