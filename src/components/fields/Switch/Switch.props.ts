import { ComponentProps } from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';
import { MergeType } from '@/types/merge';
import { IField } from '@/types/field';

export interface ISwitchProps extends MergeType<ComponentProps<typeof SwitchPrimitives.Root> & IField> {}
