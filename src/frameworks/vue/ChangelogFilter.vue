<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountChangelogFilter, type ChangelogFilterOptions } from "../../components/changelog-filter/ChangelogFilterEngine.js";
import type { MotionController } from "../../components/changelog-filter/motion-runtime";
const props = defineProps<{ options?: ChangelogFilterOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountChangelogFilter(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="changelog-filter" /></template>
