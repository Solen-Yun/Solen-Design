<script lang="ts">
import { onMount } from "svelte";
import { mountMentionComment, type MentionCommentOptions } from "../../components/mention-comment/MentionCommentEngine.js";
import type { MotionController } from "../../components/mention-comment/motion-runtime";
export let options: MentionCommentOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountMentionComment(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="mention-comment"></div>
