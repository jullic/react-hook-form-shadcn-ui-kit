import { FC } from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

import { ICheckboxProps } from './Checkbox.props';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import { FieldHelperText } from '@/components/helpers/FieldHelperText';
import { FieldDescription } from '@/components/helpers/FieldDescription';
import { Label } from '@/components/helpers/Label';

export const Checkbox: FC<ICheckboxProps> = ({ className, status, helperText, descriptionText, label, required, ...props }) => {
	return (
		<FieldHelperText status={status} helperText={helperText}>
			<FieldDescription descriptionText={descriptionText}>
				<Label className='flex gap-2 items-center cursor-pointer'>
					<CheckboxPrimitive.Root
						className={cn(
							'peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
							{ ['border-warning text-warning']: status === 'warning' },
							{ ['border-destructive text-destructive']: status === 'error' },
							className
						)}
						{...props}
					>
						<CheckboxPrimitive.Indicator className={cn('flex items-center justify-center text-current')}>
							<Check className='h-4 w-4' />
						</CheckboxPrimitive.Indicator>
					</CheckboxPrimitive.Root>
					<p
						className={cn(
							'text-primary',
							{ ['text-muted-foreground cursor-not-allowed']: props.disabled },
							{ ['border-warning text-warning']: status === 'warning' },
							{ ['border-destructive text-destructive']: status === 'error' }
						)}
					>
						{label}
						{required ? '*' : ''}
					</p>
				</Label>
			</FieldDescription>
		</FieldHelperText>
	);
};
