import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import { Providers } from '../../../context/Provider'
import Auth from '../../../context/Auth'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Nesquik',
	description: 'Netflix clone',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html className='bg-black scrollbar-hide scroll-smooth ' lang='en'>
			<body id='top' className={`${inter.className} `}>
				<Auth>
					<Providers>{children}</Providers>
				</Auth>
			</body>
		</html>
	)
}
