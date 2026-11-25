<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountConditionalContact, type ConditionalContactOptions } from "../../components/conditional-contact/ConditionalContactEngine.js";
import type { MotionController } from "../../components/conditional-contact/motion-runtime";
const props = defineProps<{ options?: ConditionalContactOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountConditionalContact(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="conditional-contact" /></template>
