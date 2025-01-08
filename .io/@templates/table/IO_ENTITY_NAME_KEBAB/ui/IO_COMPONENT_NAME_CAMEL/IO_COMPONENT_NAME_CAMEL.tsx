import { ColumnsType } from 'antd/lib/table';
import { FC } from 'react';

import { DEFAULT_FILTER_VALUES } from '@/shared/lib/constants/values';
import { getUiDate } from '@/shared/lib/utils/get-ui-date';
import { Table } from '@/shared/ui/Table';

import { IIO_COMPONENT_NAME_CAMELProps } from './IO_COMPONENT_NAME_CAMEL.props';

const getColumns = (): ColumnsType<unknown> => {
	return [
		{ title: 'id', dataIndex: 'id' },
		{ title: 'id', dataIndex: 'id' },
	];
};

export const IO_COMPONENT_NAME_CAMEL: FC<IIO_COMPONENT_NAME_CAMELProps> = ({
	onRowDoubleClick,
	onChangePage,
	data,
	pageSize,
	...props
}) => {
	return (
		<>
			<Table
				pagination={{
					pageSize: pageSize || DEFAULT_FILTER_VALUES.page_size,
					countEntityMessage: 'Всего ...:',
					total: data?.total_results || 1,
					onChange: onChangePage,
				}}
				rowKey={'id'}
				dataSource={data?.results || []}
				columns={getColumns()}
				onRow={(data) => {
					return { onDoubleClick: (e) => onRowDoubleClick(data, e) };
				}}
				{...props}
			/>
		</>
	);
};
