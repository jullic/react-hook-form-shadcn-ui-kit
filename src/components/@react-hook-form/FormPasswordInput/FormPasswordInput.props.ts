import { PasswordInput } from '@/components/fields/PasswordInput';
import { IFormField } from '@/types/field';
import { MergeType } from '@/types/merge';
import { FieldValues } from 'react-hook-form';

type PasswordInputProps = Omit<Parameters<typeof PasswordInput>[0], 'form' | 'ref' | 'onChange' | 'value'>;

export interface IFormPasswordInputProps<TFieldValues extends FieldValues = FieldValues> extends MergeType<IFormField<TFieldValues> & PasswordInputProps> {}
