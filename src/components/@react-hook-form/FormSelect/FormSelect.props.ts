import { Select } from '@/components/fields/Select';
import { IFormField } from '@/types/field';
import { MergeType } from '@/types/merge';
import { FieldValues } from 'react-hook-form';

type SelectProps = Omit<Parameters<typeof Select>[0], 'form' | 'ref' | 'onChange' | 'value'>;

export interface IFormSelectProps<TFieldValues extends FieldValues = FieldValues> extends MergeType<IFormField<TFieldValues> & SelectProps> {}
