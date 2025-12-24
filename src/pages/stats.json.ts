import type { APIRoute } from 'astro';
import { assets } from '../utils/badges';

// Shields.io compatible endpoint - only includes valid Shields.io properties
export const GET: APIRoute = () => {
	const stats = {
		schemaVersion: 1,
		label: "badges",
		message: assets.length.toString(),
		color: "blue"
	};

	return new Response(JSON.stringify(stats, null, 2), {
		status: 200,
		headers: {
			'Content-Type': 'application/json',
			'Cache-Control': 'public, max-age=3600'
		}
	});
};
