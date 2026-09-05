import { Calendar, Users, Star, Shield, BookOpen } from "lucide-react";
import GradientBadge from "../gradient-badge";

const stats = [
    { icon: Calendar, value: "2025", suffix: "", label: "Tahun berdiri" },
    { icon: Users, value: "1.000", suffix: "+", label: "Sukarelawan aktif" },
    { icon: Star, value: "14", suffix: "", label: "Program unggulan" },
    { icon: Shield, value: "3", suffix: "", label: "Layanan tersedia" },
];

export function StatsBar() {
    return (
        <section className="border-y border-border/50 bg-secondary px-4 py-20 sm:px-6 lg:px-8 w-full">
            <div className="mx-auto max-w-4xl">
                <div className="mb-10 flex justify-center">
                    <GradientBadge>
                        <BookOpen className="h-3 w-3" />
                        Dipercaya oleh tim dan perusahaan-perusahaan nasional.
                    </GradientBadge>
                </div>
                <div className="grid grid-cols-2 divide-x divide-y divide-border overflow-hidden rounded-xl border border-border lg:grid-cols-4 lg:divide-y-0">
                    {stats.map(({ icon: Icon, value, suffix, label }) => (
                        <div
                            key={label}
                            className="flex flex-col items-center gap-1.5 bg-background px-4 py-6 text-center dark:bg-dark"
                        >
                            <div className="mb-1 flex h-9 w-9 items-center bg-card-foreground/90 justify-center rounded-full">
                                <Icon className="h-4 w-4 text-background" />
                            </div>
                            <span className="text-2xl font-bold tracking-tight">
                                {value}
                                <span className="text-lg">{suffix}</span>
                            </span>
                            <span className="text-xs leading-tight text-muted-foreground">
                                {label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
