<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountTeamInvite, type TeamInviteOptions } from "../../components/team-invite/TeamInviteEngine.js";
import type { MotionController } from "../../components/team-invite/motion-runtime";
const props = defineProps<{ options?: TeamInviteOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountTeamInvite(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="team-invite" /></template>
