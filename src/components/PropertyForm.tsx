"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";


// -----------------------------
// VALIDATION SCHEMA (ZOD)
// -----------------------------
export const propertySchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),

  latitude: z.number()
    .min(-90, "Latitude must be >= -90")
    .max(90, "Latitude must be <= 90"),

  longitude: z.number()
    .min(-180, "Longitude must be >= -180")
    .max(180, "Longitude must be <= 180"),

  price: z.number()
    .positive("Price must be positive"),

  paymentPlan: z.string().min(1, "Select a payment plan"),

  image: z.any().optional(),
});

export type PropertyFormValues = z.infer<typeof propertySchema>;

// -----------------------------
// COMPONENT
// -----------------------------
export default function PropertyForm() {
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);

  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      title: "",
      latitude: 0,
      longitude: 0,
      price: 0,
      image: "",
      paymentPlan: "",
    },
  });

  // -----------------------------
  // HANDLE SUBMIT
  // -----------------------------
  function onSubmit(values: PropertyFormValues) {
    console.log("FORM DATA:", values);
    alert("Form submitted successfully (frontend only)");
  }

  // -----------------------------
  // HANDLE IMAGE
  // -----------------------------
  function handleImageChange(file: File | null) {
    if (!file) return;

    const url = URL.createObjectURL(file);
    setImagePreview(url);
  }

  // -----------------------------
  // UI
  // -----------------------------
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

        {/* TITLE */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Property Title</FormLabel>
              <FormControl>
                <input
                  {...field}
                  className="w-full border rounded-md p-2"
                  placeholder="Enter property name"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* GPS LATITUDE */}
        <FormField
          control={form.control}
          name="latitude"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Latitude</FormLabel>
              <FormControl>
                <input
                  type="number"
                  step="any"
                  value={field.value}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  className="w-full border rounded-md p-2"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* GPS LONGITUDE */}
        <FormField
          control={form.control}
          name="longitude"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Longitude</FormLabel>
              <FormControl>
                <input
                  type="number"
                  step="any"
                  value={field.value}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  className="w-full border rounded-md p-2"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* PRICE */}
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <input
                  type="number"
                  value={field.value}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  className="w-full border rounded-md p-2"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* PAYMENT PLAN */}
        <FormField
          control={form.control}
          name="paymentPlan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payment Plan</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="installments">Installments</SelectItem>
                    <SelectItem value="mortgage">Mortgage</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* IMAGE UPLOAD */}
        <FormField
          control={form.control}
          name="image"
          render={() => (
            <FormItem>
              <FormLabel>Upload Image</FormLabel>
              <FormControl>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleImageChange(e.target.files?.[0] || null)
                  }
                />
              </FormControl>

              {/* PREVIEW */}
              {imagePreview && (
               <img
               src={imagePreview}
               alt="Preview"
               className="mt-2 w-40 h-40 object-cover rounded"
               /> 
              )}

              <FormMessage />
            </FormItem>
          )}
        />

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Submit Property
        </button>
      </form>
    </Form>
  );
}