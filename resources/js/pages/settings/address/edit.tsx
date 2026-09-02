import AddressForm, { AddressFormProps } from "@/components/form/address-form";
import Heading from "@/components/heading";
import { Head } from "@inertiajs/react";

export default function EditAddress({ provinces, address }: AddressFormProps) {
    return (
        <>
            <Head title="Ubah alamat" />

            <h1 className="sr-only">Ubah alamat</h1>

            <div className="space-y-6">
                <Heading
                    variant="small"
                    title="Alamat"
                    description="Ubah alamat Anda"
                />

                <AddressForm provinces={provinces} address={address} />
            </div>
        </>
    );
}

EditAddress.layout = {
    className: "md:max-w-3xl",
    contentClassName: "max-w-3xl",
};
