<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountStoreLocator, type StoreLocatorOptions } from "../../components/store-locator/StoreLocatorEngine.js";
import type { MotionController } from "../../components/store-locator/motion-runtime";
const props = defineProps<{ options?: StoreLocatorOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountStoreLocator(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="store-locator" /></template>
