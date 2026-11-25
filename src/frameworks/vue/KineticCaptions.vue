<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountKineticCaptions, type KineticCaptionsOptions } from "../../components/kinetic-captions/KineticCaptionsEngine.js";
import type { MotionController } from "../../components/kinetic-captions/motion-runtime";
const props = defineProps<{ options?: KineticCaptionsOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountKineticCaptions(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="kinetic-captions" /></template>
