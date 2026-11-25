<script lang="ts">
import { onMount } from "svelte";
import { mountPasskeySignin, type PasskeySigninOptions } from "../../components/passkey-signin/PasskeySigninEngine.js";
import type { MotionController } from "../../components/passkey-signin/motion-runtime";
export let options: PasskeySigninOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountPasskeySignin(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="passkey-signin"></div>
