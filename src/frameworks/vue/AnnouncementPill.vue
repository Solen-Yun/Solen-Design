<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountAnnouncementPill, type AnnouncementPillOptions } from "../../components/announcement-pill/AnnouncementPillEngine.js";
import type { MotionController } from "../../components/announcement-pill/motion-runtime";
const props = defineProps<{ options?: AnnouncementPillOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountAnnouncementPill(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="announcement-pill" /></template>
