import { RowData, TableOptions } from '@tanstack/react-table';
import { ComponentProps } from 'react';

export interface ITableProps<TData extends RowData> extends ComponentProps<'div'> {
	tanstackOptions: TableOptions<TData>;

	bordered?: boolean;
	resizable?: boolean;
	// oneLineCell?: boolean;
	stickyHeader?: boolean;
	// headerCellPosition?: 'start' | 'end' | 'center';
	classNames?: {
		root?: string;
		table?: string;
		tableHeader?: string;
		tableRow?: string;
		tableHead?: string;
		tableBody?: string;
		tableCell?: string;
	};
}
