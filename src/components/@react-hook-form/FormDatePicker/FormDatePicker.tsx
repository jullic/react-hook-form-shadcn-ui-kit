import { DatePicker } from '@/components/fields/DatePicker';
import { IFormDatePickerProps } from './FormDatePicker.props';
import { FieldValues, useController } from 'react-hook-form';
import { DateConverter } from '@/lib/date-converter';

export const FormDatePicker = <TFieldValues extends FieldValues = FieldValues>({ ...props }: IFormDatePickerProps<TFieldValues>) => {
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
		<DatePicker
			//
			status={error ? 'error' : undefined}
			helperText={errorMessage}
			{...otherProps}
			{...fieldProps}
			value={DateConverter.withoutTime.toDate(value)}
			onChange={(value) => onChange(DateConverter.withoutTime.toServerStringFormat(value))}
			required={!!rules?.required || otherProps.required}
			disabled={disabled}
		/>
	);
};
