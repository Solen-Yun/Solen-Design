<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountLinkShortener, type LinkShortenerOptions } from "../../components/link-shortener/LinkShortenerEngine.js";
import type { MotionController } from "../../components/link-shortener/motion-runtime";
const props = defineProps<{ options?: LinkShortenerOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountLinkShortener(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="link-shortener" /></template>
