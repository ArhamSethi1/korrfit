import { z } from "zod";

export const goals = [
  "Weight loss",
  "Muscle gain",
  "General fitness",
  "Personal training",
  "Zumba / group classes",
] as const;

export const days = [
  "Any day",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

export const timeSlots = [
  "Early morning (5:30 – 8 AM)",
  "Morning (8 – 11 AM)",
  "Evening (5 – 8 PM)",
  "Night (8 – 10:30 PM)",
] as const;

export const leadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Please enter your name" })
    .max(80, { message: "Name is too long" }),
  phone: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, { message: "Enter a valid 10-digit mobile number" }),
  email: z
    .string()
    .trim()
    .max(255, { message: "Email is too long" })
    .email({ message: "Enter a valid email address" })
    .or(z.literal("")),
  goal: z.enum(goals),
  preferredDay: z.enum(days),
  preferredTime: z.enum(timeSlots),
  message: z.string().trim().max(600, { message: "Message is too long" }),
  plan: z.string().trim().max(80),
  source: z.string().trim().max(40),
});

export type LeadInput = z.infer<typeof leadSchema>;
