import React from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {fetchYardTraffic} from "@/utils/actions";
import Link from "next/link";
import {IconButton} from "@/components/form/Buttons";
import { IoQrCode } from "react-icons/io5";

async function MonitorPage() {
    const yardTraffic = await fetchYardTraffic();


    function storeCorrectDate(date: Date) {
        const fixedDate =  new Date(
            Date.parse(date.toUTCString())
        )
        return fixedDate.toLocaleDateString() + " " + fixedDate.toLocaleTimeString();

    }

    return (
        <section>
            <Table>
                <TableCaption className='capitalize'>
                    Total traffic volume inside the yard: {yardTraffic.length}
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>QR</TableHead>
                        <TableHead>Truck License Plate Number</TableHead>
                        <TableHead>Cargo Box Number</TableHead>
                        <TableHead>Cargo Box License Plate</TableHead>
                        <TableHead>Date Arrived</TableHead>
                        <TableHead>Actions</TableHead>

                    </TableRow>
                </TableHeader>
                <TableBody>
                    {yardTraffic.map((item, index) => (

                        <TableRow key={index}>

                            <TableCell ><Link href={`/receiving/qrCode${item.qrUrl}`}><IoQrCode /></Link></TableCell>
                            <TableCell>{item.truckLicensePlate}</TableCell>
                            <TableCell>{item.cargoBoxNumber}</TableCell>
                            <TableCell>{item.cargoBoxLicensePlate}</TableCell>
                            <TableCell>{storeCorrectDate(item.createdAt)} </TableCell>
                            <TableCell>
                                <Link href={`/yard/update/${item.id}/edit`}>
                                    <IconButton actionType='edit'></IconButton>
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </section>
    );
}

export default MonitorPage;

