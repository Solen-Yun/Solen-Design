<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountWordCloud, type WordCloudOptions } from "../../components/word-cloud/WordCloudEngine.js";
import type { MotionController } from "../../components/word-cloud/motion-runtime";
const props = defineProps<{ options?: WordCloudOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountWordCloud(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="word-cloud" /></template>
