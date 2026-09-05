import { Head, router } from "@inertiajs/react";
import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import type { Address } from "@/types";
import { Leaf, Plus } from "lucide-react";
import TooltipWrapper from "@/components/tooltip-wrapper";
import AddressCard from "@/components/address-card";
import { create as createAddress } from "@/routes/address";

export type Props = {
    addresses: {
        data: Address[];
    };
};

export default function Index({ addresses }: Props) {
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
                    <TooltipWrapper content={<p>Tambah alamat</p>}>
                        <Button
                            variant="outline"
                            onClick={() => router.get(createAddress())}
                        >
                            <Plus />
                            Tambah
                        </Button>
                    </TooltipWrapper>
                </div>

                {/* Daftar alamat */}
                {addresses.data.length > 0 ? (
                    <div className="flex flex-col space-y-4">
                        {addresses.data.map((address: Address, index) => {
                            return (
                                <AddressCard key={index} address={address} />
                            );
                        })}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-muted-background p-6 text-center">
                        <Leaf />
                        <p className="text-sm text-muted-foreground">
                            Anda belum menambahkan alamat.
                        </p>
                    </div>
                )}
            </div>
        </>
    );
}

Index.layout = {
    className: "md:max-w-3xl",
    contentClassName: "max-w-3xl",
};
