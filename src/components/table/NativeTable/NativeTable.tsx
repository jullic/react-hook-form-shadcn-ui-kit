/* eslint-disable react-hooks/rules-of-hooks */
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table as TableRoot } from '@/components/shadcn-ui/table';
import { cn } from '@/lib/utils';
import { useState, useRef, useMemo, useLayoutEffect } from 'react';
import { ITableProps } from './NativeTable.props';
import { flexRender, RowData, useReactTable } from '@tanstack/react-table';

export const NativeTable = <TData extends RowData>({
	tanstackOptions,
	bordered = true,
	resizable = true,
	stickyHeader,
	// headerCellPosition,
	classNames,
	...props
}: ITableProps<TData>) => {
	const [_, forceUpdate] = useState({});
	const rootRef = useRef<HTMLDivElement>(null);
	const [defaultSize, setDefaultSize] = useState(0);
	const colsWithSize = useMemo(() => tanstackOptions.columns.map((col) => ({ ...col, size: col.size ?? defaultSize })), [defaultSize, tanstackOptions.columns]);

	const table = useReactTable({ ...tanstackOptions, columns: colsWithSize });

	const headerGroups = table.getHeaderGroups();
	const headerRefs = headerGroups.map(() => useRef<HTMLTableRowElement>(null));
	const rowModel = table.getRowModel();
	const bodyRowsRefs = rowModel.rows.map(() => useRef<HTMLTableRowElement>(null));

	useLayoutEffect(() => {
		if (!rootRef.current) {
			return;
		}
		const rootWidth = rootRef.current.offsetWidth;
		const colWidth = rootWidth / tanstackOptions.columns.length;
		setDefaultSize(colWidth);

		setTimeout(() => {
			forceUpdate({});
		});
	}, []);

	return (
		<div ref={rootRef} className={cn('relative w-full rounded-lg overflow-auto grid grid-cols-[minmax(1%,100%)]', { ['border']: bordered }, classNames?.root)}>
			<TableRoot className={cn('relative  w-full overflow-auto z-10', { ['border-collapse']: bordered }, classNames?.table)} style={{ width: table.getTotalSize() }}>
				<TableHeader className={cn('w-full', classNames?.tableHeader)}>
					{headerGroups.map((headerGroup, rowI) => (
						<TableRow ref={headerRefs[rowI]} key={headerGroup.id} className={cn('relative', classNames?.tableRow)}>
							{headerGroup.headers.map((header, headerI, headers) => (
								<TableHead
									style={{ width: header.getSize() }}
									className={cn(
										'relative',
										{
											['sticky top-0 bg-background']: stickyHeader,
											['border']: bordered,
											['border-t-0']: rowI === 0,
											['border-l-0']: headerI === 0,
											// ['border-r-0']: headerI === headers.length - 1,
											// ['border-b-0']: rowI === rowModel.rows.length - 1,
										},
										classNames?.tableHead
									)}
									key={header.id}
								>
									<div className={cn('flex items-center h-full')}>
										{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
										{resizable && (
											<div
												onMouseDown={header.getResizeHandler()}
												onTouchStart={header.getResizeHandler()}
												className={cn('absolute right-0 transform translatea-x-1/2 transition flex w-3 h-full hover:bg-primary cursor-ew-resize', {
													['bg-chart-2 hover:bg-chart-2']: header.column.getIsResizing(),
												})}
											></div>
										)}
									</div>
								</TableHead>
							))}
						</TableRow>
					))}
				</TableHeader>
				<TableBody className={cn(classNames?.tableBody)}>
					{rowModel.rows?.map((row, rowI) => (
						<TableRow ref={bodyRowsRefs[rowI]} key={row.id} className={cn(classNames?.tableRow)}>
							{row.getVisibleCells().map((cell, cellI, visibleCells) => (
								<TableCell
									className={cn(
										{
											['border']: bordered,
											['border-l-0']: cellI === 0,
											// ['border-r-0']: cellI === visibleCells.length - 1,
											['border-b-0']: rowI === rowModel.rows.length - 1,
										},
										classNames?.tableCell
									)}
									key={cell.id}
								>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</TableRoot>

			<TableRoot className={cn('absolute w-full h-full z-0', { ['border-collapse']: bordered }, classNames?.table)}>
				<TableHeader className={cn(classNames?.tableHeader)}>
					{headerRefs.map((ref, i, arr) => {
						return (
							<TableRow key={Math.random()} style={{ height: ref.current?.offsetHeight }} className={cn('relative z-0', classNames?.tableRow)}>
								<TableHead
									className={cn(
										{
											['bg-background sticky top-0']: stickyHeader,
											['border']: bordered,
											['border-t-0']: i === 0,
											['border-l-0']: true,
											['border-r-0']: true,
											// ['border-b-0']: rowI === rowModel.rows.length - 1,
										},
										classNames?.tableHead
									)}
								></TableHead>
							</TableRow>
						);
					})}
				</TableHeader>
				<TableBody className={cn(classNames?.tableBody)}>
					{bodyRowsRefs.map((ref, i, arr) => {
						return (
							<TableRow key={Math.random()} style={{ height: ref.current?.offsetHeight }} className={cn('relative z-0', classNames?.tableRow)}>
								<TableCell
									className={cn(
										{
											['border']: bordered,
											['border-l-0']: true,
											['border-r-0']: true,
											['border-b-0']: i === arr.length - 1,
										},
										classNames?.tableCell
									)}
								></TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</TableRoot>
		</div>
	);
};
