import { IField } from '@/types/field';
import { MergeType } from '@/types/merge';
import { ReactNode } from 'react';

export type Option = {
	value: string | number;
	label: string;
	displayCurrentValue?: string;
};

export interface ISelectProps<T extends 'single' | 'multi'> extends MergeType<IField> {
	type?: T;
	options?: Option[];
	value?: T extends 'single' ? string | number : string[] | number[];
	placeholder?: string;
	onChange?: (newValue: string | number | string[] | number[] | null, option: Option, options: Option[]) => void;
	filter?: (value: string | number, search: string, keywords: string[], options: Option[]) => boolean;

	menu?: {
		searchPlaceholder?: string;
		noContent?: ReactNode;
		// loadingContent?: ReactNode;
	};
}
