import { Checkbox } from '@/components/fields/Checkbox';
import { IFormField } from '@/types/field';
import { MergeType } from '@/types/merge';
import { FieldValues } from 'react-hook-form';

type CheckboxProps = Omit<Parameters<typeof Checkbox>[0], 'form' | 'checked' | 'value' | 'onCheckedChange' | 'onChange'>;

export interface IFormCheckboxProps<TFieldValues extends FieldValues = FieldValues> extends MergeType<IFormField<TFieldValues> & CheckboxProps> {}
