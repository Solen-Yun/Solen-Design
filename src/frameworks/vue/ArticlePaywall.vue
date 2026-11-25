<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountArticlePaywall, type ArticlePaywallOptions } from "../../components/article-paywall/ArticlePaywallEngine.js";
import type { MotionController } from "../../components/article-paywall/motion-runtime";
const props = defineProps<{ options?: ArticlePaywallOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountArticlePaywall(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="article-paywall" /></template>
