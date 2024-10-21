"use client";

import { useState } from "react";
import { useIsMobile } from "@repo/use-is-pwa";

export default function ResponsiveDemo() {
  const { isMobile, width } = useIsMobile({});
  const [count, setCount] = useState(0);
  // Check if we are on the client

  return (
    <div className="w-full max-w-md">
      <p className="mb-4">{`Current width: ${width}px`}</p>
      <p className="mb-4">
        {isMobile
          ? "You're viewing this on a mobile device."
          : "You're viewing this on a desktop device."}
      </p>
      <p className="mb-4">Counter: {count}</p>
      <div className={`grid ${isMobile ? "grid-cols-1" : "grid-cols-2"} gap-4`}>
        <button type="button" onClick={() => setCount(count + 1)}>
          Increment
        </button>
        <button type="button" onClick={() => setCount(0)}>
          Reset
        </button>
      </div>
    </div>
  );
}
