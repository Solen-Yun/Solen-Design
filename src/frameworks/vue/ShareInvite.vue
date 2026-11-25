<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountShareInvite, type ShareInviteOptions } from "../../components/share-invite/ShareInviteEngine.js";
import type { MotionController } from "../../components/share-invite/motion-runtime";
const props = defineProps<{ options?: ShareInviteOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountShareInvite(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="share-invite" /></template>
