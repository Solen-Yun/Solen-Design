<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountFormErrorJump, type FormErrorJumpOptions } from "../../components/form-error-jump/FormErrorJumpEngine.js";
import type { MotionController } from "../../components/form-error-jump/motion-runtime";
const props = defineProps<{ options?: FormErrorJumpOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountFormErrorJump(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="form-error-jump" /></template>
