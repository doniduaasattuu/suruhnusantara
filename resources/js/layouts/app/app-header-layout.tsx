import { AppContent } from "@/components/app-content";
import { AppHeader } from "@/components/app-header";
import { AppShell } from "@/components/app-shell";
import type { AppLayoutProps } from "@/types";
import { usePage } from "@inertiajs/react";

export default function AppHeaderLayout({
    children,
    breadcrumbs,
}: AppLayoutProps) {
    const { url } = usePage();

    const isDashboard = url === "/dashboard";

    return (
        <AppShell variant="header">
            <AppHeader breadcrumbs={breadcrumbs} />
            {isDashboard ? (
                children
            ) : (
                <AppContent variant="header">{children}</AppContent>
            )}
        </AppShell>
    );
}
