import { getDaysInMonth, isAfter } from 'date-fns';
import * as z from 'zod';

const valid_error_message = (s: string) => `Must be a valid ${s}`;

const schema_age_calculator = z
	.object({
		day: z
			.number({
				required_error: 'This field is required',
				invalid_type_error: 'This field is required'
			})
			.int()
			.gte(1, valid_error_message('day'))
			.lte(31, valid_error_message('day')),
		month: z
			.number({
				required_error: 'This field is required',
				invalid_type_error: 'This field is required'
			})
			.int()
			.gte(1, valid_error_message('month'))
			.lte(12, valid_error_message('month')),
		year: z
			.number({
				required_error: 'This field is required',
				invalid_type_error: 'This field is required'
			})
			.int()
			.gte(1, valid_error_message('year'))
			.lte(new Date().getFullYear(),'must be in the past')
	})
	.superRefine((args, ctx) => {
		if (args.month && args.day && args.year) {
			const date = new Date(args.year, args.month, args.day);
			const days = getDaysInMonth(date);

			if ( args.day > days)
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: valid_error_message('day'),
					path: ['day']
				});

			if (isAfter(date, new Date()))
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'must be in the past',
					path: ['year'],
				});
		}
	});

export { schema_age_calculator };
