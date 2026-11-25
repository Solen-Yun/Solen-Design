<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountPhotoTrail, type PhotoTrailOptions } from "../../components/photo-trail/PhotoTrailEngine.js";
import type { MotionController } from "../../components/photo-trail/motion-runtime";
const props = defineProps<{ options?: PhotoTrailOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountPhotoTrail(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="photo-trail" /></template>
