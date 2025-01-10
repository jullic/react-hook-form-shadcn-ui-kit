import { IField } from '@/types/field';
import { MergeType } from '@/types/merge';
import { ComponentProps } from 'react';

export interface IFieldHelperTextProps extends MergeType<Pick<IField, 'helperText' | 'status'> & ComponentProps<'div'>> {}
