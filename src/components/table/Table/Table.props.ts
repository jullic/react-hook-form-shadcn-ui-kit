import { RowData, TableOptions } from '@tanstack/react-table';
import { ComponentProps } from 'react';

export interface ITableProps<TData extends RowData> extends ComponentProps<'div'> {
	tanstackOptions: TableOptions<TData>;

	bordered?: boolean;
	stickyHeader?: boolean;
	headerPosition?: 'start' | 'end' | 'center';
	//
	// splitHeaderTableAndBodyTable?: boolean;
	//
}
