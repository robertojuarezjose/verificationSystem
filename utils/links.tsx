

type NavLink = {
    href: string;
    label: string;
}

export const links: NavLink[] = [

    { href: '/', label: 'home' },
    { href: '/receiving', label: 'receiving' },
    { href: '/dispatch', label: 'dispatch' },
    { href: '/yard', label: 'yard' },
];

export const receiving_links: NavLink[] = [

    { href: '/receiving', label: 'receiving' },
    { href: '/receiving/qrGenerator', label: 'Qr Generator' },
    { href: '/receiving/qrCode', label: 'Display Qr Code' },

];

export const dispatch_links: NavLink[] = [

    { href: '/dispatch', label: 'dispatch' },
    { href: '/dispatch/qrCodeReader', label: 'Qr Reader' },
    { href: '/dispatch/qrCodeVerification', label: 'Qr verification' },

];

export const yard_links: NavLink[] = [

    { href: '/yard', label: 'Yard' },
    { href: '/yard/monitor', label: 'Yard Monitor' },

];