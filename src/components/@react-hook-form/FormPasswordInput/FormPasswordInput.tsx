import { PasswordInput } from '@/components/fields/PasswordInput';
import { FieldValues, useController } from 'react-hook-form';
import { IFormPasswordInputProps } from './FormPasswordInput.props';

export const FormPasswordInput = <TFieldValues extends FieldValues = FieldValues>({ ...props }: IFormPasswordInputProps<TFieldValues>) => {
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
		<PasswordInput
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
