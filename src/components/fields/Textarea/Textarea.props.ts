import { IField } from '@/types/field';
import { MergeType } from '@/types/merge';
import { ComponentProps } from 'react';

export interface ITextareaProps extends MergeType<ComponentProps<'textarea'> & IField> {}
