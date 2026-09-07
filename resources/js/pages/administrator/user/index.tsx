import TableUser from "@/components/table/table-user";
import TableLayout from "@/layouts/table/layout";
import { index as indexUser } from "@/routes/users";
import { UI_STRINGS } from "@/lib/ui-strings";
import { Address, Meta, User } from "@/types";
import { Head } from "@inertiajs/react";

type UserProps = {
    users: {
        data: User[];
        meta: Meta;
    };
    addresses?: {
        data: Address[];
    };
    roles: string[];
    filters: {
        query: string;
        per_page: string;
    };
};

export default function UserIndex({ users, roles, filters }: UserProps) {
    return (
        <>
            <Head title="Pengguna" />
            <TableLayout moduleKey="USER">
                <TableUser users={users} roles={roles} filters={filters} />
            </TableLayout>
        </>
    );
}

UserIndex.layout = {
    breadcrumbs: [
        {
            title: UI_STRINGS?.USER?.label ?? "Users",
            href: indexUser(),
        },
    ],
};
