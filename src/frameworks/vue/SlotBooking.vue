<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountSlotBooking, type SlotBookingOptions } from "../../components/slot-booking/SlotBookingEngine.js";
import type { MotionController } from "../../components/slot-booking/motion-runtime";
const props = defineProps<{ options?: SlotBookingOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountSlotBooking(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="slot-booking" /></template>
