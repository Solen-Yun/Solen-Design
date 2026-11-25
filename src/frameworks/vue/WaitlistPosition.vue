<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountWaitlistPosition, type WaitlistPositionOptions } from "../../components/waitlist-position/WaitlistPositionEngine.js";
import type { MotionController } from "../../components/waitlist-position/motion-runtime";
const props = defineProps<{ options?: WaitlistPositionOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountWaitlistPosition(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="waitlist-position" /></template>
