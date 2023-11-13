import { Licorice, Montserrat, Poppins, Rajdhani } from '@next/font/google';
import localFont from '@next/font/local'

export const montserrat = Montserrat({
	weight: ['300', '500', '600', '900'],
	subsets: ['latin'],
	variable: '--font-montserrat',
	preload: true,
})

export const poppins = Poppins({
	weight: ['300', '400', '500', '600', '900'],
	subsets: ['latin'],
	variable: '--font-poppins',
	preload: true,
});

export const rajdhani = Rajdhani({
	weight: ['400', '500', '700'],
	subsets: ['latin'],
	variable: '--font-rajdhani',
	preload: true,
});

export const licorice = Licorice({
	weight: ['400'],
	subsets: ['latin'],
	variable: '--font-licorice',
	preload: true,
});

export const carilo = localFont({
	src: [
		{
			path: './Carilo.ttf',
			weight: '400',
			style: 'normal',
		},],
		variable: '--font-carilo',
		preload: true,
});