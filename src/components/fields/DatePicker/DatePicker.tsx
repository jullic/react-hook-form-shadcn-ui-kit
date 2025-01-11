/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useRef, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';

import { IDatePickerProps } from './DatePicker.props';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CalendarIcon, X } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { DateInput } from '../DateInput';

export const DatePicker: FC<IDatePickerProps> = ({ dateInputProps, calendarProps, value, onChange, disabled, ...props }) => {
	const [date, setDate] = useState<Date | undefined>(value ?? undefined);
	const [currentMonth, setCurrentMonth] = useState(date);
	const [open, setOpen] = useState(false);

	const rootRef = useRef<HTMLInputElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	useOnClickOutside(rootRef as React.RefObject<HTMLInputElement>, (e) => {
		if (!(e.target instanceof Element)) {
			return;
		}
		if (!e.target.closest('[data-radix-popper-content-wrapper]')) {
			setOpen(false);
		}
	});

	useEffect(() => {
		if (inputRef.current) {
			// @ts-ignore
			inputRef.current.maskRef.value = date ? date.toLocaleString('ru').split(', ')[0]! : '';
		}
	}, [value]);

	return (
		<Popover open={open}>
			<PopoverTrigger disabled={disabled} className='w-full'>
				<span className='relative w-full' data-date-picker-input ref={rootRef}>
					<DateInput
						disabled={disabled}
						mask={{
							mask: Date,
							ref: inputRef,
							lazy: false,
							autofix: true,
							onComplete: (e) => {
								const [day, month, year] = e.split('.');
								const newDate = new Date(+year, +month - 1, +day);
								setDate(newDate);
								onChange?.(newDate);
								setCurrentMonth(newDate);
							},
						}}
						onFocus={() => {
							setOpen(true);
						}}
						{...props}
						{...(dateInputProps as any)}
						additionalContent={
							<span className='absolute right-0 bottom-0 flex items-center'>
								{!disabled && (
									<Button
										asChild
										onClick={() => {
											setDate(undefined);
											onChange?.(null);
											if (inputRef.current) {
												// @ts-ignore
												inputRef.current.maskRef.value = '';
											}
										}}
										variant={'link'}
										className={cn('pr-2 cursor-pointer', { ['hidden']: !date })}
									>
										<span>
											<X />
										</span>
									</Button>
								)}
								<span className='py-2 pr-2 h-9 flex items-center'>
									<CalendarIcon className='h-4 w-4' />
								</span>
							</span>
						}
					/>
				</span>
			</PopoverTrigger>
			<PopoverContent className='w-min p-0' align='start' onOpenAutoFocus={(e) => e.preventDefault()}>
				<Calendar
					disabled={disabled}
					mode='single'
					selected={date}
					month={currentMonth}
					onMonthChange={(e) => setCurrentMonth(e)}
					today={new Date()}
					onSelect={(date) => {
						setDate(date);
						onChange?.(date ?? null);
						setCurrentMonth(date);
						if (inputRef.current) {
							// @ts-ignore
							inputRef.current.maskRef.value = date ? date.toLocaleString('ru').split(', ')[0]! : '';
						}
					}}
					{...(calendarProps as any)}
				/>
			</PopoverContent>
		</Popover>
	);
};
