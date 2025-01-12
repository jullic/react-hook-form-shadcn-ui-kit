import { IFormCheckboxProps } from './FormCheckbox.props';
import { FieldValues, useController } from 'react-hook-form';
import { Checkbox } from '@/components/fields/Checkbox';

export const FormCheckbox = <TFieldValues extends FieldValues = FieldValues>({ ...props }: IFormCheckboxProps<TFieldValues>) => {
	const { name, rules, shouldUnregister, defaultValue, controlDisabled, form, ...otherProps } = props;
	const { control } = form;

	const {
		field: { value, ref, onChange, ...fieldProps },
		fieldState: { error },
		formState: { disabled: disabledForm },
	} = useController({ control, name, rules, defaultValue, shouldUnregister, disabled: controlDisabled });

	const disabled = props.disabled || disabledForm;
	const errorMessage = error?.message;

	return (
		<Checkbox
			//
			status={error ? 'error' : undefined}
			helperText={errorMessage}
			{...otherProps}
			{...fieldProps}
			onCheckedChange={onChange}
			checked={value === null ? false : value}
			required={!!rules?.required || otherProps.required}
			disabled={disabled}
		/>
	);
};
