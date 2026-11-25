<script lang="ts">
import { onMount } from "svelte";
import { mountVoiceRecordButton, type VoiceRecordButtonOptions } from "../../components/voice-record-button/VoiceRecordButtonEngine.js";
import type { MotionController } from "../../components/voice-record-button/motion-runtime";
export let options: VoiceRecordButtonOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountVoiceRecordButton(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="voice-record-button"></div>
