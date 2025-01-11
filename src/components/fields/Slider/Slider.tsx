import { FC } from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';

import { ISliderProps } from './Slider.props';
import { cn } from '@/lib/utils';
import { FieldWrapper } from '@/components/helpers/FieldWrapper';

export const Slider: FC<ISliderProps> = ({ className, descriptionText, helperText, label, status, required, ...props }) => {
	const wrapperProps = { helperText, label, status, required };

	return (
		<FieldWrapper
			descriptionText={descriptionText ?? (props.value && props.max) ? `${props.value} / ${props.max}` : ''}
			{...wrapperProps}
		>
			<SliderPrimitive.Root className={cn('relative flex w-full touch-none select-none items-center', className)} {...props}>
				<SliderPrimitive.Track className='relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20'>
					<SliderPrimitive.Range className='absolute h-full bg-primary' />
				</SliderPrimitive.Track>
				<SliderPrimitive.Thumb className='block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50' />
			</SliderPrimitive.Root>
		</FieldWrapper>
	);
};
