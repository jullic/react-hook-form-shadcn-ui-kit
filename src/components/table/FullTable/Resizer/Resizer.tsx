import { cn } from '@/lib/utils';
import { Header, RowData } from '@tanstack/react-table';

export const Resizer = <TData extends RowData>({ headerCell }: { headerCell: Header<TData, unknown> }) => {
	return (
		<div
			onMouseDown={headerCell.getResizeHandler()}
			onTouchStart={headerCell.getResizeHandler()}
			className={cn('absolute right-0 transition flex w-2 h-full hover:bg-primary cursor-ew-resize', {
				['bg-chart-2 hover:bg-chart-2']: headerCell.column.getIsResizing(),
			})}
		></div>
	);
};
