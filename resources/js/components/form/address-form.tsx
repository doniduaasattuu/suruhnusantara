import { Form } from "@inertiajs/react";
import { useEffect, useState } from "react";

import InputError from "@/components/input-error";
import RequiredLabel from "@/components/required-label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
    store as storeAddress,
    update as updateAddress,
} from "@/routes/address";

import type { Province, Regency, District, Village, Address } from "@/types";
import { Field, FieldError, FieldLabel } from "../ui/field";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import FieldWrapper from "../field-wrapper";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";

export type AddressFormProps = {
    provinces: {
        data: Province[];
    };
    address?: {
        data: Address;
    };
};

export default function AddressForm({ provinces, address }: AddressFormProps) {
    const [regencies, setRegencies] = useState<Regency[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [villages, setVillages] = useState<Village[]>([]);

    const [provinceCode, setProvinceCode] = useState(
        address?.data?.province_code ?? "",
    );
    const [regencyCode, setRegencyCode] = useState(
        address?.data?.regency_code ?? "",
    );
    const [districtCode, setDistrictCode] = useState(
        address?.data?.district_code ?? "",
    );
    const [villageCode, setVillageCode] = useState(
        address?.data?.village_code ?? "",
    );

    const [loading, setLoading] = useState({
        regencies: false,
        districts: false,
        villages: false,
    });

    const handleProvinceChange = (value: string) => {
        setProvinceCode(value);
        setRegencyCode("");
        setDistrictCode("");
        setVillageCode("");

        setRegencies([]);
        setDistricts([]);
        setVillages([]);
    };

    const handleRegencyChange = (value: string) => {
        setRegencyCode(value);
        setDistrictCode("");
        setVillageCode("");

        setDistricts([]);
        setVillages([]);
    };

    const handleDistrictChange = (value: string) => {
        setDistrictCode(value);
        setVillageCode("");

        setVillages([]);
    };

    /**
     * Kabupaten / Kota
     */
    useEffect(() => {
        if (!provinceCode) {
            setRegencies([]);
            return;
        }

        setLoading((prev) => ({
            ...prev,
            regencies: true,
        }));

        fetch(`/regions/${provinceCode}/regencies`)
            .then((response) => response.json())
            .then((data) => {
                setRegencies(data.data ?? []);
            })
            .finally(() => {
                setLoading((prev) => ({
                    ...prev,
                    regencies: false,
                }));
            });
    }, [provinceCode]);

    /**
     * Kecamatan
     */
    useEffect(() => {
        if (!regencyCode) {
            setDistricts([]);
            return;
        }

        setLoading((prev) => ({
            ...prev,
            districts: true,
        }));

        fetch(`/regions/${regencyCode}/districts`)
            .then((response) => response.json())
            .then((data) => {
                setDistricts(data.data ?? []);
            })
            .finally(() => {
                setLoading((prev) => ({
                    ...prev,
                    districts: false,
                }));
            });
    }, [regencyCode]);

    /**
     * Desa / Kelurahan
     */
    useEffect(() => {
        if (!districtCode) {
            setVillages([]);
            return;
        }

        setLoading((prev) => ({
            ...prev,
            villages: true,
        }));

        fetch(`/regions/${districtCode}/villages`)
            .then((response) => response.json())
            .then((data) => {
                setVillages(data.data ?? []);
            })
            .finally(() => {
                setLoading((prev) => ({
                    ...prev,
                    villages: false,
                }));
            });
    }, [districtCode]);

    /**
     * Kode pos otomatis mengikuti desa/kelurahan.
     */
    const selectedVillage = villages.find(
        (village) => village.code === villageCode,
    );

    const postalCode =
        selectedVillage?.postal_code ?? address?.data?.postal_code ?? "";

    const isEdit = Boolean(address);

    const form = isEdit
        ? updateAddress.form({
              address: address!.data.id,
          })
        : storeAddress.form();

    const [isPrimary, setIsPrimary] = useState(
        address?.data?.is_primary ?? false,
    );

    return (
        <Form
            {...form}
            options={{
                preserveScroll: true,
            }}
            className="space-y-6"
        >
            {({ processing, errors }) => (
                <>
                    <FieldWrapper className="sm:grid-cols-3">
                        {/* Label alamat */}
                        <Field>
                            <FieldLabel htmlFor="label">
                                Label alamat
                                <RequiredLabel />
                            </FieldLabel>

                            <Input
                                id="label"
                                name="label"
                                defaultValue={address?.data?.label}
                                placeholder="Contoh: Rumah"
                                required
                            />

                            <InputError message={errors.label} />
                        </Field>

                        {/* Nama penerima */}
                        <Field>
                            <FieldLabel htmlFor="recipient_name">
                                Nama penerima
                                <RequiredLabel />
                            </FieldLabel>

                            <Input
                                id="recipient_name"
                                name="recipient_name"
                                defaultValue={address?.data?.recipient_name}
                                placeholder="Nama lengkap penerima"
                                autoComplete="name"
                                required
                            />

                            <InputError message={errors.recipient_name} />
                        </Field>

                        {/* Nomor telepon */}
                        <Field>
                            <FieldLabel htmlFor="phone">
                                Nomor telepon
                                <RequiredLabel />
                            </FieldLabel>

                            <Input
                                id="phone"
                                name="phone"
                                type="tel"
                                defaultValue={address?.data?.phone}
                                placeholder="08xxxxxxxxxx"
                                autoComplete="tel"
                                required
                            />

                            <InputError message={errors.phone} />
                        </Field>
                    </FieldWrapper>

                    <FieldWrapper className="sm:grid-cols-2">
                        {/* Provinsi */}
                        <Field>
                            <FieldLabel htmlFor="province_code">
                                Provinsi
                                <RequiredLabel />
                            </FieldLabel>

                            <Select
                                name="province_code"
                                value={provinceCode}
                                onValueChange={handleProvinceChange}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Pilih provinsi" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Provinsi</SelectLabel>
                                        {provinces.data.map((item) => (
                                            <SelectItem
                                                key={item.code}
                                                value={item.code}
                                            >
                                                {item.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <FieldError>{errors.province_code}</FieldError>
                        </Field>

                        {/* Kabupaten / Kota */}
                        <Field>
                            <FieldLabel htmlFor="regency_code">
                                Kabupaten/Kota
                                <RequiredLabel />
                            </FieldLabel>

                            <Select
                                name="regency_code"
                                value={regencyCode}
                                onValueChange={handleRegencyChange}
                            >
                                <SelectTrigger
                                    className="w-full"
                                    disabled={
                                        !provinceCode || loading.regencies
                                    }
                                >
                                    <SelectValue
                                        placeholder={
                                            loading.regencies
                                                ? "Memuat..."
                                                : !provinceCode
                                                  ? "Pilih provinsi terlebih dahulu"
                                                  : "Pilih kabupaten/kota"
                                        }
                                    />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>
                                            Kabupaten/Kota
                                        </SelectLabel>

                                        {regencies.map((item) => (
                                            <SelectItem
                                                key={item.code}
                                                value={item.code}
                                            >
                                                {item.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <FieldError>{errors.regency_code}</FieldError>
                        </Field>
                    </FieldWrapper>

                    <FieldWrapper className="sm:grid-cols-2">
                        {/* Kecamatan */}
                        <Field>
                            <FieldLabel htmlFor="district_code">
                                Kecamatan
                                <RequiredLabel />
                            </FieldLabel>

                            <Select
                                name="district_code"
                                value={districtCode}
                                onValueChange={handleDistrictChange}
                            >
                                <SelectTrigger
                                    className="w-full"
                                    disabled={!regencyCode || loading.districts}
                                >
                                    <SelectValue
                                        placeholder={
                                            loading.districts
                                                ? "Memuat..."
                                                : !regencyCode
                                                  ? "Pilih kabupaten/kota terlebih dahulu"
                                                  : "Pilih kecamatan"
                                        }
                                    />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Kecamatan</SelectLabel>

                                        {districts.map((item) => (
                                            <SelectItem
                                                key={item.code}
                                                value={item.code}
                                            >
                                                {item.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <FieldError>{errors.district_code}</FieldError>
                        </Field>

                        {/* Desa / Kelurahan */}
                        <Field>
                            <FieldLabel htmlFor="village_code">
                                Desa/Kelurahan
                                <RequiredLabel />
                            </FieldLabel>

                            <Select
                                name="village_code"
                                value={villageCode}
                                onValueChange={setVillageCode}
                            >
                                <SelectTrigger
                                    className="w-full"
                                    disabled={!districtCode || loading.villages}
                                >
                                    <SelectValue
                                        placeholder={
                                            loading.villages
                                                ? "Memuat..."
                                                : !districtCode
                                                  ? "Pilih kecamatan terlebih dahulu"
                                                  : "Pilih desa/kelurahan"
                                        }
                                    />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>
                                            Desa/Kelurahan
                                        </SelectLabel>

                                        {villages.map((item) => (
                                            <SelectItem
                                                key={item.code}
                                                value={item.code}
                                            >
                                                {item.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <FieldError>{errors.village_code}</FieldError>
                        </Field>
                    </FieldWrapper>

                    {/* Kode Pos */}
                    <div className="grid gap-2">
                        <Label htmlFor="postal_code">
                            Kode pos
                            <RequiredLabel />
                        </Label>

                        <Input
                            id="postal_code"
                            name="postal_code"
                            value={postalCode}
                            readOnly
                            placeholder="Kode pos"
                        />

                        <InputError message={errors.postal_code} />
                    </div>

                    {/* Alamat */}
                    <Field>
                        <FieldLabel htmlFor="address">
                            Alamat lengkap
                            <RequiredLabel />
                        </FieldLabel>

                        <Textarea
                            id="address"
                            name="address"
                            defaultValue={address?.data?.address}
                            rows={4}
                            required
                            placeholder="Nama jalan, nomor rumah, RT/RW, dan keterangan lainnya"
                            className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus:ring-ring flex min-h-20 w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:ring-offset-2 focus:outline-none"
                        />

                        <FieldError>{errors.address}</FieldError>
                    </Field>

                    {/* Catatan */}
                    <div className="grid gap-2">
                        <FieldLabel htmlFor="notes">Catatan</FieldLabel>

                        <Textarea
                            id="notes"
                            name="notes"
                            defaultValue={address?.data?.notes ?? ""}
                            rows={3}
                            placeholder="Contoh: Rumah berwarna putih di samping masjid"
                            className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus:ring-ring flex min-h-20 w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:ring-offset-2 focus:outline-none"
                        />

                        <FieldError>{errors.notes}</FieldError>
                    </div>

                    {/* Alamat utama */}
                    <div className="flex items-center gap-3">
                        <Switch
                            id="is_primary"
                            checked={isPrimary}
                            onCheckedChange={setIsPrimary}
                        />

                        <input
                            type="hidden"
                            name="is_primary"
                            value={isPrimary ? "1" : "0"}
                        />

                        <FieldLabel htmlFor="is_primary">
                            Jadikan sebagai alamat utama
                        </FieldLabel>
                    </div>

                    <FieldError>{errors.is_primary}</FieldError>

                    {/* Submit */}
                    <div className="flex items-center gap-3">
                        <Button type="submit" disabled={processing}>
                            {processing
                                ? isEdit
                                    ? "Menyimpan perubahan..."
                                    : "Menyimpan..."
                                : isEdit
                                  ? "Simpan perubahan"
                                  : "Simpan alamat"}
                        </Button>
                    </div>
                </>
            )}
        </Form>
    );
}
