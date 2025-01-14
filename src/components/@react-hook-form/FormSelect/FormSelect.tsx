import { FieldValues, useController } from 'react-hook-form';
import { Select } from '@/components/fields/Select';
import { IFormSelectProps } from './FormSelect.props';

export const FormSelect = <TFieldValues extends FieldValues = FieldValues>({ ...props }: IFormSelectProps<TFieldValues>) => {
	const { name, rules, shouldUnregister, defaultValue, controlDisabled, form, ...otherProps } = props;
	const { control } = form;

	const {
		field,
		fieldState: { error },
		formState: { disabled: disabledForm },
	} = useController({ control, name, rules, defaultValue, shouldUnregister, disabled: controlDisabled });

	const disabled = props.disabled || disabledForm;
	const errorMessage = error?.message;

	return (
		<Select
			//
			status={error ? 'error' : undefined}
			helperText={errorMessage}
			{...otherProps}
			{...field}
			required={!!rules?.required || otherProps.required}
			disabled={disabled}
		/>
	);
};
