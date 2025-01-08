import { ReactNode } from 'react';

export interface IField {
	label?: string;
	status?: 'error' | 'warning';
	required?: boolean;
	readonly?: boolean;
	loading?: boolean;
	helperText?: string | ReactNode;
	descriptionText?: string | ReactNode;
}
