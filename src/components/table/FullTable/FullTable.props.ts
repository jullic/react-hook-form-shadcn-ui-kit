import { Cell, Header, HeaderGroup, Row, RowData, TableOptions } from '@tanstack/react-table';

export type TanstackOptions<TData extends RowData> = Omit<TableOptions<TData>, 'columns'> & {
	columns: (TableOptions<TData>['columns'][number] & {
		searchable?: boolean;
		editableCellType?: 'string' | 'boolean' | 'int' | 'float' | 'select' | 'date' | 'dateTime' | 'textarea';
	})[];
	// filterOnClient?: boolean;
};

export interface IFullTableProps<TData extends RowData> {
	tanstackOptions: TanstackOptions<TData>;
	bordered?: boolean;
	resizable?: boolean;
	headerCellPosition?: 'center' | 'end' | 'start';
	classNames?: {
		root?: string;
		table?: string;
		tableHeader?: string;
		tableHeaderRow?: ((row: HeaderGroup<TData>) => string) | string;
		tableHead?: ((row: Header<TData, unknown>) => string) | string;
		tableBody?: string;
		tableBodyRow?: ((row: Row<TData>) => string) | string;
		tableBodyCell?: ((row: Cell<TData, unknown>) => string) | string;
	};
}
