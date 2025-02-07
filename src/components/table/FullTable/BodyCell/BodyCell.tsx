import { Cell, flexRender, RowData } from '@tanstack/react-table';

export const BodyCell = <TData extends RowData>({ cell, className }: { cell: Cell<TData, unknown>; className: string }) => {
	return (
		<div style={{ width: cell.column.getSize() }} data-table-component="body-cell" className={className}>
			<span className="block p-4 w-full">
				<span className="block text-ellipsis text-nowrap w-full overflow-hidden">{flexRender(cell.column.columnDef.cell, cell.getContext())}</span>
			</span>
		</div>
	);
};
