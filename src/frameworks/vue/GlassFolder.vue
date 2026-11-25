<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountGlassFolder, type GlassFolderOptions } from "../../components/glass-folder/GlassFolderEngine.js";
import type { MotionController } from "../../components/glass-folder/motion-runtime";
const props = defineProps<{ options?: GlassFolderOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountGlassFolder(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="glass-folder" /></template>
