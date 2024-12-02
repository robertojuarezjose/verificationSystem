
'use client';
import { receiving_links } from '@/utils/links';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

function Sidebar() {
    const pathname = usePathname();

    return (
        <aside>
            {receiving_links.map((link) => {
                const isActivePage = pathname === link.href;
                const variant = isActivePage ? 'default' : 'ghost';
                return (
                    <div key={link.href}>
                        <Button
                            asChild
                            className='w-full mb-2 capitalize font-normal justify-start'
                            variant={variant}

                        >
                            <Link  href={link.href}>
                                {link.label}
                            </Link>
                        </Button>
                    </div  >
                );
            })}
        </aside>
    );
}
export default Sidebar;