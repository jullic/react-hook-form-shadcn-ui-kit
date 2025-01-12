/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, ChangeEventHandler, FC } from 'react';

import { IInputProps } from './Input.props';
import { cn } from '@/lib/utils';
import { IMaskInput } from 'react-imask';
import { FieldWrapper } from '@/components/helpers/FieldWrapper';

type InputType = 'int' | 'float';

interface OnChangeHandlerProps {
	type: InputType;
	onChange?: ChangeEventHandler<HTMLInputElement>;
}

const onChangeHandler = ({ type, onChange }: OnChangeHandlerProps) => {
	return (e: ChangeEvent<HTMLInputElement>) => {
		if (!(e.target instanceof HTMLInputElement)) {
			return;
		}
		if (type === 'int') {
			e.target.value = e.target.value
				.replace(/[^0-9-]/gim, '')
				.replace(/(?!^)-/g, '')
				.trim();
			if ((e.target.value.length === 2 && e.target.value[0] === '0') || (e.target.value.length === 2 && e.target.value.startsWith('-0'))) {
				return;
			}
		} else {
			e.target.value = e.target.value
				.replace(/,/gim, '.')
				.replace(/[^0-9.-]/gim, '')
				.replace(/(?!^)-/g, '')
				.trim();
			const currentValue = e.target.value;
			const [first, ...other] = e.target.value.split('.');
			const arrs = [first === '' && !currentValue ? '' : first === '' ? '.' : first];
			other.filter(Boolean).length && arrs.push(other.join(''));

			const newValue = arrs.join('.').replace(/\.\./gim, '.');
			e.target.value = newValue;
			if (currentValue.match('\\.') && !newValue.match('\\.')) {
				e.target.value = newValue + '.';
			}

			if (e.target.value.startsWith('.')) {
				e.target.value = '0.' + e.target.value.slice(1);
			}
			if (e.target.value.startsWith('-.')) {
				e.target.value = '-0.' + e.target.value.slice(2);
			}
			if (e.target.value.startsWith('-0') || e.target.value.startsWith('0')) {
				if (e.target.value.match(/^-?0\d/gim)) {
					return;
				}
			}
		}
		onChange?.(e);
	};
};

const Input: FC<IInputProps> = ({
	className,
	helperText,
	descriptionText,
	label,
	status,
	required,
	additionalContent,
	unit,
	mask,
	value,
	inputOptions,
	// type,
	onChange,
	...props
}) => {
	const wrapperProps = { descriptionText, helperText, label, status, required };
	const inputProps = {
		className: cn(
			'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
			{ ['border-warning text-warning']: status === 'warning' },
			{ ['border-destructive text-destructive']: status === 'error' },
			{ ['rounded-r-none']: !!unit },
			className
		),
		...props,
	};
	const Component = mask ? IMaskInput : 'input';

	return (
		<FieldWrapper {...wrapperProps}>
			<span className="grid grid-cols-[minmax(1%,100%)_min-content]">
				<span className="relative h-min">
					<Component
						{...mask}
						{...(inputProps as any)}
						value={value === null ? '' : value}
						onChange={(e: ChangeEvent<HTMLInputElement>) => {
							if (!inputOptions?.type) {
								return onChange?.(e);
							} else if (onChange) {
								return onChangeHandler({ ...inputOptions, onChange })(e);
							}
						}}
						// type={type ?? inputOptions ? 'number' : undefined}
						onBlur={
							!inputOptions
								? props.onBlur
								: (e) => {
										const currentValue = parseFloat(e.target.value);
										const copyE = { ...e, target: { value: e.target.value ? +e.target.value : null } };
										if (inputOptions.maxFixed && inputOptions.type === 'float' && copyE.target.value) {
											copyE.target.value = +copyE.target.value.toFixed(inputOptions.maxFixed);
										}
										if (typeof inputOptions?.min === 'number' && currentValue <= inputOptions?.min) {
											copyE.target.value = inputOptions?.min;
											onChange?.(copyE as unknown as typeof e);
										}
										if (typeof inputOptions?.max === 'number' && currentValue >= inputOptions?.max) {
											copyE.target.value = inputOptions?.max;
											onChange?.(copyE as unknown as typeof e);
										}
										if ((inputOptions.onBlurParseToNumber === undefined || inputOptions.onBlurParseToNumber) && typeof value === 'string') {
											onChange?.(copyE as unknown as typeof e);
										}
										props.onBlur?.(e);
								  }
						}
					/>
					{additionalContent}
				</span>
				{unit && <span className={cn(inputProps.className, 'rounded-r-md rounded-l-none text-sm !leading-[1.5rem] border-l-0')}>{unit}</span>}
			</span>
		</FieldWrapper>
	);
};
Input.displayName = 'Input';

export { Input };
