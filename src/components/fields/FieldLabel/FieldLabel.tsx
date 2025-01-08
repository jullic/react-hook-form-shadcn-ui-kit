import { FC } from 'react';

import { IFieldLabelProps } from './FieldLabel.props';
import { Label } from '../Label';
import { cn } from '@/lib/utils';

export const FieldLabel: FC<IFieldLabelProps> = ({ children, required, status, label, ...props }) => {
	return (
		<Label
			className={cn('grid gap-1', status === 'error' ? 'text-destructive' : status === 'warning' ? 'text-warning' : undefined)}
			{...props}
		>
			{label && (
				<p>
					{label}
					{required ? '*' : ''}
				</p>
			)}
			{children}
		</Label>
	);
};
