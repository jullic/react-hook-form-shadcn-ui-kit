import { ControllerProps, FieldValues, UseFormReturn } from 'react-hook-form';
import { ReactNode } from 'react';
import { MergeType } from './merge';

export interface IField {
	label?: string;
	disabled?: boolean;
	status?: 'error' | 'warning';
	required?: boolean;
	readonly?: boolean;
	loading?: boolean;
	helperText?: string | ReactNode;
	descriptionText?: string | ReactNode;
}

export interface IFormField<TFieldValues extends FieldValues = FieldValues> extends MergeType<Omit<ControllerProps<TFieldValues>, 'render' | 'control'>> {
	form: UseFormReturn<TFieldValues>;
	controlDisabled?: boolean;
}
