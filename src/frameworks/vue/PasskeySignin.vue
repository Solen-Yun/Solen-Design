<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountPasskeySignin, type PasskeySigninOptions } from "../../components/passkey-signin/PasskeySigninEngine.js";
import type { MotionController } from "../../components/passkey-signin/motion-runtime";
const props = defineProps<{ options?: PasskeySigninOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountPasskeySignin(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="passkey-signin" /></template>
