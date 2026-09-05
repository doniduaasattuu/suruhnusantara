import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import type { Address } from "@/types/address";
import { ActionConfirm } from "./action-confirm";
import { router } from "@inertiajs/react";
import {
    edit as editAddress,
    destroy as deleteAddress,
    primary as setPrimaryAddress,
} from "@/routes/address";
import { Switch } from "./ui/switch";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

interface AddressCardProps {
    address: Address;
}

export default function AddressCard({ address }: AddressCardProps) {
    return (
        <Card
            className={
                address.is_primary ? "border border-foreground" : undefined
            }
        >
            <CardHeader>
                <CardTitle className="text-sm font-medium">
                    {address.label}
                </CardTitle>
            </CardHeader>

            <CardContent>
                <div className="text-sm font-semibold">
                    <div className="flex flex-wrap gap-2">
                        <span>{address.recipient_name}</span>
                        <span>|</span>
                        <span>{address.phone}</span>
                    </div>
                </div>

                <p className="mt-1 text-sm text-muted-foreground">
                    {address.address}, {address.village?.name},{" "}
                    {address.district?.name}, {address.regency?.name},{" "}
                    {address.province?.name}, {address.postal_code}
                </p>

                {address.notes && (
                    <p className="mt-1 text-sm text-muted-foreground/80">
                        Catatan: {address.notes}
                    </p>
                )}
            </CardContent>

            <CardFooter className="flex justify-between gap-2">
                {address.is_primary ? (
                    <Badge>Utama</Badge>
                ) : (
                    <div className="flex items-center gap-3">
                        <Switch
                            id={`primary-${address.id}`}
                            checked={address.is_primary}
                            disabled={address.is_primary}
                            onCheckedChange={(checked) => {
                                if (!checked) {
                                    return;
                                }

                                router.patch(
                                    setPrimaryAddress(address.id),
                                    {},
                                    {
                                        preserveState: true,
                                        preserveScroll: true,
                                    },
                                );
                            }}
                            className="cursor-pointer"
                        />

                        <label
                            htmlFor={`primary-${address.id}`}
                            className="text-sm font-medium cursor-pointer"
                        >
                            Jadikan sebagai alamat utama
                        </label>
                    </div>
                )}

                <div className="flex gap-1">
                    <Button
                        variant="outline"
                        size="sm"
                        className="cursor-pointer"
                        onClick={() =>
                            router.get(
                                editAddress({
                                    address: address.id,
                                }),
                            )
                        }
                    >
                        Ubah
                    </Button>

                    <ActionConfirm
                        title="Anda yakin ingin menghapus alamat ini?"
                        description="Perhatian, Tindakan ini tidak dapat dibatalkan. Alamat akan dihapus secara permanen."
                        action={() =>
                            router.delete(deleteAddress(address.id), {
                                preserveState: true,
                                preserveScroll: true,
                            })
                        }
                    >
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="text-destructive cursor-pointer "
                        >
                            Hapus
                        </Button>
                    </ActionConfirm>
                </div>
            </CardFooter>
        </Card>
    );
}
