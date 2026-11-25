<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountDomainConnect, type DomainConnectOptions } from "../../components/domain-connect/DomainConnectEngine.js";
import type { MotionController } from "../../components/domain-connect/motion-runtime";
const props = defineProps<{ options?: DomainConnectOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountDomainConnect(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="domain-connect" /></template>
