<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountBouncyAccessRequest, type BouncyAccessRequestOptions } from "../../components/bouncy-access-request/BouncyAccessRequestEngine.js";
import type { MotionController } from "../../components/bouncy-access-request/motion-runtime";
const props = defineProps<{ options?: BouncyAccessRequestOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountBouncyAccessRequest(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="bouncy-access" /></template>
