<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountGiftBox, type GiftBoxOptions } from "../../components/gift-box/GiftBoxEngine.js";
import type { MotionController } from "../../components/gift-box/motion-runtime";
const props = defineProps<{ options?: GiftBoxOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountGiftBox(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="gift-box" /></template>
