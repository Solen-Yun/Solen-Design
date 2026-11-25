<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountDeliveryCutoff, type DeliveryCutoffOptions } from "../../components/delivery-cutoff/DeliveryCutoffEngine.js";
import type { MotionController } from "../../components/delivery-cutoff/motion-runtime";
const props = defineProps<{ options?: DeliveryCutoffOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountDeliveryCutoff(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="delivery-cutoff" /></template>
