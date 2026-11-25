<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountBlisterDropdown, type BlisterDropdownOptions } from "../../components/blister-dropdown/BlisterDropdownEngine.js";
import type { MotionController } from "../../components/blister-dropdown/motion-runtime";
const props = defineProps<{ options?: BlisterDropdownOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountBlisterDropdown(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="blister-dropdown" /></template>
