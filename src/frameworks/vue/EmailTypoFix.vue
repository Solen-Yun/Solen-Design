<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountEmailTypoFix, type EmailTypoFixOptions } from "../../components/email-typo-fix/EmailTypoFixEngine.js";
import type { MotionController } from "../../components/email-typo-fix/motion-runtime";
const props = defineProps<{ options?: EmailTypoFixOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountEmailTypoFix(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="email-typo-fix" /></template>
