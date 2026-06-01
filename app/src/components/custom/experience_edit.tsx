import { CalendarIcon, Settings } from 'lucide-react';
import { Button } from '@/app/src/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/app/src/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/app/src/components/ui/tooltip';
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSet } from '@/app/src/components/ui/field';
import { Input } from '@/app/src/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/app/src/components/ui/radio-group';
import { InputGroup, InputGroupButton, InputGroupInput } from '@/app/src/components/ui/input-group';
import { Popover, PopoverContent, PopoverTrigger } from '@/app/src/components/ui/popover';
import { Calendar } from '@/app/src/components/ui/calendar';
import { Experience } from '@/app/src/types/experience/experience';
import { useState } from 'react';

function formatDate(date: Date | undefined) {
    if (!date) {
        return ''
    }
    return date.toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    })
}
function isValidDate(date: Date | undefined) {
    if (!date) {
        return false
    }
    return !isNaN(date.getTime())
}

export default function ExperienceEditComponent({ experience }: { experience: Experience }) {
    const [openStart, setOpenStart] = useState(false);
    const [openEnd, setOpenEnd] = useState(false);

    const [dateStart, setDateStart] = useState<Date | undefined>(
        new Date('2025-06-01')
    );
    const [dateEnd, setDateEnd] = useState<Date | undefined>(
        new Date('2025-06-01')
    );

    const [monthStart, setMonthStart] = useState<Date | undefined>(dateStart);
    const [monthEnd, setMonthEnd] = useState<Date | undefined>(dateEnd);
    
    const [valueStart, setValueStart] = useState(formatDate(dateStart));
    const [valueEnd, setValueEnd] = useState(formatDate(dateEnd));

    return (
        <div className='flex justify-between'>
            <span>{experience.company_name}</span>
            <Dialog>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <DialogTrigger asChild>
                            <Button
                                variant='outline'
                                size='sm'
                            >
                                <Settings />
                            </Button>
                        </DialogTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Edit data</p>
                    </TooltipContent>
                </Tooltip>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{experience.company_name}</DialogTitle>
                        <DialogDescription>Edit data</DialogDescription>
                    </DialogHeader>
                    <div className='-mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4'>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor='company_name'>Company name</FieldLabel>
                                <Input
                                    id='company_name'
                                    placeholder='Company d.o.o.'
                                    defaultValue={experience.company_name}
                                />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor='city'>City</FieldLabel>
                                <Input
                                    id='city'
                                    placeholder='City'
                                    defaultValue={experience.location}
                                />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor='country'>Country</FieldLabel>
                                <Input
                                    id='country'
                                    placeholder='Country'
                                    defaultValue={experience.location}
                                />
                            </Field>
                            
                            <FieldSet className='w-full max-w-xs'>
                                <FieldLegend variant='label'>Work model</FieldLegend>
                                <FieldDescription>
                                    Select work model
                                </FieldDescription>
                                <RadioGroup defaultValue='monthly'>
                                    <Field orientation='horizontal'>
                                        <RadioGroupItem value='monthly' id='in-office' />
                                        <FieldLabel htmlFor='in-office' className='font-normal'>
                                            In office
                                        </FieldLabel>
                                    </Field>
                                    <Field orientation='horizontal'>
                                        <RadioGroupItem value='yearly' id='hybrid' />
                                        <FieldLabel htmlFor='hybrid' className='font-normal'>
                                            Hybrid
                                        </FieldLabel>
                                    </Field>
                                    <Field orientation='horizontal'>
                                        <RadioGroupItem value='lifetime' id='remote' />
                                        <FieldLabel htmlFor='remote' className='font-normal'>
                                            Remote
                                        </FieldLabel>
                                    </Field>
                                </RadioGroup>
                            </FieldSet>

                            <div className='flex gap-3'>
                                <Field>
                                    <FieldLabel htmlFor='date-required'>Subscription Date</FieldLabel>
                                    <InputGroup>
                                        <InputGroupInput
                                            id='date-required'
                                            value={valueStart}
                                            placeholder='June 01, 2025'
                                            onChange={(e) => {
                                                const date = new Date(e.target.value)
                                                setValueStart(e.target.value)
                                                if (isValidDate(date)) {
                                                    setDateStart(date)
                                                    setMonthStart(date)
                                                }
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === 'ArrowDown') {
                                                    e.preventDefault()
                                                    setOpenStart(true)
                                                }
                                            }}
                                        />
                                        
                                            <Popover open={openStart} onOpenChange={setOpenStart} modal={true}>
                                                <PopoverTrigger asChild>
                                                    <InputGroupButton
                                                        id='date-picker'
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
                                                        selected={dateStart}
                                                        month={monthStart}
                                                        onMonthChange={setMonthStart}
                                                        onSelect={(date) => {
                                                            setDateStart(date)
                                                            setValueStart(formatDate(date))
                                                            setOpenStart(false)
                                                        }}
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                    
                                    </InputGroup>
                                </Field>

                                <Field>
                                    <FieldLabel htmlFor='date-required'>Subscription Date</FieldLabel>
                                    <InputGroup>
                                        <InputGroupInput
                                            id='date-required'
                                            value={valueEnd}
                                            placeholder='June 01, 2025'
                                            onChange={(e) => {
                                                const date = new Date(e.target.value)
                                                setValueEnd(e.target.value)
                                                if (isValidDate(date)) {
                                                    setDateEnd(date)
                                                    setMonthEnd(date)
                                                }
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === 'ArrowDown') {
                                                    e.preventDefault()
                                                    setOpenEnd(true)
                                                }
                                            }}
                                        />
                                        
                                            <Popover open={openEnd} onOpenChange={setOpenEnd} modal={true}>
                                                <PopoverTrigger asChild>
                                                    <InputGroupButton
                                                        id='date-picker'
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
                                                        selected={dateEnd}
                                                        month={monthEnd}
                                                        onMonthChange={setMonthEnd}
                                                        onSelect={(date) => {
                                                            setDateEnd(date)
                                                            setValueEnd(formatDate(date))
                                                            setOpenEnd(false)
                                                        }}
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                    
                                    </InputGroup>
                                </Field>
                            </div>
                        </FieldGroup>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant='outline'>Close</Button>
                        </DialogClose>
                        <Button variant='outline'>Save</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}