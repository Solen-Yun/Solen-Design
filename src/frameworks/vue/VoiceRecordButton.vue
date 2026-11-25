<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountVoiceRecordButton, type VoiceRecordButtonOptions } from "../../components/voice-record-button/VoiceRecordButtonEngine.js";
import type { MotionController } from "../../components/voice-record-button/motion-runtime";
const props = defineProps<{ options?: VoiceRecordButtonOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountVoiceRecordButton(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="voice-record-button" /></template>
