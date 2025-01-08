import { IField } from '@/types/field';
import { MergeType } from '@/types/merge';
import { ComponentProps } from 'react';

export interface IFieldDescriptionProps extends MergeType<ComponentProps<'div'> & Pick<IField, 'descriptionText'>> {}
