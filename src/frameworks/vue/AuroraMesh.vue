<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountAuroraMesh, type AuroraMeshOptions } from "../../components/aurora-mesh/AuroraMeshEngine.js";
import type { MotionController } from "../../components/aurora-mesh/motion-runtime";
const props = defineProps<{ options?: AuroraMeshOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountAuroraMesh(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="aurora-mesh" /></template>
