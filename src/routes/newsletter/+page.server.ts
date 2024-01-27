import type { Actions } from './$types';
import * as z from 'zod'


export const actions = {
	default: async ({ request }) => {
		const d = await request.formData();
		const email = d.get('email');

		const result = z.string().email('Valid email required').safeParse(email);

		if (!result.success) return { success: false, error: result.error.format()._errors[0] };


		return {
      success: true,
      email
    };

	}
} satisfies Actions;


