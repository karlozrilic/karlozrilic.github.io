import { z } from 'zod';

export const experienceSchema = z.object({
    job_title: z.string().min(1, 'Job title is required'),
    company_name: z.string().min(1, 'Company name is required'),
    city: z.string().min(1, 'City is required'),
    country: z.string().min(1, 'Country is required'),
    work_model: z.string().min(1, 'Work model is required'),
    currently_working: z.boolean(),
    start_date: z.date().min(1, 'Start date is required'),
    end_date: z.date().optional()
}).refine(
    (data) => data.currently_working || data.end_date !== undefined,
    { message: 'End date is required', path: ['end_date'] }
);