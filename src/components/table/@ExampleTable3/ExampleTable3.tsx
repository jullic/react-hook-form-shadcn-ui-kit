/* eslint-disable react-hooks/rules-of-hooks */
import { FC, useLayoutEffect, useMemo, useRef, useState } from 'react';

import { IExampleTable2Props } from './ExampleTable2.props';
import { ColumnSizingInfoState, ColumnSizingState, createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import styles from './ExampleTable2.module.css';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/shadcn-ui/table';
import { cn } from '@/lib/utils';

type Item = {
	id: string;
	name: string;
};

const columnHelper = createColumnHelper<Item>();

const cols = [columnHelper.accessor('id', { header: 'Id' }), columnHelper.accessor('name', { header: 'Name' })];
const data = [
	{ id: '1', name: 'Test 1' },
	{ id: '2', name: 'Test 2' },
	{ id: '3', name: 'Test 3' },
	{ id: '4', name: 'Test 4' },
	{ id: '5', name: 'Test 5' },
	{ id: '6', name: 'Test 6' },
	{ id: '7', name: 'Test 7' },
	{ id: '8', name: 'Test 8' },
	{ id: '9', name: 'Test 9' },
	{ id: '10', name: 'Test 10' },
];

export const ExampleTable3: FC<IExampleTable2Props> = () => {
	const [_, forceUpdate] = useState({});
	const rootRef = useRef<HTMLDivElement>(null);
	const [defaultSize, setDefaultSize] = useState(0);
	const [columnSizing, setColumnSizing] = useState<ColumnSizingState>({});
	const [columnSizingInfo, setColumnSizingInfo] = useState<ColumnSizingInfoState>({} as ColumnSizingInfoState);

	const colsWithSize = useMemo(() => cols.map((col) => ({ ...col, size: col.size ?? defaultSize })), [defaultSize]);
	const table = useReactTable({
		columns: colsWithSize,
		state: {
			columnSizing,
			columnSizingInfo,
		},
		data,
		defaultColumn: {
			size: defaultSize,
			minSize: 150,
		},
		getCoreRowModel: getCoreRowModel(),
		columnResizeMode: 'onChange',
		onColumnSizingInfoChange: setColumnSizingInfo,
		onColumnSizingChange: (value) => {
			setColumnSizing(value);
		},
	});

	const headerGroups = table.getHeaderGroups();
	const headerRefs = headerGroups.map((row) => useRef<HTMLTableRowElement>(null));
	const rowModel = table.getRowModel();
	const bodyRowsRefs = rowModel.rows.map((row) => useRef<HTMLTableRowElement>(null));

	useLayoutEffect(() => {
		if (!rootRef.current) {
			return;
		}
		const rootWidth = rootRef.current.offsetWidth;
		const colWidth = rootWidth / cols.length;
		setDefaultSize(colWidth);

		setTimeout(() => {
			forceUpdate({});
		});
	}, []);

	return (
		<div className={cn('relative w-full max-h-64 border rounded-lg grid grid-rows-[min-content_minmax(1%,100%)] overflow-auto', styles.test)}>
			<div className="w-full sticky top-0 bg-background z-10">
				{headerGroups.map((headerGroup, rowI) => (
					<div className="min-w-full w-min border-b">
						<div ref={headerRefs[rowI]} key={headerGroup.id} className="w-full flex" style={{ width: table.getTotalSize() }}>
							{headerGroup.headers.map((header, headerI, headers) => (
								<div style={{ width: header.getSize() }} className={cn('border-r relative p-2', {})} key={header.id}>
									<div className="flex items-center h-full">
										{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
										<div
											onMouseDown={header.getResizeHandler()}
											onTouchStart={header.getResizeHandler()}
											className={cn('absolute right-0 transform translatea-x-1/2 transition flex w-3 h-full hover:bg-primary cursor-ew-resize', {
												['bg-chart-2 hover:bg-chart-2']: header.column.getIsResizing(),
											})}
										></div>
									</div>
								</div>
							))}
						</div>
					</div>
				))}
			</div>
			<div ref={rootRef} className="relative">
				<div>
					{rowModel.rows?.map((row, rowI) => (
						<div className="min-w-full w-min border-b">
							<div ref={bodyRowsRefs[rowI]} className="w-full flex " key={row.id} style={{ width: table.getTotalSize() }}>
								{row.getVisibleCells().map((cell, cellI, visibleCells) => (
									<div style={{ width: cell.column.getSize() }} className={cn('border-r p-2', {})} key={cell.id}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</div>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
