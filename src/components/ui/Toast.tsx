"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Info } from "lucide-react";

export type ToastData = {
  id: number;
  message: string;
  kind: "success" | "info";
};

export default function Toast({ toast }: { toast: ToastData | null }) {
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          key={toast.id}
          initial={{ opacity: 0, y: 24, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 420, damping: 30 }}
          className="fixed bottom-8 left-1/2 z-[80] flex -translate-x-1/2 items-center gap-2.5 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white shadow-float"
        >
          <motion.span
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 500, damping: 22 }}
            className={toast.kind === "success" ? "text-terra-300" : "text-ocean-300"}
          >
            {toast.kind === "success" ? (
              <CheckCircle2 size={18} />
            ) : (
              <Info size={18} />
            )}
          </motion.span>
          {toast.message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
