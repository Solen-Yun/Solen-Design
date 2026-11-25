<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountHeroStaggerIntro, type HeroStaggerIntroOptions } from "../../components/hero-stagger-intro/HeroStaggerIntroEngine.js";
import type { MotionController } from "../../components/hero-stagger-intro/motion-runtime";
const props = defineProps<{ options?: HeroStaggerIntroOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountHeroStaggerIntro(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="hero-stagger-intro" /></template>
