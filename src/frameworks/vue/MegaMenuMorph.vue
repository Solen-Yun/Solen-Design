<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountMegaMenuMorph, type MegaMenuMorphOptions } from "../../components/mega-menu-morph/MegaMenuMorphEngine.js";
import type { MotionController } from "../../components/mega-menu-morph/motion-runtime";
const props = defineProps<{ options?: MegaMenuMorphOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountMegaMenuMorph(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="mega-menu-morph" /></template>
