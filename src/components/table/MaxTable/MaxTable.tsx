import { IMaxTableProps } from './MaxTable.props';
import { cn } from '@/lib/utils';
import { flexRender, Header, RowData, SortDirection } from '@tanstack/react-table';

import styles from './MaxTable.module.css';
import { useTable } from './useTable';
import { ArrowUpDown } from 'lucide-react';

const defaultClassNames = {
	root: cn('overflow-hidden relative'),
	table: cn('w-full grid grid-rows-[min-content_minmax(1%,100%)] border rounded-lg overflow-x-scroll overflow-y-scroll', styles['hidden-scroll']),
	tableHeader: cn('max-w-full sticky top-0 bg-background z-10'),
	tableHeaderRow: cn('border-b min-w-full w-min flex'),
	tableHead: cn('header-cell text-muted-foreground border-r'),
	tableBody: cn('max-w-full'),
	tableBodyRow: cn('min-w-full w-min flex'),
	tableBodyCell: cn('flex justify-center items-center border-r'),
};

const sortValue = {
	asc: <ArrowUpDown className={cn(styles.sort, styles.asc)} />,
	desc: <ArrowUpDown className={cn(styles.sort, styles.desc)} />,
	false: <ArrowUpDown />,
};
const getSortValue = (value: false | SortDirection) => {
	if (value === 'asc') {
		return sortValue.asc;
	}
	if (value === 'desc') {
		return sortValue.desc;
	}
	return sortValue.false;
};

const HeaderCellWrapper = <TData extends RowData>({ cell }: { cell: Header<TData, unknown> }) => {
	return (
		<div style={{ width: cell.getSize() }} key={cell.id} data-table-component={'header-cell'} className={cn(defaultClassNames.tableHead, classNames?.tableHead)}>
			<div className="relative flex items-center h-full">
				<span className="block p-4 w-full">
					<span className="block text-ellipsis whitespace-nowrap text-nowrap w-full overflow-hidden text-muted-foreground">
						{cell.isPlaceholder ? null : flexRender(cell.column.columnDef.header, cell.getContext())}
						<div className="h-10 w-4" onClick={cell.column.getToggleSortingHandler()}>
							{cell.column.getCanSort() && rowI == 0 && getSortValue(cell.column.getIsSorted())}
						</div>
					</span>
				</span>
				<div
					onMouseDown={cell.getResizeHandler()}
					onTouchStart={cell.getResizeHandler()}
					className={cn('absolute right-0 transition flex w-2 h-full hover:bg-primary cursor-ew-resize', {
						['bg-chart-2 hover:bg-chart-2']: cell.column.getIsResizing(),
					})}
				></div>
			</div>
		</div>
	);
};
const BodyCellWrapper = () => {};

export const MaxTable = <TData extends RowData>({ tanstackOptions, headerCellPosition, resizable, classNames, ...props }: IMaxTableProps<TData>) => {
	const { horizontalScrollRef, rootRef, table, tableRef, verticalScrollRef } = useTable(tanstackOptions);

	const headerGroups = table.getHeaderGroups();
	const rowModel = table.getRowModel();

	return (
		<div ref={rootRef} className={cn(defaultClassNames.root, classNames?.root)}>
			<div ref={tableRef} className={cn(defaultClassNames.table, classNames?.table)}>
				<div data-table-component="header" className={cn(defaultClassNames.tableHeader, classNames?.tableHeader)}>
					{headerGroups.map((row, rowI) => (
						<div
							style={{ width: table.getTotalSize() }}
							key={row.id}
							data-table-component="row"
							className={cn(defaultClassNames.tableHeaderRow, classNames?.tableHeaderRow)}
						>
							{row.headers.map((headerCell, i, arr) => (
								<div
									style={{ width: headerCell.getSize() }}
									key={headerCell.id}
									data-table-component={'header-cell'}
									className={cn(defaultClassNames.tableHead, classNames?.tableHead)}
								>
									<div className="relative flex items-center h-full">
										<span className="block p-4 w-full">
											<span className="block text-ellipsis whitespace-nowrap text-nowrap w-full overflow-hidden text-muted-foreground">
												{headerCell.isPlaceholder ? null : flexRender(headerCell.column.columnDef.header, headerCell.getContext())}
												{headerCell.column.getCanSort() && rowI == headerGroups.length - 1 && (
													<div className="h-10 w-4" onClick={headerCell.column.getToggleSortingHandler()}>
														{getSortValue(headerCell.column.getIsSorted())}
													</div>
												)}
											</span>
										</span>
										<div
											onMouseDown={headerCell.getResizeHandler()}
											onTouchStart={headerCell.getResizeHandler()}
											className={cn('absolute right-0 transition flex w-2 h-full hover:bg-primary cursor-ew-resize', {
												['bg-chart-2 hover:bg-chart-2']: headerCell.column.getIsResizing(),
											})}
										></div>
									</div>
								</div>
							))}
						</div>
					))}
				</div>
				<div data-table-component="content" className={cn(defaultClassNames.tableBody, classNames?.tableBody)}>
					<div>
						{rowModel.rows.map((row, rowI, arr) => (
							<div
								style={{ width: table.getTotalSize() }}
								key={row.id}
								data-table-component="row"
								className={cn(defaultClassNames.tableBodyRow, classNames?.tableBodyRow, { ['border-b']: arr.length - 1 !== rowI })}
							>
								{row.getVisibleCells().map((cell) => {
									return (
										<div
											style={{ width: cell.column.getSize() }}
											key={cell.id}
											data-table-component="body-cell"
											className={cn(defaultClassNames.tableBodyCell, classNames?.tableBodyCell)}
										>
											<span className="block p-4 w-full">
												<span className="block text-ellipsis text-nowrap w-full overflow-hidden">
													{flexRender(cell.column.columnDef.cell, cell.getContext())}
												</span>
											</span>
										</div>
									);
								})}
							</div>
						))}
					</div>
				</div>
			</div>
			<div ref={verticalScrollRef} data-scroll="vertical" className="absolute right-0 w-4 overflow-y-scroll overflow-x-hidden">
				<div></div>
			</div>
			<div ref={horizontalScrollRef} data-scroll="horizontal" className="absolute bottom-0 w-full h-4 overflow-y-hidden overflow-x-scroll">
				<div className="h-4"></div>
			</div>
		</div>
	);
};
