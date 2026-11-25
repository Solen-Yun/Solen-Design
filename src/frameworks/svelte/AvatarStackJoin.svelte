<script lang="ts">
import { onMount } from "svelte";
import { mountAvatarStackJoin, type AvatarStackJoinOptions } from "../../components/avatar-stack-join/AvatarStackJoinEngine.js";
import type { MotionController } from "../../components/avatar-stack-join/motion-runtime";
export let options: AvatarStackJoinOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountAvatarStackJoin(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="avatar-stack-join"></div>
