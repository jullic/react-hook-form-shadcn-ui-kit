import { ComponentProps } from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { MergeType } from '@/types/merge';
import { IField } from '@/types/field';

export interface ICheckboxProps extends MergeType<ComponentProps<typeof CheckboxPrimitive.Root> & IField> {}
