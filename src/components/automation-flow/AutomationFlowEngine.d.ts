import type { MotionOptions, MotionController } from "./motion-runtime";
export type AutomationFlowStep = { title: string; idle: string; done: string };
export type AutomationFlowOptions = MotionOptions & { heading?: string; status?: string; steps?: Partial<AutomationFlowStep>[]; onComplete?: () => void };
export function mountAutomationFlow(target: HTMLElement, options?: AutomationFlowOptions): Omit<MotionController, "update"> & { update(options: AutomationFlowOptions): void };
