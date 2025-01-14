import { IFormInputProps } from './FormInput.props';
import { FieldValues, useController } from 'react-hook-form';
import { Input } from '@/components/fields/Input';

export const FormInput = <TFieldValues extends FieldValues = FieldValues>({ ...props }: IFormInputProps<TFieldValues>) => {
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
		<Input
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
