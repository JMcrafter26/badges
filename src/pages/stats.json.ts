import type { APIRoute } from 'astro';
import { assets, badges, format, size } from '../utils/badges';
import { categories } from '../utils/categories';

export const GET: APIRoute = () => {
	// Count badges by category
	const badgesByCategory: Record<string, number> = {};
	
	assets.forEach((asset) => {
		const [category] = asset.split('/');
		badgesByCategory[category] = (badgesByCategory[category] || 0) + 1;
	});

	// Calculate total variants (all sizes and formats)
	const totalVariants = badges.length;
	
	// Stats object
	const stats = {
		schemaVersion: 1,
		label: "badges",
		message: assets.length.toString(),
		color: "blue",
		totalBadges: assets.length,
		totalVariants: totalVariants,
		formats: format.length,
		sizes: size.length,
		categories: Object.keys(categories).length,
		byCategory: badgesByCategory,
		categoryDetails: Object.entries(categories).map(([key, description]) => ({
			id: key,
			name: key,
			description: description,
			count: badgesByCategory[key] || 0
		}))
	};

	return new Response(JSON.stringify(stats, null, 2), {
		status: 200,
		headers: {
			'Content-Type': 'application/json',
			'Cache-Control': 'public, max-age=3600'
		}
	});
};
