<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountMentionComment, type MentionCommentOptions } from "../../components/mention-comment/MentionCommentEngine.js";
import type { MotionController } from "../../components/mention-comment/motion-runtime";
const props = defineProps<{ options?: MentionCommentOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountMentionComment(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="mention-comment" /></template>
