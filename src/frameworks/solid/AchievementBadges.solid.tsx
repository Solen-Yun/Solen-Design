/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountAchievementBadges, type AchievementBadgesOptions } from "../../components/achievement-badges/AchievementBadgesEngine.js";
import type { MotionController } from "../../components/achievement-badges/motion-runtime";

export function AchievementBadges(props: { options?: AchievementBadgesOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountAchievementBadges(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="achievement-badges" />;
}
