<script lang="ts">
import { onMount } from "svelte";
import { mountTeamInvite, type TeamInviteOptions } from "../../components/team-invite/TeamInviteEngine.js";
import type { MotionController } from "../../components/team-invite/motion-runtime";
export let options: TeamInviteOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountTeamInvite(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="team-invite"></div>
