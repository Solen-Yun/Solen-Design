<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountDomainSearch, type DomainSearchOptions } from "../../components/domain-search/DomainSearchEngine.js";
import type { MotionController } from "../../components/domain-search/motion-runtime";
const props = defineProps<{ options?: DomainSearchOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountDomainSearch(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="domain-search" /></template>
