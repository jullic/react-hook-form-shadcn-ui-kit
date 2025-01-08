import { DEFAULT_FILTER_VALUES } from '@/shared/lib/constants/values';
import { useForm } from '@/shared/lib/hooks/useForm';
import { useFormContext } from '@/shared/lib/hooks/useFormContext';
import { Mutate } from '@/shared/types/@utils';

const { defaultPage, page_size } = DEFAULT_FILTER_VALUES;

export interface IFormIO_FORM_NAME_CAMEL
	extends Mutate<{
		filter: {
			page: number;
			page_size: number;
		};
	}> {}

export const getDefaultValuesFormIO_FORM_NAME_CAMEL = (): IFormIO_FORM_NAME_CAMEL => ({
	filter: { page: defaultPage, page_size },
});

export const useFormIO_FORM_NAME_CAMEL = () => {
	return useForm<IFormIO_FORM_NAME_CAMEL>({ defaultValues: getDefaultValuesFormIO_FORM_NAME_CAMEL() });
};

export const useFormContextIO_FORM_NAME_CAMEL = () => {
	return useFormContext<IFormIO_FORM_NAME_CAMEL>();
};
