import { MergeType } from '@/types/merge';
import { Input } from '../Input';

export interface IPasswordInputProps extends MergeType<Omit<Parameters<typeof Input>[0], 'form'>> {}
