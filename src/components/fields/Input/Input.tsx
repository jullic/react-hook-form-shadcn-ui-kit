/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from 'react';

import { IInputProps } from './Input.props';
import { cn } from '@/lib/utils';
import { IMaskInput } from 'react-imask';
import { FieldWrapper } from '@/components/helpers/FieldWrapper';

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
			<span className='grid grid-cols-[minmax(1%,100%)_min-content]'>
				<span className='relative h-min'>
					<Component {...mask} {...(inputProps as any)} />
					{additionalContent}
				</span>
				{unit && (
					<span className={cn(inputProps.className, 'rounded-r-md rounded-l-none text-sm !leading-[1.5rem] border-l-0')}>
						{unit}
					</span>
				)}
			</span>
		</FieldWrapper>
	);
};
Input.displayName = 'Input';

export { Input };
