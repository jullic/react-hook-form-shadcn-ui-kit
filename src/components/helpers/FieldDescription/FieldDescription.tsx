import { FC } from 'react';

import { IFieldDescriptionProps } from './FieldDescription.props';
import { cn } from '@/lib/utils';

export const FieldDescription: FC<IFieldDescriptionProps> = ({ descriptionText, children, className, ...props }) => {
	return (
		<div className={cn('grid w-full gap-1', className)} {...props}>
			{children}
			{descriptionText && <p className="text-xs text-muted-foreground text-start">{descriptionText}</p>}
		</div>
	);
};
