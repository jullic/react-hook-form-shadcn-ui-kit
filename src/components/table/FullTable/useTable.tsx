import {
	ColumnSizingState,
	ColumnSizingInfoState,
	useReactTable,
	RowData,
	getFilteredRowModel,
	ColumnFiltersState,
	getSortedRowModel,
	SortingState,
	PaginationTableState,
	Updater,
} from '@tanstack/react-table';
import { useState, useRef, useMemo, useLayoutEffect } from 'react';
import { TanstackOptions } from './FullTable.props';
import { useTableScroll } from './useTableScroll';

export const useTable = <TData extends RowData>(tanstackOptions: TanstackOptions<TData>) => {
	const { manualFiltering = true, manualPagination = true, manualSorting = true } = tanstackOptions;

	const rootRef = useRef<HTMLDivElement>(null);
	const [_, forceUpdate] = useState({});
	const { horizontalScrollRef, tableRef, updateScrollbars, verticalScrollRef } = useTableScroll();

	// TABLE PARAMS
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [sorting, setSorting] = useState<SortingState>([]);
	const [pagination, setPagination] = useState<PaginationTableState['pagination']>({ pageIndex: 1, pageSize: 25 });

	const [defaultSize, setDefaultSize] = useState(0);
	const [columnSizing, setColumnSizing] = useState<ColumnSizingState>({});
	const [columnSizingInfo, setColumnSizingInfo] = useState<ColumnSizingInfoState>({} as ColumnSizingInfoState);

	const columns = useMemo(() => {
		// TODO: сделать для остальных accessors
		return tanstackOptions.columns.map((col) => {
			return { ...col, size: col.size ?? defaultSize };
		});
	}, [defaultSize, tanstackOptions.columns]);

	const onColumnSizingChange = (value: Updater<ColumnSizingState>) => {
		setColumnSizing(value);
		updateScrollbars();
	};

	const table = useReactTable({
		columnResizeMode: 'onChange',
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel(),
		onColumnSizingInfoChange: setColumnSizingInfo,
		onColumnSizingChange,
		onSortingChange: setSorting,
		onPaginationChange: setPagination,
		...tanstackOptions,
		state: {
			columnSizing,
			columnSizingInfo,
			columnFilters,
			sorting,
			pagination,
			...tanstackOptions.state,
		},
		defaultColumn: {
			size: defaultSize,
			minSize: 150,
			...tanstackOptions.defaultColumn,
		},
		//
		manualFiltering,
		manualSorting,
		manualPagination,
		columns,
	});

	// setDefaultWidth
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
	}, [tanstackOptions.columns]);

	return { table, rootRef, tableRef, verticalScrollRef, horizontalScrollRef };
};
