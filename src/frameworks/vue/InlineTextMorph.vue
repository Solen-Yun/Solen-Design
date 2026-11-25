<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountInlineTextMorph, type InlineTextMorphOptions } from "../../components/inline-text-morph/InlineTextMorphEngine.js";
import type { MotionController } from "../../components/inline-text-morph/motion-runtime";
const props = defineProps<{ options?: InlineTextMorphOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountInlineTextMorph(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="inline-text-morph" /></template>
