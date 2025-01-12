import { Input } from '@/components/fields/Input';
import { IFormField } from '@/types/field';
import { MergeType } from '@/types/merge';
import { FieldValues } from 'react-hook-form';

type InputProps = Omit<Parameters<typeof Input>[0], 'form' | 'ref' | 'onChange' | 'value'>;

export interface IFormInputProps<TFieldValues extends FieldValues = FieldValues> extends MergeType<IFormField<TFieldValues> & InputProps> {}
