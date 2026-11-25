<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountCouponTear, type CouponTearOptions } from "../../components/coupon-tear/CouponTearEngine.js";
import type { MotionController } from "../../components/coupon-tear/motion-runtime";
const props = defineProps<{ options?: CouponTearOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountCouponTear(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="coupon-tear" /></template>
