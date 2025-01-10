import { FC } from 'react';

import { IFieldDescriptionProps } from './FieldDescription.props';

export const FieldDescription: FC<IFieldDescriptionProps> = ({ descriptionText, children, ...props }) => {
	return (
		<div className='grid w-full gap-1' {...props}>
			{children}
			{descriptionText && <p className='text-xs text-muted-foreground'>{descriptionText}</p>}
		</div>
	);
};
