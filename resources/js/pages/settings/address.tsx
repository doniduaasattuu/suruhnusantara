import { Head, usePage } from "@inertiajs/react";
import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import type { Auth } from "@/types";
import { Plus } from "lucide-react";
import TooltipWrapper from "@/components/tooltip-wrapper";
import AddressCard from "@/components/address-card";

type PageProps = {
    auth: Auth;
};

export default function Address() {
    const { auth } = usePage<PageProps>().props;

    return (
        <>
            <Head title="Pengaturan alamat" />

            <h1 className="sr-only">Pengaturan alamat</h1>

            <div className="space-y-6">
                <div className="flex justify-between gap-2">
                    <Heading
                        variant="small"
                        title="Alamat"
                        description="Perbarui atau tambah alamat Anda"
                    />
                    {/* Button tambah alamat */}
                    <TooltipWrapper
                        content={<p>Tambah alamat</p>}
                        key={"tambah_alamat"}
                    >
                        <Button variant="outline">
                            <Plus />
                            Tambah
                        </Button>
                    </TooltipWrapper>
                </div>

                {/* Daftar alamat */}
                <div className="flex flex-col space-y-4">
                    <AddressCard
                        label="Rumah"
                        phone="+628983456945"
                        isPrimary={true}
                        name="Doni Darmawan"
                    />
                    <AddressCard
                        label="Kantor"
                        phone="+628983456945"
                        isPrimary={false}
                        name="Doni Darmawan"
                    />
                </div>
            </div>
        </>
    );
}
