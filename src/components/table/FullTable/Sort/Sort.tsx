import { cn } from '@/lib/utils';
import { Header, RowData, SortDirection } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import styles from './Sort.module.css';
import { Button } from '@/components/shadcn-ui/button';

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

export const Sort = <TData extends RowData>({ headerCell, canSort }: { headerCell: Header<TData, unknown>; canSort: boolean }) => {
	if (!canSort) {
		return null;
	}

	return (
		<>
			{headerCell.column.getCanSort() && (
				<Button className="mr-2 my-2" variant={'outline'} onClick={headerCell.column.getToggleSortingHandler()}>
					{getSortValue(headerCell.column.getIsSorted())}
				</Button>
			)}
		</>
	);
};
