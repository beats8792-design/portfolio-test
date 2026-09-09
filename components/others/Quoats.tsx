"use client";
import { useCallback, useEffect, useState } from "react";
import { TextFlippingBoard } from "../animations/FlippingBoard";

export function Quoats({ messages }: { messages: string[] }) {
  const [msgIdx, setMsgIdx] = useState(0);

  const next = useCallback(
    () => setMsgIdx((i) => (i + 1) % messages.length),
    [],
  );

  useEffect(() => {
    const id = setInterval(next, 12000);
    return () => clearInterval(id);
  }, [next]);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-8 py-20">
      <TextFlippingBoard text={messages[msgIdx]} />
    </div>
  );
}
