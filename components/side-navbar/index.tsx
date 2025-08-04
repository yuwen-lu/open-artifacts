"use client";

import { Button } from "@/components/ui/button";
import { SidebarIcon, SquarePenIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ModelSelector } from "@/components/model-selector";
import { getSettings, updateSettings } from "@/lib/userSettings";
import { Models } from "@/app/types";

export const SideNavBar = () => {
  const [open, setOpen] = useState(false);
  const [currentModel, setCurrentModel] = useState<Models>(getSettings().model);

  const handleModelChange = (model: Models) => {
    setCurrentModel(model);
    updateSettings({ model });
  };

  if (open) {
    return (
      <div className="h-screen max-h-screen overflow-hidden flex flex-col gap-4 justify-between px-2 py-2 pb-4 bg-slate-50 w-[200px]">
        <div className="flex flex-col gap-2">
          <Link href="/" className="text-lg font-semibold text-center">
            Open Artifacts
          </Link>

          <div className="flex items-center justify-between gap-2">
            <Button onClick={() => setOpen(false)} size="icon" variant="ghost">
              <SidebarIcon className="w-4 h-4" />
            </Button>

            <Link href="/new">
              <Button size="icon" variant="ghost">
                <SquarePenIcon className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-2">
          <ModelSelector value={currentModel} onChange={handleModelChange} />
          <a
            href="https://github.com/13point5/open-artifacts"
            target="_blank"
            className="text-black flex items-center gap-4 px-1"
          >
            <Image src="/github.svg" height="24" width="24" alt="github logo" />
            <span className="text-sm font-medium">GitHub Repo</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen max-h-screen flex flex-col gap-2 justify-between px-2 py-2 pb-4 items-center">
      <div className="flex flex-col gap-2">
        <Link href="/" className="text-lg font-semibold text-center">
          OA
        </Link>

        <div className="flex items-center gap-2">
          <Button onClick={() => setOpen(true)} size="icon" variant="ghost">
            <SidebarIcon className="w-4 h-4" />
          </Button>

          <Link href="/new">
            <Button size="icon" variant="ghost">
              <SquarePenIcon className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <a
          href="https://github.com/13point5/open-artifacts"
          target="_blank"
          className="text-black"
        >
          <Image src="/github.svg" height="24" width="24" alt="github logo" />
        </a>
      </div>
    </div>
  );
};
