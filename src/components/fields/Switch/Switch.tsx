import { FC } from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';

import { ISwitchProps } from './Switch.props';
import { cn } from '@/lib/utils';
import { FieldHelperText } from '@/components/helpers/FieldHelperText';
import { FieldDescription } from '@/components/helpers/FieldDescription';
import { Label } from '@/components/helpers/Label';

export const Switch: FC<ISwitchProps> = ({ className, status, helperText, descriptionText, label, required, ...props }) => {
	return (
		<FieldHelperText status={status} helperText={helperText}>
			<FieldDescription descriptionText={descriptionText}>
				<Label className='flex gap-1 justify-between items-center cursor-pointer'>
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
					<SwitchPrimitives.Root
						className={cn(
							'peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input',
							className
						)}
						{...props}
					>
						<SwitchPrimitives.Thumb
							className={cn(
								'pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0'
							)}
						/>
					</SwitchPrimitives.Root>
				</Label>
			</FieldDescription>
		</FieldHelperText>
	);
};
