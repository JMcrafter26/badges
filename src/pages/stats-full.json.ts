import type { APIRoute } from 'astro';
import { assets, badges, format, size } from '../utils/badges';
import { categories } from '../utils/categories';

// Full stats endpoint with detailed information
export const GET: APIRoute = () => {
	// Count badges by category
	const badgesByCategory: Record<string, number> = {};
	
	assets.forEach((asset) => {
		const [category] = asset.split('/');
		if (category) {
			badgesByCategory[category] = (badgesByCategory[category] || 0) + 1;
		}
	});

	// Calculate total variants (all sizes and formats)
	const totalVariants = badges.length;
	
	// Full stats object
	const stats = {
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
