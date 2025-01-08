import { FC } from 'react';

import { IFieldHelperTextProps } from './FieldHelperText.props';
import { cn } from '@/lib/utils';

export const FieldHelperText: FC<IFieldHelperTextProps> = ({ helperText, status, children, ...props }) => {
	console.log(status);
	return (
		<div className='grid w-full gap-1' {...props}>
			{children}
			{helperText && (
				<div className='flex gap-1 items-center'>
					<span
						className={cn(
							{ ['bg-warning w-1 h-1 rounded-full']: status === 'warning' },
							{ ['bg-destructive w-1 h-1 rounded-full']: status === 'error' }
						)}
					></span>
					<p className={cn('text-xs', { ['text-warning']: status === 'warning' }, { ['text-destructive ']: status === 'error' })}>
						{helperText}
					</p>
				</div>
			)}
		</div>
	);
};
