<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountAchievementBadges, type AchievementBadgesOptions } from "../../components/achievement-badges/AchievementBadgesEngine.js";
import type { MotionController } from "../../components/achievement-badges/motion-runtime";
const props = defineProps<{ options?: AchievementBadgesOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountAchievementBadges(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="achievement-badges" /></template>
