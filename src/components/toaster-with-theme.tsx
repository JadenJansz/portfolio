"use client";

import { useTheme } from "next-themes";
import { Toaster } from "sonner";

export default function ToasterWithTheme() {
  const { theme } = useTheme();

  return (
    <Toaster
      theme={theme === "dark" ? "dark" : "light"}
      style={{ fontFamily: "inherit", overflowWrap: "anywhere" }}
      toastOptions={{
        unstyled: true,
        duration: 3000,
        classNames: {
          toast:
            "flex flex-row w-full items-center gap-[8px] text-sm p-4 rounded-lg",
          error:
            "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-red-200 border-2 text-red-700 border-red-500",
          success:
            "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-green-200 border-2 text-green-700 border-green-500",
          warning:
            "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-yellow-200 border-2 text-yellow-700 border-yellow-500",
          info: "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-blue-200 border-2 text-blue-700 border-blue-500",
        },
      }}
    />
  );
}
