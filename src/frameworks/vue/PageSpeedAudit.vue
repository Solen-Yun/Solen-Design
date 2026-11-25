<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountPageSpeedAudit, type PageSpeedAuditOptions } from "../../components/page-speed-audit/PageSpeedAuditEngine.js";
import type { MotionController } from "../../components/page-speed-audit/motion-runtime";
const props = defineProps<{ options?: PageSpeedAuditOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountPageSpeedAudit(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="page-speed-audit" /></template>
