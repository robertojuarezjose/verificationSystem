'use client'

import React from 'react';
import Link from 'next/link';
import { links} from '@/utils/links';
import { usePathname } from 'next/navigation';

function NavLinks() {

    const pathname = usePathname();



    return (
        <div className='flex gap-4 py-2'>

            {links.map((link) => {


                const linkPathname = link.href;

                return (
                         <Link key={link.href} href={link.href} className={(pathname === linkPathname || pathname.split('/')[1]== linkPathname.split('/')[1] )?
                             "capitalize w-full font-medium underline": "capitalize w-full" } >{link.label}</Link>

                )
            })}

        </div>
    );
}

export default NavLinks;