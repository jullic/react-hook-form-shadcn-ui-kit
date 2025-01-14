import { FieldValues, useController } from 'react-hook-form';
import { IFormSwitchProps } from './FormSwitch.props';
import { Switch } from '@/components/fields/Switch';

export const FormSwitch = <TFieldValues extends FieldValues = FieldValues>({ ...props }: IFormSwitchProps<TFieldValues>) => {
	const { name, rules, shouldUnregister, defaultValue, controlDisabled, form, ...otherProps } = props;
	const { control } = form;

	const {
		field: { value, ...fieldProps },
		fieldState: { error },
		formState: { disabled: disabledForm },
	} = useController({ control, name, rules, defaultValue, shouldUnregister, disabled: controlDisabled });

	const disabled = props.disabled || disabledForm;
	const errorMessage = error?.message;

	return (
		<Switch
			//
			status={error ? 'error' : undefined}
			helperText={errorMessage}
			{...otherProps}
			{...fieldProps}
			value={value === null ? '' : value}
			required={!!rules?.required || otherProps.required}
			disabled={disabled}
		/>
	);
};
