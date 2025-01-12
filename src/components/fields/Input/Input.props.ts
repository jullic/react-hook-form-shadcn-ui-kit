import { IField } from '@/types/field';
import { MergeType } from '@/types/merge';
import { ComponentProps, ReactNode } from 'react';
import { IMaskInput } from 'react-imask';

type IMaskInputProps = Parameters<typeof IMaskInput>[0];

export interface IInputProps extends MergeType<ComponentProps<'input'> & IField> {
	unit?: string | ReactNode;
	additionalContent?: ReactNode;
	mask?: IMaskInputProps;
	inputOptions?: {
		type: 'int' | 'float';
		min?: number;
		max?: number;
		maxFixed?: number;
		onBlurParseToNumber?: boolean;
	};
}
