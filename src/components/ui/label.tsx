"use client";

import * as React from "react";

export function Label({ children, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label className="text-sm font-medium" {...props}>
      {children}
    </label>
  );
}