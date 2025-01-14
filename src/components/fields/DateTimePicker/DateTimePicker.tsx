/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FC, useEffect, useRef, useState } from 'react';

import { IDateTimePickerProps } from './DateTimePicker.props';
import { useOnClickOutside } from 'usehooks-ts';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/shadcn-ui/popover';
import { DateInput } from '../DateInput';
import { Button } from '@/components/shadcn-ui/button';
import { cn } from '@/lib/utils';
import { CalendarIcon, Clock, X } from 'lucide-react';
import { Calendar } from '@/components/shadcn-ui/calendar';
import { TimeInput } from '../TimeInput';

export const DateTimePicker: FC<IDateTimePickerProps> = ({
	calendarProps,
	timeInputProps,
	dateInputProps,
	onChange,
	value,
	disabled,
	label,
	helperText,
	descriptionText,
	...props
}) => {
	const [date, setDate] = useState<Date | undefined>(value ?? undefined);
	const [currentMonth, setCurrentMonth] = useState(date);
	const [open, setOpen] = useState(false);

	const rootRef = useRef<HTMLInputElement>(null);
	const dateInputRef = useRef<HTMLInputElement>(null);
	const timeInputRef = useRef<HTMLInputElement>(null);
	const dateProps = { label, helperText, descriptionText };

	useOnClickOutside(rootRef as React.RefObject<HTMLInputElement>, (e) => {
		if (!(e.target instanceof Element)) {
			return;
		}
		if (!e.target.closest('[data-radix-popper-content-wrapper]')) {
			setOpen(false);
		}
	});

	useEffect(() => {
		if (dateInputRef.current) {
			const [date_, time] = date ? date.toLocaleString('ru').split(', ') : ['', ''];
			// @ts-ignore
			dateInputRef.current.maskRef.value = date_;
			// @ts-ignore
			timeInputRef.current.maskRef.value = time;
		}
	}, [value]);

	return (
		<Popover open={open}>
			<PopoverTrigger disabled={disabled} className="w-full">
				<span className="w-full grid gap-1 items-end grid-cols-[minmax(1%,60%)_minmax(1%,40%)]" data-date-picker-input ref={rootRef}>
					<DateInput
						className="w-full"
						mask={{
							mask: Date,
							ref: dateInputRef,
							lazy: false,
							autofix: true,
							onComplete: (e) => {
								// @ts-ignore
								if (timeInputRef.current?.maskRef.value.match('_')) {
									return;
								}
								const [day, month, year] = e.split('.');
								// @ts-ignore
								const [hours, minutes] = timeInputRef.current?.maskRef.value.split(':') || '';
								const newDate = new Date(+year, +month - 1, +day, +hours, +minutes);
								setDate(newDate);
								onChange?.(newDate);
								setCurrentMonth(newDate);
							},
						}}
						onFocus={() => {
							setOpen(true);
						}}
						disabled={disabled}
						{...props}
						{...dateProps}
						{...(dateInputProps as any)}
						additionalContent={
							<span className="absolute right-0 bottom-0 flex items-center">
								{!disabled && (
									<Button
										disabled={disabled}
										asChild
										onClick={() => {
											setDate(undefined);
											onChange?.(null);
											if (dateInputRef.current) {
												// @ts-ignore
												dateInputRef.current.maskRef.value = '';
											}
										}}
										variant={'link'}
										className={cn('px-1 cursor-pointer', { ['hidden']: !date })}
									>
										<span>
											<X />
										</span>
									</Button>
								)}
								<span className="py-2 pr-2 h-9 flex items-center">
									<CalendarIcon className="h-4 w-4" />
								</span>
							</span>
						}
					/>
					<TimeInput
						disabled={disabled}
						mask={{
							ref: timeInputRef,
							onComplete: (e) => {
								// @ts-ignore
								if (dateInputRef.current?.maskRef.value?.match('_')) {
									return;
								}
								// @ts-ignore
								const [day, month, year] = dateInputRef.current?.maskRef.value.split('.') || '';
								const [hours, minutes] = e.split(':');
								const newDate = new Date(+year, +month - 1, +day, +hours, +minutes);
								setDate(newDate);
								onChange?.(newDate);
								setCurrentMonth(newDate);
								setOpen(false);
							},
						}}
						{...props}
						{...timeInputProps}
						additionalContent={
							<span className="absolute right-0 bottom-0 flex items-center">
								{!disabled && (
									<Button
										disabled={disabled}
										asChild
										onClick={() => {
											setDate(undefined);
											onChange?.(null);
											if (dateInputRef.current) {
												// @ts-ignore
												dateInputRef.current.maskRef.value = '';
											}
										}}
										variant={'link'}
										className={cn('px-1 cursor-pointer', { ['hidden']: !date })}
									>
										<span>
											<X />
										</span>
									</Button>
								)}
								<span className="py-2 pr-2 h-9 flex items-center">
									<Clock className="h-4 w-4" />
								</span>
							</span>
						}
					/>
				</span>
			</PopoverTrigger>
			<PopoverContent className="w-min p-0" align="start" onOpenAutoFocus={(e) => e.preventDefault()}>
				<Calendar
					disabled={disabled}
					mode="single"
					selected={date}
					month={currentMonth}
					onMonthChange={(e) => setCurrentMonth(e)}
					today={new Date()}
					onSelect={(date) => {
						setDate(date);
						// @ts-ignore
						if (!timeInputRef.current?.maskRef?.value?.match('_')) {
							const [day, month, year] = date ? date.toLocaleString('ru').split(', ')[0]! : [];
							// @ts-ignore
							const [hours, minutes] = timeInputRef.current?.maskRef?.value?.split?.(':') || [];
							onChange?.(date ? new Date(+year, +month - 1, +day, +hours, +minutes) : null);
						}
						setCurrentMonth(date);
						if (dateInputRef.current) {
							// @ts-ignore
							dateInputRef.current.maskRef.value = date ? date.toLocaleString('ru').split(', ')[0]! : '';
						}
					}}
					{...(calendarProps as any)}
				/>
			</PopoverContent>
		</Popover>
	);
};
