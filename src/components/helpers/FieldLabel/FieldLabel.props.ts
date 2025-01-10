import { IField } from '@/types/field';
import { Label } from '../Label';
import { MergeType } from '@/types/merge';

export interface IFieldLabelProps extends MergeType<Parameters<typeof Label>[0] & Pick<IField, 'status' | 'required'>> {
	label?: string;
}
