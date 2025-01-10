import { MergeType } from '@/types/merge';
import { Input } from '../Input';

type InputProps = Parameters<typeof Input>[0];
export interface ITimeInputProps extends MergeType<Omit<InputProps, 'mask'> & { mask?: Partial<InputProps['mask']> }> {}
