<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountCoffeeCupSize, type CoffeeCupSizeOptions } from "../../components/coffee-cup-size/CoffeeCupSizeEngine.js";
import type { MotionController } from "../../components/coffee-cup-size/motion-runtime";
const props = defineProps<{ options?: CoffeeCupSizeOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountCoffeeCupSize(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="coffee-cup-size" /></template>
