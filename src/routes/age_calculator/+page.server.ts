import type { Actions } from './$types';
import { schema_age_calculator } from '$lib/schemas';
import { fail } from '@sveltejs/kit';

export const actions = {
	default: async ({ request }) => {
		const d = await request.formData();
		const year = d.get('year');
		const day = d.get('day');
		const month = d.get('month');

		const date = {
			year: year && year.toString().length > 0 ? Number(year) : null,
			day: day && day.toString().length > 0 ? Number(day) : null,
			month: month && month.toString().length > 0 ? Number(month) : null
		};

		const result = schema_age_calculator.safeParse(date);

		if (!result.success)
			return fail(400, {
				errors: result.error.formErrors.fieldErrors,
				year,
				day,
				month
			});

		const birth = new Date(date.year as number, (date.month as number) - 1, date.day as number);
		const today = new Date();

		let years = today.getFullYear() - birth.getFullYear();
		let months = today.getMonth() - birth.getMonth();
		let days = today.getDate() - birth.getDate();

		if (months < 0 || (months === 0 && today.getDate() < birth.getDate())) {
			if (years !== 0) years--;
			months += 12;
		}

		if (days < 0) {
			months--;
			const prevMonthDays = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
			days += prevMonthDays;
		}

		return {
			success: true,
			year,
			day,
			month,
			age: {
				years,
				months,
				days
			}
		};
	}
} satisfies Actions;
