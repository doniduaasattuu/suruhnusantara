import SearchBar from "@/components/search-bar";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { genderLabels } from "@/constant/gender";
import usePermissions from "@/hooks/use-permissions";
import { formatDateTime, tableCaption } from "@/lib/utils";
import { destroy as deleteUser } from "@/routes/users";
import { Meta, User } from "@/types";
import { router } from "@inertiajs/react";
import {
    Mars,
    MessageCircle,
    MoreHorizontalIcon,
    Trash2,
    Venus,
} from "lucide-react";
import { ActionConfirm } from "../action-confirm";
import { GeneratePagination } from "../generate-pagination";
import HoverWhatsapp from "../hover-whatsapp";
import { PerPageSelector } from "../per-page-selector";
import TooltipWrapper from "../tooltip-wrapper";
import { Button } from "../ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Switch } from "../ui/switch";
import UserAvatar from "../user-avatar";

interface TableUserProps {
    users: {
        data: User[];
        meta: Meta;
    };
    roles: string[];
    withHeader?: boolean;
    filters: {
        query: string;
        per_page: string;
    };
}

export default function TableUser({
    users,
    withHeader = true,
    filters,
}: TableUserProps) {
    const { can } = usePermissions();
    const meta = users.meta;
    const caption = tableCaption(meta);

    const handleUserStatusChange = (checked: boolean, user: User) => {
        router.patch(
            checked
                ? `/administrator/users/${user.id}/activate`
                : `/administrator/users/${user.id}/deactivate`,
        );
    };

    const handleDeleteUser = (user: User) => {
        router.delete(deleteUser(user.id));
    };

    return (
        <>
            {withHeader && (
                <div className="flex justify-between gap-2">
                    <div className="flex justify-between gap-2">
                        <SearchBar value={filters?.query} tabIndex={1} />
                        <PerPageSelector
                            value={filters?.per_page?.toString() ?? "10"}
                            tabIndex={2}
                        />
                    </div>
                </div>
            )}
            <div className="grid min-w-0 overflow-x-auto rounded-md">
                {users.data && users.data.length > 0 ? (
                    <Table>
                        <TableCaption className="pb-4 text-sm">
                            {caption}
                        </TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-muted-foreground text-xs">
                                    #
                                </TableHead>
                                <TableHead className="text-muted-foreground text-xs">
                                    Nama
                                </TableHead>
                                <TableHead className="text-muted-foreground text-xs">
                                    Tanggal lahir
                                </TableHead>
                                <TableHead className="text-muted-foreground text-xs">
                                    Kontak
                                </TableHead>
                                <TableHead className="text-muted-foreground text-xs">
                                    Status
                                </TableHead>
                                <TableHead className="text-muted-foreground text-xs">
                                    Jenis kelamin
                                </TableHead>
                                <TableHead className="text-muted-foreground text-xs">
                                    Bio
                                </TableHead>
                                <TableHead className="text-muted-foreground text-xs">
                                    Alamat
                                </TableHead>
                                <TableHead className="text-muted-foreground text-xs">
                                    Login terakhir
                                </TableHead>
                                <TableHead className="text-muted-foreground text-xs">
                                    Logout terakhir
                                </TableHead>
                                <TableHead className="text-muted-foreground text-xs">
                                    Tanggal bergabung
                                </TableHead>
                                <TableHead className="text-muted-foreground text-xs">
                                    Aksi
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.data.map((user: User) => {
                                return (
                                    <TableRow key={user.id}>
                                        <TableCell className="w-12.5">
                                            <UserAvatar user={user} />
                                        </TableCell>
                                        <TableCell>
                                            <FlexColWrapper>
                                                <span
                                                    className={
                                                        user.isAdministrator
                                                            ? "font-bold"
                                                            : undefined
                                                    }
                                                >
                                                    {user.name}
                                                </span>
                                            </FlexColWrapper>
                                        </TableCell>
                                        <TableCell>
                                            <span className="text-xs text-muted-foreground ">
                                                {user.birth_date}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-xs">
                                            <FlexColWrapper>
                                                {user.phone && (
                                                    <HoverWhatsapp
                                                        content={
                                                            <a
                                                                href={`https://wa.me/${user.phone}`}
                                                            >
                                                                <div className="text-sm flex gap-2 text-muted-foreground items-center align-middle">
                                                                    <MessageCircle className="w-4 h-4" />
                                                                    <span>
                                                                        Kirim
                                                                        pesan
                                                                        WhatsApp
                                                                    </span>
                                                                </div>
                                                            </a>
                                                        }
                                                    >
                                                        <span>
                                                            {user.phone}
                                                        </span>
                                                    </HoverWhatsapp>
                                                )}
                                                <span className="text-xs text-muted-foreground">
                                                    {user.email}
                                                </span>
                                            </FlexColWrapper>
                                        </TableCell>
                                        <TableCell>
                                            <TooltipWrapper content="Izinkan pengguna untuk login ke aplikasi">
                                                <FlexColWrapper>
                                                    <Switch
                                                        disabled={
                                                            user.isAdministrator
                                                        }
                                                        checked={user.is_active}
                                                        onCheckedChange={(e) =>
                                                            handleUserStatusChange(
                                                                e,
                                                                user,
                                                            )
                                                        }
                                                    />
                                                </FlexColWrapper>
                                            </TooltipWrapper>
                                        </TableCell>
                                        <TableCell>
                                            {user?.gender ? (
                                                user.gender == "male" ? (
                                                    <TooltipWrapper
                                                        content={
                                                            genderLabels[
                                                                user.gender
                                                            ]
                                                        }
                                                    >
                                                        <Mars className="text-blue-400" />
                                                    </TooltipWrapper>
                                                ) : (
                                                    <TooltipWrapper
                                                        content={
                                                            genderLabels[
                                                                user.gender
                                                            ]
                                                        }
                                                    >
                                                        <Venus className="text-pink-400" />
                                                    </TooltipWrapper>
                                                )
                                            ) : null}
                                        </TableCell>
                                        <TableCell className="w-65 min-w-50">
                                            <p className="text-wrap truncate line-clamp-2 text-xs">
                                                {user.bio}
                                            </p>
                                        </TableCell>
                                        <TableCell className="w-65 min-w-50">
                                            <p className="text-wrap truncate line-clamp-2 text-xs">
                                                {user.primaryAddress?.address}
                                            </p>
                                        </TableCell>
                                        <TableCell className="text-xs text-muted-foreground">
                                            <FlexColWrapper>
                                                <span>
                                                    {formatDateTime(
                                                        user.last_login_at,
                                                        "date",
                                                    )}
                                                </span>
                                                <span>
                                                    {formatDateTime(
                                                        user.last_login_at,
                                                        "time",
                                                    )}
                                                </span>
                                            </FlexColWrapper>
                                        </TableCell>
                                        <TableCell className="text-xs text-muted-foreground">
                                            <FlexColWrapper>
                                                <span>
                                                    {formatDateTime(
                                                        user.last_logout_at,
                                                        "date",
                                                    )}
                                                </span>
                                                <span>
                                                    {formatDateTime(
                                                        user.last_logout_at,
                                                        "time",
                                                    )}
                                                </span>
                                            </FlexColWrapper>
                                        </TableCell>
                                        <TableCell>
                                            <FlexColWrapper>
                                                <span className="text-xs">
                                                    {formatDateTime(
                                                        user.created_at,
                                                        "date",
                                                    )}
                                                </span>
                                            </FlexColWrapper>
                                        </TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="size-8"
                                                    >
                                                        <MoreHorizontalIcon />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    {/* <DropdownMenuItem
                                                        onClick={() =>
                                                            console.log(
                                                                "Info user",
                                                            )
                                                        }
                                                    >
                                                        <Info />
                                                        Lebih lanjut
                                                    </DropdownMenuItem> */}

                                                    {can.delete_user && (
                                                        <ActionConfirm
                                                            action={() =>
                                                                handleDeleteUser(
                                                                    user,
                                                                )
                                                            }
                                                            title="Hapus Pengguna"
                                                            description="Apakah anda yakin?, Aksi ini akan menghapus pengguna dari sistem secara permanen. *Saran: Non aktifkan pengguna."
                                                        >
                                                            <DropdownMenuItem
                                                                onSelect={(e) =>
                                                                    e.preventDefault()
                                                                }
                                                                className="text-red-600 focus:bg-red-50 focus:text-red-700"
                                                            >
                                                                <Trash2 className="h-4 w-4 text-red-500 focus:text-red-800" />
                                                                Hapus
                                                            </DropdownMenuItem>
                                                        </ActionConfirm>
                                                    )}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                ) : null}
            </div>
            <GeneratePagination meta={meta} />
        </>
    );
}

const FlexColWrapper = ({ children }: { children: React.ReactNode }) => {
    return <div className="flex flex-col space-y-1">{children}</div>;
};
