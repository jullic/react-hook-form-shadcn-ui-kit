import { TabPaneProps } from 'antd/es/tabs';
import { FC, ReactNode } from 'react';

import { Button } from '@/shared/ui/Button';
import { Modal } from '@/shared/ui/Modal';

import { IIO_COMPONENT_NAME_CAMELProps } from './IO_COMPONENT_NAME_CAMEL.props';

export const IO_COMPONENT_NAME_CAMEL: FC<IIO_COMPONENT_NAME_CAMELProps> = ({ ...props }) => {
	return <Modal title={null} footer={null} height='large' width='large' {...props}></Modal>;
};
