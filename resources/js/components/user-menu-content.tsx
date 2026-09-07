import { Link, router } from "@inertiajs/react";
import { Activity, LayoutDashboard, LogOut, Settings } from "lucide-react";
import {
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { UserInfo } from "@/components/user-info";
import { useMobileNavigation } from "@/hooks/use-mobile-navigation";
import { dashboard as publicDashboard, logout } from "@/routes";
import { dashboard as administratorDashboard } from "@/routes/administrator";
import { edit } from "@/routes/profile";
import type { User } from "@/types";
import { useCurrentUrl } from "@/hooks/use-current-url";

type Props = {
    user: User;
};

export function UserMenuContent({ user }: Props) {
    const cleanup = useMobileNavigation();

    const handleLogout = () => {
        cleanup();
        router.flushAll();
    };

    const { currentUrl } = useCurrentUrl();

    const dashboardLink = currentUrl.startsWith("/administrator")
        ? publicDashboard
        : administratorDashboard;
    const labelDashboard = currentUrl.startsWith("/administrator")
        ? "Publik"
        : "Administrator";

    return (
        <>
            <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <UserInfo user={user} showEmail={true} />
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                    <Link
                        className="block w-full cursor-pointer"
                        href={edit()}
                        prefetch
                        onClick={cleanup}
                    >
                        <Settings className="mr-2" />
                        Pengaturan
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link
                        className="block w-full cursor-pointer"
                        href={edit()}
                        prefetch
                        onClick={cleanup}
                    >
                        <Activity className="mr-2" />
                        Aktivitas
                    </Link>
                </DropdownMenuItem>
                {user?.isAdministrator && (
                    <DropdownMenuItem asChild>
                        <Link
                            className="block w-full cursor-pointer"
                            href={dashboardLink()}
                            prefetch
                            onClick={cleanup}
                        >
                            <LayoutDashboard className="mr-2" />
                            {labelDashboard}
                        </Link>
                    </DropdownMenuItem>
                )}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
                <Link
                    className="block w-full cursor-pointer"
                    href={logout()}
                    as="button"
                    onClick={handleLogout}
                    data-test="logout-button"
                >
                    <LogOut className="mr-2" />
                    Log out
                </Link>
            </DropdownMenuItem>
        </>
    );
}
