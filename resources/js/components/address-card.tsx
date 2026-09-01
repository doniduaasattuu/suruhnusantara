import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

export type Props = {
    label: string;
    isPrimary: boolean;
    name: string;
    phone: string;
};

export default function AddressCard(props: Props) {
    return (
        <Card className="w-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium">
                    {props.label}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-sm font-semibold ">
                    <div className="flex flex-row gap-2">
                        <span>{props.name}</span>
                        <span>|</span>
                        <span>{props.phone}</span>
                    </div>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                    RT.07/RW.02, Ds. Tempuran, Kec. Paron, Kab. Ngawi, Jawa
                    Timur, 63253
                </p>
            </CardContent>
            <CardFooter className="flex gap-2 justify-between">
                {props.isPrimary ? (
                    <Button size="sm" variant="default">
                        <Check />
                        Utama
                    </Button>
                ) : (
                    <Button size="sm" variant="secondary">
                        Atur sebagai utama
                    </Button>
                )}
                <div>
                    <Button variant="outline" size="sm">
                        Ubah
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive"
                    >
                        Hapus
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}
