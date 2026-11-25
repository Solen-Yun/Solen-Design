<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountCollectionLayoutMorph, type CollectionLayoutMorphOptions } from "../../components/collection-layout-morph/CollectionLayoutMorphEngine.js";
import type { MotionController } from "../../components/collection-layout-morph/motion-runtime";
const props = defineProps<{ options?: CollectionLayoutMorphOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountCollectionLayoutMorph(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="collection-layout-morph" /></template>
