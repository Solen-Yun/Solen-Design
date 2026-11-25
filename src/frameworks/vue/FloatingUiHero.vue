<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountFloatingUiHero, type FloatingUiHeroOptions } from "../../components/floating-ui-hero/FloatingUiHeroEngine.js";
import type { MotionController } from "../../components/floating-ui-hero/motion-runtime";
const props = defineProps<{ options?: FloatingUiHeroOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountFloatingUiHero(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="floating-ui-hero" /></template>
