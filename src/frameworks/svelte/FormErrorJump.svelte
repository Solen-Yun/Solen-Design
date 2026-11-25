<script lang="ts">
import { onMount } from "svelte";
import { mountFormErrorJump, type FormErrorJumpOptions } from "../../components/form-error-jump/FormErrorJumpEngine.js";
import type { MotionController } from "../../components/form-error-jump/motion-runtime";
export let options: FormErrorJumpOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountFormErrorJump(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="form-error-jump"></div>
