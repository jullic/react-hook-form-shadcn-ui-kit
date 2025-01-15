import { ITableProps } from './Table.props';
import { RowData } from '@tanstack/react-table';

export const Table = <TData extends RowData>({ ...props }: ITableProps<TData>) => {
	return <div {...props}></div>;
};
