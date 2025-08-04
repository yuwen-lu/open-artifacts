"use client";

import { Models } from "@/app/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

interface ModelSelectorProps {
  value: Models;
  onChange: (model: Models) => void;
}

export const ModelSelector = ({ value, onChange }: ModelSelectorProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">Model</label>
      <Select value={value} onValueChange={(val) => onChange(val as Models)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select model" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={Models.claudeSonnet4}>Claude Sonnet 4</SelectItem>
          <SelectItem value={Models.claudeOpus4}>Claude Opus 4</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};