/* eslint-disable @typescript-eslint/no-explicit-any */

import { ITableProps } from '@/shared/ui/Table';

export interface IDonorsTableProps<T extends unknown = unknown> extends Omit<ITableProps<T>, 'pagination' | 'columns' | 'dataSource'> {
	onChangePage: (page: number, pageSize: number) => void;
	onRowDoubleClick: (data: T, e: React.MouseEvent<any, MouseEvent>) => void;
	data?: T;
	pageSize?: number;
}
