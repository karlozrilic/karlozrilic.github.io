import { CalendarIcon, Plus, Settings } from 'lucide-react';
import { Button } from '@/app/src/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogOverlay,
    DialogTitle,
    DialogTrigger
} from '@/app/src/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/app/src/components/ui/tooltip';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from '@/app/src/components/ui/field';
import { Input } from '@/app/src/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/app/src/components/ui/radio-group';
import { InputGroup, InputGroupButton, InputGroupInput } from '@/app/src/components/ui/input-group';
import { Popover, PopoverContent, PopoverTrigger } from '@/app/src/components/ui/popover';
import { Label } from '@/app/src/components/ui/label';
import { Checkbox } from '@/app/src/components/ui/checkbox';
import { Calendar } from '@/app/src/components/ui/calendar';
import { Experience } from '@/app/src/types/experience/experience';
import { forwardRef, useImperativeHandle, useState } from 'react';

function isValidDate(date: Date | undefined) {
    if (!date) {
        return false;
    }
    return !isNaN(date.getTime());
}

export type ExperienceEditComponentRef = {
  setDialogOpen: (value: boolean) => void;
};

const ExperienceEditComponent = forwardRef(function({ experience }: { experience?: Experience }, ref) {
    const [dialogOpen, setDialogOpen] = useState(false);

    useImperativeHandle(ref, () => ({
        setDialogOpen,
    }));

    return (
        <div className='flex justify-between items-center'>
            
            {experience ?
                <HoverCard openDelay={10} closeDelay={100}>
                    <HoverCardTrigger asChild>
                        <Button variant='link'>{experience?.company_name} - {experience?.job_title}</Button>
                    </HoverCardTrigger>
                    <HoverCardContent className='flex w-64 flex-col gap-0.5'>
                        <div className='font-semibold'>{experience?.job_title}</div>
                        <div>{experience?.company_name}</div>
                        <div className='mt-1 text-xs text-muted-foreground'>
                            {experience?.start_date ? `Started: ${formatDate(new Date(experience.start_date))}` : null}
                        </div>
                        <div className='mt-1 text-xs text-muted-foreground'>
                            {experience?.end_date ? `Ended: ${formatDate(new Date(experience.end_date))}` : null}
                        </div>
                    </HoverCardContent>
                </HoverCard>
                : null}
            <Dialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
            >
                <Tooltip>
                    <TooltipTrigger asChild>
                        <DialogTrigger asChild>
                            <Button
                                variant='outline'
                                size='sm'
                            >
                                {experience ? <Settings /> : <Plus />}
                            </Button>
                        </DialogTrigger>
                    </TooltipTrigger>
                    <TooltipContent side={'bottom'}>
                        <p>{experience ? 'Edit data' : 'Add data'}</p>
                    </TooltipContent>
                </Tooltip>
                <DialogOverlay className='backdrop-blur-sm' />
                <DialogContent onOpenAutoFocus={(event) => event.preventDefault()}>
                    <ExperienceForm experience={experience} />
                </DialogContent>
            </Dialog>
        </div>
    );
});

export default ExperienceEditComponent;

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '../ui/form';
import { experienceSchema } from '@/helpers/schema';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card';
import { formatDate } from '@/helpers/constants';

function ExperienceForm({ experience }: { experience?: Experience }) {
    const form = useForm({
        resolver: zodResolver(experienceSchema),
        defaultValues: {
            job_title: experience?.job_title ?? '',
            company_name: experience?.company_name ?? '',
            city: experience?.city ?? '',
            country: experience?.country ?? '',
            work_model: experience?.work_model ?? 'on-site',
            currently_working: experience ? experience.end_date ? false : true : false,
            start_date: experience?.start_date ? new Date(experience.start_date) : new Date(),
            end_date: experience?.end_date ? new Date(experience.end_date) : new Date(),
        }
    });

    async function onSubmit(values: any) {
        console.log(values);
        // const result = await loginAction(values); // regular async call, not useActionState
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <DialogHeader>
                    <DialogTitle>{experience ? experience.company_name : 'Add experience'}</DialogTitle>
                    <DialogDescription>{experience ? 'Edit data' : null}</DialogDescription>
                </DialogHeader>
                <div className='-mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4 py-2'>
                    <FieldGroup>
                        <Controller
                            name='job_title'
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field
                                    data-invalid={fieldState.invalid}
                                >
                                    <FieldLabel htmlFor={field.name}>Job title</FieldLabel>
                                    <Input
                                        {...field}
                                        id={field.name}
                                        placeholder='Job title'
                                        aria-invalid={fieldState.invalid}
                                    />
                                    <FieldDescription>
                                        Provide a concise title for your bug report.
                                    </FieldDescription>
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />

                        <Controller
                            name='company_name'
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field
                                    data-invalid={fieldState.invalid}
                                >
                                    <FieldLabel htmlFor={field.name}>Company name</FieldLabel>
                                    <Input
                                        {...field}
                                        id={field.name}
                                        placeholder='Company name'
                                        aria-invalid={fieldState.invalid}
                                    />
                                    <FieldDescription>
                                        Provide a concise title for your bug report.
                                    </FieldDescription>
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />

                        <Controller
                            name='city'
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field
                                    data-invalid={fieldState.invalid}
                                >
                                    <FieldLabel htmlFor={field.name}>City</FieldLabel>
                                    <Input
                                        {...field}
                                        id={field.name}
                                        placeholder='City'
                                        aria-invalid={fieldState.invalid}
                                    />
                                    <FieldDescription>
                                        Provide a concise title for your bug report.
                                    </FieldDescription>
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />

                        <Controller
                            name='country'
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field
                                    data-invalid={fieldState.invalid}
                                >
                                    <FieldLabel htmlFor={field.name}>Country</FieldLabel>
                                    <Input
                                        {...field}
                                        id={field.name}
                                        placeholder='Country'
                                        aria-invalid={fieldState.invalid}
                                    />
                                    <FieldDescription>
                                        Provide a concise title for your bug report.
                                    </FieldDescription>
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />

                        <Controller
                            name='work_model'
                            control={form.control}
                            render={({ field }) => (
                                <FieldSet className='w-full max-w-xs'>
                                    <FieldLegend variant='label'>Work model</FieldLegend>
                                    <FieldDescription>
                                        Select work model
                                    </FieldDescription>
                                    <RadioGroup
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <Field orientation='horizontal'>
                                            <RadioGroupItem value='on-site' id='on-site' />
                                            <FieldLabel htmlFor='on-site' className='font-normal cursor-pointer'>
                                                On site
                                            </FieldLabel>
                                        </Field>
                                        <Field orientation='horizontal'>
                                            <RadioGroupItem value='hybrid' id='hybrid' />
                                            <FieldLabel htmlFor='hybrid' className='font-normal cursor-pointer'>
                                                Hybrid
                                            </FieldLabel>
                                        </Field>
                                        <Field orientation='horizontal'>
                                            <RadioGroupItem value='remote' id='remote' />
                                            <FieldLabel htmlFor='remote' className='font-normal cursor-pointer'>
                                                Remote
                                            </FieldLabel>
                                        </Field>
                                    </RadioGroup>
                                </FieldSet>
                            )}
                        />

                        <Controller
                            name='currently_working'
                            control={form.control}
                            render={({ field }) => (
                                <Field orientation='horizontal'>
                                    <Checkbox
                                        id={field.name}
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                        onBlur={field.onBlur}
                                        ref={field.ref}
                                    />
                                    <Label htmlFor={field.name} className='cursor-pointer'>Currently working</Label>
                                </Field>
                            )}
                        />

                        <div className='flex gap-3'>
                            <Controller
                                name='start_date'
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor={field.name}>Start Date</FieldLabel>
                                        <InputGroup>
                                            <InputGroupInput
                                                id={field.name}
                                                value={formatDate(field.value)}
                                                onChange={(event) => {
                                                    const date = new Date(event.target.value)
                                                    if (isValidDate(date)) {
                                                        field.onChange(date)
                                                    }
                                                }}
                                                onKeyDown={(event) => {
                                                    if (event.key === 'ArrowDown') {
                                                        event.preventDefault()
                                                    }
                                                }}
                                            />
                                            <Popover modal={true}>
                                                <PopoverTrigger asChild>
                                                    <InputGroupButton
                                                        variant='ghost'
                                                        size='icon-xs'
                                                        aria-label='Select date'
                                                        className='mr-1'
                                                    >
                                                        <CalendarIcon />
                                                        <span className='sr-only'>Select date</span>
                                                    </InputGroupButton>
                                                </PopoverTrigger>
                                                <PopoverContent
                                                    className='w-auto overflow-hidden p-0'
                                                    align='end'
                                                    alignOffset={-8}
                                                    sideOffset={10}
                                                >
                                                    <Calendar
                                                        mode='single'
                                                        captionLayout='dropdown'
                                                        selected={field.value}
                                                        month={field.value}
                                                        onSelect={(date) => {
                                                            field.onChange(date);

                                                            const endDate = form.getValues('end_date')
                                                            if (endDate && date && date > endDate) {
                                                                form.setValue('end_date', date);
                                                            }
                                                        }}
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        </InputGroup>
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />

                            <Controller
                                name='end_date'
                                control={form.control}
                                render={({ field, fieldState }) => {
                                    const currentlyWorking = form.watch('currently_working');
                                    const startDate = form.watch('start_date');
                                    return (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor={field.name}>End Date</FieldLabel>
                                            <InputGroup>
                                                <InputGroupInput
                                                    id={field.name}
                                                    value={currentlyWorking ? 'Present' : formatDate(field.value)}
                                                    disabled={currentlyWorking}
                                                    onChange={(event) => {
                                                        const date = new Date(event.target.value)
                                                        if (isValidDate(date)) {
                                                            field.onChange(date)
                                                        }
                                                    }}
                                                    onKeyDown={(event) => {
                                                        if (event.key === 'ArrowDown') {
                                                            event.preventDefault()
                                                        }
                                                    }}
                                                />
                                                <Popover modal={true}>
                                                    <PopoverTrigger asChild>
                                                        <InputGroupButton
                                                            variant='ghost'
                                                            size='icon-xs'
                                                            aria-label='Select date'
                                                            className='mr-1'
                                                            disabled={currentlyWorking}
                                                        >
                                                            <CalendarIcon />
                                                            <span className='sr-only'>Select date</span>
                                                        </InputGroupButton>
                                                    </PopoverTrigger>
                                                    <PopoverContent
                                                        className='w-auto overflow-hidden p-0'
                                                        align='end'
                                                        alignOffset={-8}
                                                        sideOffset={10}
                                                    >
                                                        <Calendar
                                                            mode='single'
                                                            captionLayout='dropdown'
                                                            disabled={startDate ? {
                                                                before: startDate,
                                                            } : undefined}
                                                            selected={field.value}
                                                            month={field.value}
                                                            onSelect={(date) => {
                                                                field.onChange(date)
                                                            }}
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                            </InputGroup>
                                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                        </Field>
                                    );
                                }}
                            />
                            
                        </div>
                    </FieldGroup>
                </div>
                <DialogFooter className='pt-2'>
                    <DialogClose asChild>
                        <Button variant='outline'>Close</Button>
                    </DialogClose>
                    <Button type='submit'>Save</Button>
                </DialogFooter>
            </form>
        </Form>
    );
}