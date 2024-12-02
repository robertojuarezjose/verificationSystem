
import {Inter} from 'next/font/google'
import "./globals.css";
import Container from '@/components/global/Container';
import Navbar from "@/components/navbar/Navbar";
import Providers from "@/app/providers";


const inter = Inter({subsets: ['latin']})


export default function RootLayout({children,}: Readonly<{ children: React.ReactNode;
}>) {


  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>

      <Providers>
          <Navbar/>
          <Container className='py-20'>{children}</Container>
      </Providers>

      </body>
    </html>
  );
}
