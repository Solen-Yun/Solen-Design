<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountStackToFan, type StackToFanOptions } from "../../components/stack-to-fan/StackToFanEngine.js";
import type { MotionController } from "../../components/stack-to-fan/motion-runtime";
const props = defineProps<{ options?: StackToFanOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountStackToFan(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="stack-to-fan" /></template>
