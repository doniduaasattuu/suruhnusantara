import { usePage } from "@inertiajs/react";

import AppLogoIcon from "@/components/app-logo-icon";

export default function AppLogo() {
    const { name } = usePage().props;

    return (
        <>
            <div className="text-sidebar-primary-foreground flex aspect-square size-10 items-center justify-center rounded-md">
                <AppLogoIcon className="size-8 fill-current text-white dark:text-black" />
            </div>
            <div className="grid flex-1 text-left text-sm">
                <span className="truncate leading-tight font-semibold uppercase">
                    {name}
                </span>
            </div>
        </>
    );
}
