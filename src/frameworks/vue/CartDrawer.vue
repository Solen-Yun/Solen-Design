<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountCartDrawer, type CartDrawerOptions } from "../../components/cart-drawer/CartDrawerEngine.js";
import type { MotionController } from "../../components/cart-drawer/motion-runtime";
const props = defineProps<{ options?: CartDrawerOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountCartDrawer(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="cart-drawer" /></template>
