<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountTrustBadges, type TrustBadgesOptions } from "../../components/trust-badges/TrustBadgesEngine.js";
import type { MotionController } from "../../components/trust-badges/motion-runtime";
const props = defineProps<{ options?: TrustBadgesOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountTrustBadges(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="trust-badges" /></template>
