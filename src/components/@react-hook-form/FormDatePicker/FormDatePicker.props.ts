import { DatePicker } from '@/components/fields/DatePicker';
import { IFormField } from '@/types/field';
import { MergeType } from '@/types/merge';
import { FieldValues } from 'react-hook-form';

type DatePickerProps = Omit<Parameters<typeof DatePicker>[0], 'form' | 'ref' | 'onChange' | 'value'>;

export interface IFormDatePickerProps<TFieldValues extends FieldValues = FieldValues> extends MergeType<IFormField<TFieldValues> & DatePickerProps> {}
