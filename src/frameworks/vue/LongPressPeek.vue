<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountLongPressPeek, type LongPressPeekOptions } from "../../components/long-press-peek/LongPressPeekEngine.js";
import type { MotionController } from "../../components/long-press-peek/motion-runtime";
const props = defineProps<{ options?: LongPressPeekOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountLongPressPeek(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="long-press-peek" /></template>
