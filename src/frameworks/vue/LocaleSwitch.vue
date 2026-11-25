<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountLocaleSwitch, type LocaleSwitchOptions } from "../../components/locale-switch/LocaleSwitchEngine.js";
import type { MotionController } from "../../components/locale-switch/motion-runtime";
const props = defineProps<{ options?: LocaleSwitchOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountLocaleSwitch(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="locale-switch" /></template>
