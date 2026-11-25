<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountAddressSearch, type AddressSearchOptions } from "../../components/address-search/AddressSearchEngine.js";
import type { MotionController } from "../../components/address-search/motion-runtime";
const props = defineProps<{ options?: AddressSearchOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountAddressSearch(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="address-search" /></template>
