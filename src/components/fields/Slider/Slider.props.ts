import { ComponentProps } from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { MergeType } from '@/types/merge';
import { IField } from '@/types/field';

export interface ISliderProps extends MergeType<ComponentProps<typeof SliderPrimitive.Root> & IField> {
	displayValue?: boolean;
}
