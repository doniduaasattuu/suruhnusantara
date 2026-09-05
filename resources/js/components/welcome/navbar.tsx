import { Link, usePage } from "@inertiajs/react";
import { ArrowRight, ChevronRight, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { login } from "@/routes";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "../ui/navigation-menu";
import { Separator } from "../ui/separator";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import AppLogoIcon from "../app-logo-icon";
import { ModeToggle } from "../mode";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const { props } = usePage();
    const appName = props.name;

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`sticky top-0 z-50 w-full transition-all duration-150 ${
                scrolled
                    ? "border-b border-border/50 bg-main-50/50 shadow-sm backdrop-blur-md"
                    : "bg-transparent"
            }`}
        >
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <a href="#" className="flex items-center gap-2 font-bold">
                    {/* <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-violet-600 to-indigo-600">
                        <Zap className="h-4 w-4 text-white" />
                    </div> */}
                    <div className="flex items-center justify-center rounded-md">
                        <AppLogoIcon className="aspect-square size-12" />
                    </div>
                    <span className="text-lg font-extrabold tracking-tight">
                        {appName ?? "Laravel"}
                    </span>
                </a>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex">
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuLink href="#program">
                                    Program
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink href="#layanan">
                                    Layanan
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink href="#tentang-kami">
                                    Tentang Kami
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink href="#faq">
                                    FAQ
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </nav>

                {/* Desktop CTA */}
                <div className="hidden items-center gap-3 lg:flex">
                    <Link href={login()}>
                        <Button variant="ghost" size="sm">
                            Log in
                        </Button>
                    </Link>
                    <Button
                        size="sm"
                        className="group bg-linear-to-br from-main-500 via-main-600 to-main-700 hover:via-main-700 hover:to-main-800 hover:shadow-lg"
                    >
                        Donasi
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Button>
                    <ModeToggle />
                </div>

                {/* Mobile Menu */}
                <Sheet>
                    <SheetTrigger asChild className="lg:hidden">
                        <Button variant="ghost" size="icon">
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-80">
                        <SheetHeader>
                            <SheetTitle className="flex items-center gap-2">
                                <AppLogoIcon className="aspect-square size-10" />
                                {appName}
                            </SheetTitle>
                            <SheetDescription>
                                Organisasi non-profit yang berfokus pada
                                pemberdayaan manusia.
                            </SheetDescription>
                        </SheetHeader>
                        <nav className="mt-6 flex flex-col gap-1 px-4">
                            {[
                                "Product",
                                "Features",
                                "Pricing",
                                "Docs",
                                "Blog",
                                "Changelog",
                            ].map((item) => (
                                <a
                                    key={item}
                                    href="#"
                                    className="flex items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
                                >
                                    {item}
                                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                </a>
                            ))}
                            <Separator className="my-4" />
                            <Button
                                variant="outline"
                                className="w-full justify-center"
                            >
                                Sign in
                            </Button>
                            <Button className="group mt-3 w-full justify-center bg-linear-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-700 hover:to-indigo-700">
                                Donasi
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                            </Button>
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
}
