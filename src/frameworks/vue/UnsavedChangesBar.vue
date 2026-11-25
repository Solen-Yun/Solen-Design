<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountUnsavedChangesBar, type UnsavedChangesBarOptions } from "../../components/unsaved-changes-bar/UnsavedChangesBarEngine.js";
import type { MotionController } from "../../components/unsaved-changes-bar/motion-runtime";
const props = defineProps<{ options?: UnsavedChangesBarOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountUnsavedChangesBar(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="unsaved-changes-bar" /></template>
