interface UIEntry {
    label: string;
    plural?: string;
    description?: string;
    show?: { header: string; description: string };
    create?: { header: string; description: string };
    edit?: { header: string; description: string };
}

export const DEFAULT_STRINGS: Record<string, UIEntry> = {
    DASHBOARD: {
        label: "Dashboard",
    },

    USER: {
        label: "Pengguna",
        plural: "Pengguna",
        description:
            "Mewakili individu yang memiliki wewenang di dalam sistem.",
        create: {
            header: "Tambah Pengguna",
            description:
                "Daftarkan anggota tim baru dan berikan akses ke platform.",
        },
        edit: {
            header: "Perbarui User",
            description: "Perbarui informasi profil pengguna atau status akun.",
        },
    },

    ROLE: {
        label: "Role",
        plural: "Roles",
        description:
            "Defines the scope of access rights and responsibilities within the system, ensuring users can only perform actions assigned to their function.",
        create: {
            header: "Create Role",
            description:
                "Create a new set of permissions for specific user responsibilities.",
        },
        edit: {
            header: "Edit Role",
            description:
                "Modify the access rights and capabilities assigned to this role.",
        },
    },

    PERMISSION: {
        label: "Permission",
        plural: "Permissions",
        description:
            "Defines the scope of access rights and responsibilities within the system, ensuring users can only perform actions assigned to their function.",
        create: {
            header: "Create Permission",
            description:
                "Create a new permission for specific user responsibilities.",
        },
        edit: {
            header: "Edit Permission",
            description:
                "Modify the access rights and capabilities assigned to this permission.",
        },
    },
} as const;

export const UI_STRINGS = {
    ...DEFAULT_STRINGS,
};
