<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountShareDialog, type ShareDialogOptions } from "../../components/share-dialog/ShareDialogEngine.js";
import type { MotionController } from "../../components/share-dialog/motion-runtime";
const props = defineProps<{ options?: ShareDialogOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountShareDialog(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="share-dialog" /></template>
