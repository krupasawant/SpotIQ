"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { AREA_GROUPS } from "@/constants/data";
import { CUISINES } from "@/constants/data";
import { BUDGET_LEVELS } from "@/constants/data";
import { AUDIENCES } from "@/constants/data";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";



type FormValues = {
  area: string;
  cuisine: string;
  audience: string[];
  budget: string;
};

export function LocationForm({ onSubmit }: { onSubmit: (data: FormValues) => void }) {
  const {
  register,
  handleSubmit,
  setValue,
  watch,
  formState: { errors },
} = useForm<FormValues>({
  defaultValues: {
    area: "",
    cuisine: "",
    budget: "",
    audience: [],
  },
});

  const selectedAudience = watch("audience") || [];

  const toggleAudience = (value: string) => {
    const updated = selectedAudience.includes(value)
      ? selectedAudience.filter((v) => v !== value)
      : [...selectedAudience, value];
    setValue("audience", updated);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-md mx-auto">
      
      {/* Area Dropdown with Grouping */}
      <div>
        <Label className="mt-6 pb-2">Area</Label>
        <Select onValueChange={(value) => setValue("area", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select an area" />
          </SelectTrigger>
          <SelectContent>
            {AREA_GROUPS.map((group) => (
              <div key={group.label} className="px-2 py-1">
                <p className="text-sm font-semibold text-muted-foreground mb-1">{group.label}</p>
                {group.areas.map((area) => (
                  <SelectItem key={area} value={area}>{area}</SelectItem>
                ))}
              </div>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Cuisine Dropdown */}
      <div>
        <Label className="pb-2">Cuisine Type</Label>
        <Select onValueChange={(value) => setValue("cuisine", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select a cuisine type" />
          </SelectTrigger>
          <SelectContent>
            {CUISINES.map((cuisine) => (
              <SelectItem key={cuisine} value={cuisine}>
                {cuisine}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Target Audience Checkboxes */}
      <div>
        <Label className="pb-2">Target Audience</Label>
        <div className="flex flex-col space-y-2 mt-2">
          {AUDIENCES.map((type) => (
            <label key={type} className="flex items-center space-x-2">
              <Checkbox
                checked={selectedAudience.includes(type)}
                onCheckedChange={() => toggleAudience(type)}
              />
              <span>{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Budget Dropdown */}
      <div>
        <Label className="pb-2">Budget Level</Label>
        <Select onValueChange={(value) => setValue("budget", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select budget" />
          </SelectTrigger>
          <SelectContent>
            {BUDGET_LEVELS.map((budget) => (
              <SelectItem key={budget} value={budget}>
                {budget}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Submit Button */}
      <Button type="submit" className="w-1xl bg-violet-500 text-white">
        Get Location Score
      </Button>
    </form>
  );
}