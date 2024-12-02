import { Separator } from '@/components/ui/separator';
import Sidebar from './Sidebar';
import {Suspense} from "react";

function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <h2 className='text-2xl pl-4'>Dashboard</h2>
            <Separator className='mt-2' />
            <section className='grid lg:grid-cols-12 gap-12 mt-12'>
                <div className='lg:col-span-2'>
                    <Sidebar />
                </div>
                <Suspense fallback={<div>Loading...</div>}>
                    <div className='lg:col-span-10 px-4'>{children}</div>
                </Suspense>

            </section>
        </>
    );
}
export default DashboardLayout;