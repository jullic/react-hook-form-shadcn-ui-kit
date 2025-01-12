import { useState } from 'react';
import { escapeRegExp } from 'lodash';

import { ISelectProps, Option } from './Select.props';
import { Check, ChevronsUpDown, Loader, X } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { FieldWrapper } from '@/components/helpers/FieldWrapper';
import styles from './Select.module.css';

// TODO: add multi select infinity save label
export const Select = <T extends 'single' | 'multi'>(props: ISelectProps<T>) => {
	const {
		descriptionText,
		filter = (value, search, _, options) => {
			const option = options.find((option) => option.value == value);
			const regexp = escapeRegExp(search);

			return option?.displayCurrentValue?.match(new RegExp(regexp, 'gim')) || option?.label.match(new RegExp(regexp, 'gim'));
		},
		value,
		onChange,
		menu = {},
		type = 'single',

		helperText,
		label,
		loading,
		options = [],
		readonly,
		required,
		status,
		placeholder,
	} = props;
	const { noContent, searchPlaceholder } = menu;
	const fieldWrapperProps: Omit<Parameters<typeof FieldWrapper>[0], 'children'> = {
		descriptionText,
		helperText,
		label,
		loading,
		readonly,
		required,
		status,
	};
	const [open, setOpen] = useState(false);
	const [defaultValue, setDefaultValue] = useState<string | string[] | number | number[]>(type == 'multi' ? [] : '');
	const currentValue = value == undefined ? defaultValue : value == null ? '' : value;

	const displayValue =
		typeof (value ?? defaultValue) == 'string' || typeof (value ?? defaultValue) == 'number'
			? value ?? defaultValue
				? options.find((option) => option.value == currentValue)?.displayCurrentValue || options.find((option) => option.value == currentValue)?.label
				: placeholder
			: ((value ?? defaultValue ?? []) as string[]).map((option) => {
					const item = options.find((el) => el.value == option);
					return item;
			  });

	const setValue = (val: string, option: Option, options: Option[], currentVal: typeof currentValue) => {
		const getNewValues = (val: string, currentVal: typeof currentValue) => {
			if (Array.isArray(currentVal)) {
				if (currentVal.includes(val as never)) {
					return currentVal.filter((value) => value != val);
				} else {
					return [...currentVal, val] as string[];
				}
			} else {
				if (currentVal == val) {
					return null;
				} else {
					return val;
				}
			}
		};
		const newValue = getNewValues(val, currentVal);

		onChange?.(newValue as string, option, options);

		if (!onChange) {
			setDefaultValue((newValue as string) ?? '');
		}
	};

	const check = Array.isArray(currentValue) ? currentValue : [currentValue];

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<FieldWrapper {...fieldWrapperProps} classNames={{ description: cn({ ['cursor-not-allowed']: props.disabled }) }}>
				<PopoverTrigger asChild>
					<Button
						disabled={props.disabled}
						variant="outline"
						role="combobox"
						aria-expanded={open}
						className={cn(
							'justify-between',
							{ ['border-warning text-warning']: status == 'warning' },
							{ ['border-destructive text-destructive']: status == 'error' },
							{ ['cursor-not-allowed']: props.disabled },
							'overflow-hidden',
							{ ['min-h-9 h-min py-1']: Array.isArray(displayValue) }
						)}
					>
						<span
							className={cn(
								{ ['text-ellipsis overflow-hidden']: typeof displayValue == 'string' },
								{ ['flex gap-1 flex-1 flex-wrap overflow-hidden']: typeof displayValue == 'object' },
								{ ['cursor-not-allowed']: props.disabled }
							)}
						>
							{!Array.isArray(displayValue)
								? displayValue
								: displayValue.map((item) => (
										<span className="p-1 pl-2 bg-primary rounded-sm text-secondary text-xs flex gap-1 items-center text-ellipsis overflow-hidden">
											<span className="text-ellipsis overflow-hidden">{item?.displayCurrentValue ?? item?.label}</span>
											<span
												role="button"
												className="px-1 py-0.5 hover:bg-muted hover:text-secondary-foreground rounded-sm transition"
												onClick={(e) => {
													e.stopPropagation();
													e.preventDefault();
													item && setValue(item?.value + '', item!, options, currentValue);
												}}
											>
												<X className="text-lg !w-3 !h-3" />
											</span>
										</span>
								  ))}
						</span>
						<div className="flex items-center gap-2">
							<ChevronsUpDown className="opacity-50" />
							{loading && <Loader className="animate-spin" />}
						</div>
					</Button>
				</PopoverTrigger>
			</FieldWrapper>
			<PopoverContent className={cn('p-0', styles.PopoverContent)}>
				<Command filter={(value, search, keywords) => (filter(value, search, keywords || [], options) ? 1 : 0)}>
					<CommandInput placeholder={searchPlaceholder} className="h-9" />
					<CommandList>
						<CommandEmpty>{noContent}</CommandEmpty>
						<CommandGroup className="relative">
							{options.map((option) => (
								<CommandItem
									key={option.value}
									value={option.value + ''}
									onSelect={(value) => {
										setValue(value, option, options, currentValue);
										setOpen(false);
									}}
								>
									{option.label}
									<Check className={cn('ml-auto', check.find((item) => item == option.value) ? 'opacity-100' : 'opacity-0')} />
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
};
