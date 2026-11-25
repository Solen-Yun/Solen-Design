<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountOtpVerification, type OtpVerificationOptions } from "../../components/otp-verification/OtpVerificationEngine.js";
import type { MotionController } from "../../components/otp-verification/motion-runtime";
const props = defineProps<{ options?: OtpVerificationOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountOtpVerification(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="otp-verification" /></template>
