<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountCookieConsent, type CookieConsentOptions } from "../../components/cookie-consent/CookieConsentEngine.js";
import type { MotionController } from "../../components/cookie-consent/motion-runtime";
const props = defineProps<{ options?: CookieConsentOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountCookieConsent(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="cookie-consent" /></template>
