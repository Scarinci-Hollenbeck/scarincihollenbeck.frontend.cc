import { Lato, Poppins } from "next/font/google";

export const poppins = Poppins({
	weight: ['300', '400', '500', '600', '700', '900'],
	subsets: ['latin'],
	variable: '--font-poppins',
	preload: true,
	display: 'swap',
});

export const lato = Lato({
	weight: ['100', '300', '400', '700', '900'],
	subsets: ['latin'],
	variable: '--font-lato',
	preload: true,
	display: 'swap',
});