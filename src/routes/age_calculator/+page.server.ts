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

		if (!result.success) return fail(400,{ errors: result.error.formErrors.fieldErrors });
		return { success: true, age: { years: 24, months: 1, days: 5 } };
	}
} satisfies Actions;
