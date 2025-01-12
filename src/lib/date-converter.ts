export const DateConverter = {
	withoutTime: {
		toServerStringFormat: (value: undefined | null | Date | string) => {
			if (value === null || value === undefined) {
				return null;
			}
			if (value instanceof Date) {
				return DateConverter.withoutTime.dateToServerString(value);
			}
			//
			if (value.match(/\d\d\.\d\d\.\d\d\d\d/)) {
				return DateConverter.withoutTime.ruStringToServerString(value);
			}
			if (value.match(/\d\d\d\d-\d\d-\d\d/)) {
				return value.match(/\d\d\d\d-\d\d-\d\d/)?.toString() || null;
			}
			return DateConverter.withoutTime.dateToServerString(new Date(value));
		},
		toLocaleStringFormat: (value: undefined | null | Date | string) => {
			if (value === null || value === undefined) {
				return null;
			}
			if (value instanceof Date) {
				return DateConverter.withoutTime.dateToLocaleString(value);
			}
			//
			if (value.match(/\d\d\.\d\d\.\d\d\d\d/)) {
				return value.match(/\d\d\.\d\d\.\d\d\d\d/)?.toString() || null;
			}
			if (value.match(/\d\d\d\d-\d\d-\d\d/)) {
				return DateConverter.withoutTime.serverStringToRuString(value);
			}
			return DateConverter.withoutTime.dateToLocaleString(new Date(value));
		},
		toDate: (value: undefined | null | Date | string) => {
			if (value === null || value === undefined) {
				return null;
			}
			if (value instanceof Date) {
				return value;
			}
			//
			if (value.match(/\d\d\.\d\d\.\d\d\d\d/)) {
				return new Date(DateConverter.withoutTime.ruStringToServerString(value));
			}
			if (value.match(/\d\d\d\d-\d\d-\d\d/)) {
				return new Date(value);
			}
			const date = new Date(value);
			return isNaN(date.getTime()) ? null : date;
		},
		dateToLocaleString: (value: Date) => (isNaN(value.getTime()) ? null : value.toLocaleString('ru').split(', ')[0]),
		dateToServerString: (value: Date) => (isNaN(value.getTime()) ? null : DateConverter.withoutTime.dateToLocaleString(value)?.split('.').reverse().join('-')),
		ruStringToServerString: (value: string) => value.split(', ')[0].split('.').reverse().join('-'),
		serverStringToRuString: (value: string) => value.split(', ')[0].split('-').reverse().join('.'),
	},
	withTime: {
		toDate: (value: undefined | null | Date | string) => {
			if (value === null || value === undefined) {
				return null;
			}
			const date = new Date(value);
			return isNaN(date.getTime()) ? null : date;
		},
	},
};
