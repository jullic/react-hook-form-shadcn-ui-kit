import { useEffect, useRef } from 'react';

export const useTableScroll = () => {
	const scrollType = useRef<'table' | 'horizontal' | 'vertical' | null>(null);
	const timeoutRef = useRef<number | null>(null);

	const verticalScrollRef = useRef<HTMLDivElement>(null);
	const horizontalScrollRef = useRef<HTMLDivElement>(null);
	const tableRef = useRef<HTMLDivElement>(null);

	const updateScrollbars = () => {
		setTimeout(() => {
			const header = tableRef.current?.querySelector('[data-table-component="header"]');
			const content = tableRef.current?.querySelector('[data-table-component="content"] div');
			const contentRect = content!.getBoundingClientRect();

			verticalScrollRef.current!.style.top = `${header?.clientHeight}px`;
			verticalScrollRef.current!.style.height = `${tableRef.current!.clientHeight - header!.clientHeight}px`;
			const scrollVerticalDiv = verticalScrollRef.current!.querySelector('div');
			scrollVerticalDiv!.style.height = `${contentRect.height}px`;

			const scrollHorizontalDiv = horizontalScrollRef.current!.querySelector('div');
			scrollHorizontalDiv!.style.width = `${contentRect.width}px`;
		});
	};

	// eventListeners
	useEffect(() => {
		updateScrollbars();

		const tableScrollHandler = () => {
			if (scrollType.current !== 'table' && scrollType.current !== null) {
				return;
			}
			scrollType.current = 'table';
			timeoutRef.current && clearTimeout(timeoutRef.current);
			timeoutRef.current = window.setTimeout(() => {
				scrollType.current = null;
			}, 100);
			verticalScrollRef!.current!.scrollTop = tableRef.current!.scrollTop;
			horizontalScrollRef!.current!.scrollLeft = tableRef.current!.scrollLeft;
		};
		const verticalScrollHandler = () => {
			if (scrollType.current !== 'vertical' && scrollType.current !== null) {
				return;
			}
			scrollType.current = 'vertical';
			timeoutRef.current && clearTimeout(timeoutRef.current);
			timeoutRef.current = window.setTimeout(() => {
				scrollType.current = null;
			}, 100);
			tableRef!.current!.scrollTop = verticalScrollRef.current!.scrollTop;
		};
		const horizontalScrollHandler = () => {
			if (scrollType.current !== 'horizontal' && scrollType.current !== null) {
				return;
			}
			scrollType.current = 'horizontal';
			timeoutRef.current && clearTimeout(timeoutRef.current);
			timeoutRef.current = window.setTimeout(() => {
				scrollType.current = null;
			}, 100);
			tableRef!.current!.scrollLeft = horizontalScrollRef.current!.scrollLeft;
		};
		const scrollEndHandler = () => {
			scrollType.current = null;
		};

		tableRef.current?.addEventListener('scroll', tableScrollHandler);
		tableRef.current?.addEventListener('scrollend', scrollEndHandler);

		verticalScrollRef.current?.addEventListener('scroll', verticalScrollHandler);
		verticalScrollRef.current?.addEventListener('scrollend', scrollEndHandler);

		horizontalScrollRef.current?.addEventListener('scroll', horizontalScrollHandler);
		horizontalScrollRef.current?.addEventListener('scrollend', scrollEndHandler);

		return () => {
			tableRef.current?.removeEventListener('scroll', tableScrollHandler);
			tableRef.current?.removeEventListener('scrollend', scrollEndHandler);

			verticalScrollRef.current?.removeEventListener('scroll', verticalScrollHandler);
			verticalScrollRef.current?.removeEventListener('scrollend', scrollEndHandler);

			horizontalScrollRef.current?.removeEventListener('scroll', horizontalScrollHandler);
			horizontalScrollRef.current?.removeEventListener('scrollend', scrollEndHandler);
		};
	}, []);

	return { verticalScrollRef, horizontalScrollRef, tableRef, updateScrollbars };
};
