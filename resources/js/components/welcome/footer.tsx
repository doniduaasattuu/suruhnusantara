import { Facebook, Linkedin, X } from "lucide-react";
import AppLogoIcon from "../app-logo-icon";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

export default function Footer() {
    const footerLinks = {
        Product: [
            "Features",
            "Integrations",
            "Pricing",
            "Changelog",
            "Roadmap",
            "Status",
        ],
        Company: ["About", "Blog", "Careers", "Press", "Partners", "Legal"],
        Resources: [
            "Documentation",
            "API Reference",
            "Guides",
            "Community",
            "Support",
            "Security",
        ],
        Developers: ["GitHub", "CLI", "SDK", "Examples", "Open Source"],
    };

    return (
        <footer className="border-t border-border/60 bg-muted/20">
            <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-6">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <a
                            href="#"
                            className="flex items-center gap-2 font-bold"
                        >
                            <AppLogoIcon className="aspect-square size-12" />
                            {/* <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-violet-600 to-indigo-600">
                            </div> */}
                            <span className="text-lg font-extrabold">
                                Suruh Nusantara{" "}
                            </span>
                        </a>
                        <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
                            Organisasi non-profit yang berfokus pada
                            pemberdayaan manusia.
                        </p>
                        <div className="mt-5 flex gap-3">
                            {[
                                // {
                                //     icon: <Github className="h-4 w-4" />,
                                //     label: 'GitHub',
                                // },
                                {
                                    icon: <Facebook className="h-4 w-4" />,
                                    label: "Facebook",
                                },
                                {
                                    icon: <X className="h-4 w-4" />,
                                    label: "X",
                                },
                                {
                                    icon: <Linkedin className="h-4 w-4" />,
                                    label: "LinkedIn",
                                },
                            ].map(({ icon, label }) => (
                                <Button
                                    key={label}
                                    variant="outline"
                                    size="icon"
                                    className="h-9 w-9"
                                    aria-label={label}
                                >
                                    {icon}
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category}>
                            <h3 className="mb-4 text-sm font-semibold">
                                {category}
                            </h3>
                            <ul className="space-y-3">
                                {links.map((link) => (
                                    <li key={link}>
                                        <a
                                            href="#"
                                            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                                        >
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <Separator className="my-10" />

                <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} Suruh Nusantara. All rights
                        reserved.
                    </p>
                    <div className="flex gap-6">
                        {[
                            "Privacy Policy",
                            "Terms of Service",
                            "Cookie Settings",
                        ].map((item) => (
                            <a
                                key={item}
                                href="#"
                                className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                            >
                                {item}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
