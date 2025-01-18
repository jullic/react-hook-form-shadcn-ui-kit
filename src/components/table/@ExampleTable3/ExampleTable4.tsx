import { FC, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

import { IExampleTable2Props } from './ExampleTable2.props';
import { ColumnSizingInfoState, ColumnSizingState, createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import styles from './ExampleTable2.module.css';

import { cn } from '@/lib/utils';
import { Input } from '@/components/fields/Input';

type Item = {
	id: string;
	name: string;
	age: number;
};

const columnHelper = createColumnHelper<Item>();

const cols = [
	columnHelper.accessor('id', { header: 'Id' }),
	columnHelper.accessor('name', { header: 'Name' }),
	columnHelper.accessor('age', {
		header: 'Name',
		cell: () => (
			<div className="p-1">
				<Input />
			</div>
		),
	}),
];
const data = [
	{ id: '1', age: 1, name: 'Test 1 lorem ipsum dolor sit amet long long text check test' },
	{ id: '2', age: 1, name: 'Test 2' },
	{ id: '3', age: 1, name: 'Test 3' },
	{ id: '4', age: 1, name: 'Test 4' },
	{ id: '5', age: 1, name: 'Test 5' },
	{ id: '6', age: 1, name: 'Test 6' },
	{ id: '7', age: 1, name: 'Test 7' },
	{ id: '8', age: 1, name: 'Test 8' },
	{ id: '9', age: 1, name: 'Test 9' },
	{ id: '10', age: 1, name: 'Test 10' },
];

export const ExampleTable4: FC<IExampleTable2Props> = () => {
	const [_, forceUpdate] = useState({});
	const rootRef = useRef<HTMLDivElement>(null);
	const [defaultSize, setDefaultSize] = useState(0);
	const [columnSizing, setColumnSizing] = useState<ColumnSizingState>({});
	const [columnSizingInfo, setColumnSizingInfo] = useState<ColumnSizingInfoState>({} as ColumnSizingInfoState);
	const isLock = useRef(false);

	const headerRef = useRef<HTMLDivElement>(null);
	const bodyRef = useRef<HTMLDivElement>(null);
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

	useEffect(() => {
		const headerHelper = () => {
			if (isLock.current) {
				isLock.current = false;
				return;
			}
			isLock.current = true;
			if (headerRef.current && bodyRef.current) {
				bodyRef.current.scrollLeft = headerRef.current.scrollLeft; // Синхронизируем горизонтальный скролл
			}
		};
		const bodyHelper = () => {
			if (isLock.current) {
				isLock.current = false;
				return;
			}
			isLock.current = true;
			if (headerRef.current && bodyRef.current) {
				headerRef.current.scrollLeft = bodyRef.current.scrollLeft; // Синхронизируем горизонтальный скролл
			}
		};

		headerRef.current?.addEventListener('scroll', headerHelper);
		bodyRef.current?.addEventListener('scroll', bodyHelper);

		return () => {
			headerRef.current?.removeEventListener('scroll', headerHelper);
			bodyRef.current?.removeEventListener('scroll', bodyHelper);
		};
	}, []);

	const headerGroups = table.getHeaderGroups();
	const rowModel = table.getRowModel();

	return (
		<div ref={rootRef} className="w-full h-64 grid grid-rows-[min-content_minmax(1%,100%)] border overflow-x-auto">
			<div data-table-component="header" ref={headerRef} className={cn('max-w-full overflow-x-auto', styles.header)}>
				{headerGroups.map((row) => (
					<div style={{ width: table.getTotalSize() }} key={row.id} data-table-component="row" className="border-b min-w-full w-min flex">
						{row.headers.map((cell) => (
							<div style={{ width: cell.getSize() }} key={cell.id} data-table-component="header-cell" className={cn('', 'border-r')}>
								<div className="relative flex items-center h-full">
									<span className="block p-4 w-full">
										<span className="block text-ellipsis whitespace-nowrap text-nowrap w-full overflow-hidden">
											{cell.isPlaceholder ? null : flexRender(cell.column.columnDef.header, cell.getContext())}
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
						))}
					</div>
				))}
			</div>
			<div data-table-component="content" ref={bodyRef} className={cn('max-w-full overflow-x-auto ')}>
				{rowModel.rows.map((row, rowI, arr) => (
					<div
						style={{ width: table.getTotalSize() }}
						key={row.id}
						data-table-component="row"
						className={cn('min-w-full w-min flex', { ['border-b']: arr.length - 1 !== rowI })}
					>
						{row.getVisibleCells().map((cell) => {
							return (
								<div style={{ width: cell.column.getSize() }} key={cell.id} data-table-component="header-cell" className={cn('', 'border-r')}>
									<span className="block p-4">
										<span className="block text-ellipsis text-nowrap w-full overflow-hidden">{flexRender(cell.column.columnDef.cell, cell.getContext())}</span>
									</span>
								</div>
							);
						})}
					</div>
				))}
			</div>
		</div>
	);
};
