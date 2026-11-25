<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountStickyPhoneScreens, type StickyPhoneScreensOptions } from "../../components/sticky-phone-screens/StickyPhoneScreensEngine.js";
import type { MotionController } from "../../components/sticky-phone-screens/motion-runtime";
const props = defineProps<{ options?: StickyPhoneScreensOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountStickyPhoneScreens(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="sticky-phone-screens" /></template>
