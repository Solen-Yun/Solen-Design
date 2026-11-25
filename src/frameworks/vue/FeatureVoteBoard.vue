<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountFeatureVoteBoard, type FeatureVoteBoardOptions } from "../../components/feature-vote-board/FeatureVoteBoardEngine.js";
import type { MotionController } from "../../components/feature-vote-board/motion-runtime";
const props = defineProps<{ options?: FeatureVoteBoardOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountFeatureVoteBoard(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="feature-vote-board" /></template>
