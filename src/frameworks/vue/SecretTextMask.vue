<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountSecretTextMask, type SecretTextMaskOptions } from "../../components/secret-text-mask/SecretTextMaskEngine.js";
import type { MotionController } from "../../components/secret-text-mask/motion-runtime";
const props = defineProps<{ options?: SecretTextMaskOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountSecretTextMask(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="secret-text-mask" /></template>
