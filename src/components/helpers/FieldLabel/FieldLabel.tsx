import { FC } from 'react';

import { IFieldLabelProps } from './FieldLabel.props';
import { Label } from '../Label';
import { cn } from '@/lib/utils';

export const FieldLabel: FC<IFieldLabelProps> = ({ children, required, status, label, className, ...props }) => {
	return (
		<Label className={cn('grid gap-2 w-full', status === 'error' ? 'text-destructive' : status === 'warning' ? 'text-warning' : undefined, className)} {...props}>
			{label && (
				<p className={cn('text-muted-foreground text-start', status === 'error' ? 'text-destructive' : status === 'warning' ? 'text-warning' : undefined)}>
					{label}
					{required ? '*' : ''}
				</p>
			)}
			{children}
		</Label>
	);
};
