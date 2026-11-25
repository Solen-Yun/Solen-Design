<script lang="ts">
import { onMount } from "svelte";
import { mountInstallCommandTabs, type InstallCommandTabsOptions } from "../../components/install-command-tabs/InstallCommandTabsEngine.js";
import type { MotionController } from "../../components/install-command-tabs/motion-runtime";
export let options: InstallCommandTabsOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountInstallCommandTabs(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="install-command-tabs"></div>
