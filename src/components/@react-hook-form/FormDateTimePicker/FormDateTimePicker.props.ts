import { DateTimePicker } from '@/components/fields/DateTimePicker';
import { IFormField } from '@/types/field';
import { MergeType } from '@/types/merge';
import { FieldValues } from 'react-hook-form';

type DateTimePickerProps = Omit<Parameters<typeof DateTimePicker>[0], 'form' | 'ref' | 'onChange' | 'value'>;

export interface IFormDateTimePickerProps<TFieldValues extends FieldValues = FieldValues> extends MergeType<IFormField<TFieldValues> & DateTimePickerProps> {}
