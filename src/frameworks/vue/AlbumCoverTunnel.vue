<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountAlbumCoverTunnel, type AlbumCoverTunnelOptions } from "../../components/album-cover-tunnel/AlbumCoverTunnelEngine.js";
import type { MotionController } from "../../components/album-cover-tunnel/motion-runtime";
const props = defineProps<{ options?: AlbumCoverTunnelOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountAlbumCoverTunnel(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="album-cover-tunnel" /></template>
