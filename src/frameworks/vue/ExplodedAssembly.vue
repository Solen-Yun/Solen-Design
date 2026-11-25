<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountExplodedAssembly, type ExplodedAssemblyOptions } from "../../components/exploded-assembly/ExplodedAssemblyEngine.js";
import type { MotionController } from "../../components/exploded-assembly/motion-runtime";
const props = defineProps<{ options?: ExplodedAssemblyOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountExplodedAssembly(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="exploded-assembly" /></template>
