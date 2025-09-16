"use client";

import { useEffect } from "react";
import { enablePassiveEvents } from "@/lib/passive-events";

export default function PassiveEventsInit() {
  useEffect(() => {
    enablePassiveEvents();
  }, []);

  return null;
}
