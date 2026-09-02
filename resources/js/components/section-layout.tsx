import { Link } from "@inertiajs/react";
import type { PropsWithChildren } from "react";

import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCurrentUrl } from "@/hooks/use-current-url";
import { cn, toUrl } from "@/lib/utils";
import type { NavItem } from "@/types";

interface SectionLayoutProps extends PropsWithChildren {
    title: string;
    description?: string;
    className?: string;
    contentClassName?: string;
    navigation: NavItem[];
}

export default function SectionLayout({
    title,
    description,
    navigation,
    className,
    contentClassName,
    children,
}: SectionLayoutProps) {
    const { isCurrentOrParentUrl } = useCurrentUrl();

    return (
        <div className="px-4 py-6">
            <Heading title={title} description={description} />

            <div className="flex flex-col lg:flex-row lg:space-x-12">
                <aside className="w-full max-w-xl lg:w-48">
                    <nav
                        className="flex flex-col space-y-1 space-x-0"
                        aria-label={`${title} navigation`}
                    >
                        {navigation.map((item, index) => (
                            <Button
                                key={`${toUrl(item.href)}-${index}`}
                                size="sm"
                                variant="ghost"
                                asChild
                                className={cn("w-full justify-start", {
                                    "bg-muted": isCurrentOrParentUrl(item.href),
                                })}
                            >
                                <Link href={item.href}>
                                    {item.icon && (
                                        <item.icon className="h-4 w-4" />
                                    )}

                                    {item.title}
                                </Link>
                            </Button>
                        ))}
                    </nav>
                </aside>

                <Separator className="my-6 lg:hidden" />

                <div className={cn("flex-1 md:max-w-xl", className)}>
                    <section
                        className={cn("space-y-12 max-w-xl", contentClassName)}
                    >
                        {children}
                    </section>
                </div>
            </div>
        </div>
    );
}
