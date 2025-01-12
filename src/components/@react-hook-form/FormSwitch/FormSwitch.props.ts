import { Switch } from '@/components/fields/Switch';
import { IFormField } from '@/types/field';
import { MergeType } from '@/types/merge';
import { FieldValues } from 'react-hook-form';

type SwitchProps = Omit<Parameters<typeof Switch>[0], 'form' | 'ref' | 'onChange' | 'value'>;

export interface IFormSwitchProps<TFieldValues extends FieldValues = FieldValues> extends MergeType<IFormField<TFieldValues> & SwitchProps> {}
