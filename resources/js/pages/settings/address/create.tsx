import AddressForm, { AddressFormProps } from "@/components/form/address-form";
import Heading from "@/components/heading";
import { Head } from "@inertiajs/react";

export default function CreateAddress({ provinces }: AddressFormProps) {
    return (
        <>
            <Head title="Tambah alamat" />

            <h1 className="sr-only">Tambah alamat</h1>

            <div className="space-y-6">
                <Heading
                    variant="small"
                    title="Alamat"
                    description="Tambah alamat Anda"
                />

                <AddressForm provinces={provinces} />
            </div>
        </>
    );
}

CreateAddress.layout = {
    className: "md:max-w-3xl",
    contentClassName: "max-w-3xl",
};
