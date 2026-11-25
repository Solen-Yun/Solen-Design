<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountAvatarStackJoin, type AvatarStackJoinOptions } from "../../components/avatar-stack-join/AvatarStackJoinEngine.js";
import type { MotionController } from "../../components/avatar-stack-join/motion-runtime";
const props = defineProps<{ options?: AvatarStackJoinOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountAvatarStackJoin(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="avatar-stack-join" /></template>
