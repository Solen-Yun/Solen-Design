/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { mountMentionComment, type MentionCommentOptions } from "../../components/mention-comment/MentionCommentEngine.js";
import type { MotionController } from "../../components/mention-comment/motion-runtime";

export function MentionComment({ options, className }: { options?: MentionCommentOptions; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<MotionController | null>(null);
  useEffect(() => {
    const instance = mountMentionComment(host.current!, options);
    controller.current = instance;
    return () => { instance.destroy(); controller.current = null; };
    // Options are updated below without remounting the state machine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { controller.current?.update(options ?? {}); }, [options]);
  return <div ref={host} className={className} data-motion-component="mention-comment" />;
}
