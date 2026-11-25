<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountPhoneCountryInput, type PhoneCountryInputOptions } from "../../components/phone-country-input/PhoneCountryInputEngine.js";
import type { MotionController } from "../../components/phone-country-input/motion-runtime";
const props = defineProps<{ options?: PhoneCountryInputOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountPhoneCountryInput(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="phone-country-input" /></template>
