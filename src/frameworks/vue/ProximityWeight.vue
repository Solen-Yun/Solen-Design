<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountProximityWeight, type ProximityWeightOptions } from "../../components/proximity-weight/ProximityWeightEngine.js";
import type { MotionController } from "../../components/proximity-weight/motion-runtime";
const props = defineProps<{ options?: ProximityWeightOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountProximityWeight(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="proximity-weight" /></template>
