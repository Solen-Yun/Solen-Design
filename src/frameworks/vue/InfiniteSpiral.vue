<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountInfiniteSpiral, type InfiniteSpiralOptions } from "../../components/infinite-spiral/InfiniteSpiralEngine.js";
const props = defineProps<{ options?: InfiniteSpiralOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: ReturnType<typeof mountInfiniteSpiral> | undefined;
onMounted(() => { controller = mountInfiniteSpiral(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="infinite-spiral" /></template>
