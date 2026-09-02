import type { PropsWithChildren } from "react";
import { edit as editAppearance } from "@/routes/appearance";
import { edit as editProfile } from "@/routes/profile";
import { index as indexAddress } from "@/routes/address";
import { edit as editSecurity } from "@/routes/security";
import type { NavItem } from "@/types";
import SectionLayout from "@/components/section-layout";
import { KeyRound, MapPinHouse, SunMoon, User } from "lucide-react";

const sidebarNavItems: NavItem[] = [
    {
        title: "Profil",
        href: editProfile(),
        icon: User,
    },
    {
        title: "Kata sandi",
        href: editSecurity(),
        icon: KeyRound,
    },
    {
        title: "Alamat",
        href: indexAddress(),
        icon: MapPinHouse,
    },
    {
        title: "Tampilan",
        href: editAppearance(),
        icon: SunMoon,
    },
];

interface SettingsLayoutProps extends PropsWithChildren {
    className?: string;
    contentClassName?: string;
}
export default function SettingsLayout({
    className,
    contentClassName,
    children,
}: SettingsLayoutProps) {
    return (
        <SectionLayout
            title="Pengaturan"
            description="Kelola profil dan pengaturan akun Anda"
            navigation={sidebarNavItems}
            className={className}
            contentClassName={contentClassName}
        >
            {children}
        </SectionLayout>
    );
}
