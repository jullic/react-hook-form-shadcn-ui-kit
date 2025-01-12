import { Textarea } from '@/components/fields';
import { IFormField } from '@/types/field';
import { MergeType } from '@/types/merge';
import { FieldValues } from 'react-hook-form';

type TextareaProps = Omit<Parameters<typeof Textarea>[0], 'form' | 'ref' | 'onChange' | 'value'>;

export interface IFormTextareaProps<TFieldValues extends FieldValues = FieldValues> extends MergeType<IFormField<TFieldValues> & TextareaProps> {}
