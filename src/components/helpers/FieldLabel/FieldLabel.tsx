import { FC } from 'react';

import { IFieldLabelProps } from './FieldLabel.props';
import { Label } from '../Label';
import { cn } from '@/lib/utils';

export const FieldLabel: FC<IFieldLabelProps> = ({ children, required, status, label, ...props }) => {
	return (
		<Label
			className={cn('grid gap-1 w-full', status === 'error' ? 'text-destructive' : status === 'warning' ? 'text-warning' : undefined)}
			{...props}
		>
			{label && (
				<p className='text-muted-foreground'>
					{label}
					{required ? '*' : ''}
				</p>
			)}
			{children}
		</Label>
	);
};
