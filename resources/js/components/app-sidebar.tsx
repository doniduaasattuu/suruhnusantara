import { Link } from "@inertiajs/react";
import { LayoutGrid, Shield, Users, Verified } from "lucide-react";
import AppLogo from "@/components/app-logo";
import { NavFooter } from "@/components/nav-footer";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

import type { NavItem } from "@/types";
import { dashboard as administratorDashboard } from "@/routes/administrator";
import { index as indexUser } from "@/routes/users";

const mainNavItems: NavItem[] = [
    {
        title: "Dashboard",
        href: administratorDashboard(),
        icon: LayoutGrid,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: "User",
        href: indexUser(),
        icon: Users,
    },
    {
        title: "Permission",
        href: "#",
        icon: Shield,
    },
    {
        title: "Role",
        href: "#",
        icon: Verified,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={administratorDashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
