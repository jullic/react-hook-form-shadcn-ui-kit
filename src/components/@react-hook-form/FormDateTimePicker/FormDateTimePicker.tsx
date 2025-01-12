import { DateTimePicker } from '@/components/fields/DateTimePicker';
import { IFormDateTimePickerProps } from './FormDateTimePicker.props';
import { FieldValues, useController } from 'react-hook-form';
import { DateConverter } from '@/lib/date-converter';

export const FormDateTimePicker = <TFieldValues extends FieldValues = FieldValues>({ ...props }: IFormDateTimePickerProps<TFieldValues>) => {
	const { name, rules, shouldUnregister, defaultValue, controlDisabled, form, ...otherProps } = props;
	const { control } = form;

	const {
		field: { value, onChange, ref, ...fieldProps },
		fieldState: { error },
		formState: { disabled: disabledForm },
	} = useController({ control, name, rules, defaultValue, shouldUnregister, disabled: controlDisabled });

	const disabled = props.disabled || disabledForm;
	const errorMessage = error?.message;

	return (
		<DateTimePicker
			//
			status={error ? 'error' : undefined}
			helperText={errorMessage}
			{...otherProps}
			{...fieldProps}
			value={DateConverter.withTime.toDate(value)}
			onChange={(value) => onChange(DateConverter.withTime.toDate(value))}
			required={!!rules?.required || otherProps.required}
			disabled={disabled}
		/>
	);
};
