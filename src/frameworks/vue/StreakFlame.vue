<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountStreakFlame, type StreakFlameOptions } from "../../components/streak-flame/StreakFlameEngine.js";
import type { MotionController } from "../../components/streak-flame/motion-runtime";
const props = defineProps<{ options?: StreakFlameOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountStreakFlame(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="streak-flame" /></template>
