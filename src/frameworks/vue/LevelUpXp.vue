<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountLevelUpXp, type LevelUpXpOptions } from "../../components/level-up-xp/LevelUpXpEngine.js";
import type { MotionController } from "../../components/level-up-xp/motion-runtime";
const props = defineProps<{ options?: LevelUpXpOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountLevelUpXp(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="level-up-xp" /></template>
