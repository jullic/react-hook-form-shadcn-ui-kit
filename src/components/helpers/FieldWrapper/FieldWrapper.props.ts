import { IField } from '@/types/field';
import { MergeType } from '@/types/merge';
import { ReactNode } from 'react';

export interface IFieldWrapperProps extends MergeType<IField & { children: ReactNode }> {}
