<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountMapClusters, type MapClustersOptions } from "../../components/map-clusters/MapClustersEngine.js";
import type { MotionController } from "../../components/map-clusters/motion-runtime";
const props = defineProps<{ options?: MapClustersOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountMapClusters(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="map-clusters" /></template>
