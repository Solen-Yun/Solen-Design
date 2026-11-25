<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountRecentPurchaseToast, type RecentPurchaseToastOptions } from "../../components/recent-purchase-toast/RecentPurchaseToastEngine.js";
import type { MotionController } from "../../components/recent-purchase-toast/motion-runtime";
const props = defineProps<{ options?: RecentPurchaseToastOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountRecentPurchaseToast(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="recent-purchase-toast" /></template>
