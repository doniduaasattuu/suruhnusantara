import { useEffect, useState } from "react";
import {
    ArrowRight,
    BookOpen,
    Flower2,
    HeartHandshake,
    Sprout,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import TextLink from "../text-link";

const GALLERY_INTERVAL_MS = 5000;

const galleryImages = [
    "/storage/assets/program/kesehatan.jpg",
    "/storage/assets/program/kemanusiaan.jpg",
    "/storage/assets/program/lingkungan.jpg",
    "/storage/assets/program/pendidikan.jpg",
    // "https://picsum.photos/seed/snc-program-satu/1600/900",
    // "https://picsum.photos/seed/snc-program-dua/1600/900",
    // "https://picsum.photos/seed/snc-program-tiga/1600/900",
    // "https://picsum.photos/seed/snc-program-empat/1600/900",
    // "https://picsum.photos/seed/snc-program-lima/1600/900",
];

const pillars = [
    {
        icon: BookOpen,
        title: "Pendidikan",
        description:
            "Program pendidikan adalah wujud dedikasi SNC untuk menumbuhkan kecerdasan kognitif dan karakter bangsa melalui literasi dan edukasi non-formal.",
    },
    {
        icon: Flower2,
        title: "Kesehatan Holistik",
        description:
            "Program Kesehatan Holistik bertujuan menjaga keselarasan raga, mental, dan spiritual sebagai fondasi manusia yang berdaya.",
    },
    {
        icon: Sprout,
        title: "Lingkungan",
        description:
            "Program Lingkungan adalah bentuk gerakan SNC dalam merawat harmoni antara manusia dan alam demi keberlanjutan semesta dan masa depan peradaban.",
    },
    {
        icon: HeartHandshake,
        title: "Kemanusiaan",
        description:
            "Program Kemanusiaan bentuk dedikasi SNC dalam mewujudkan rasa welas asih dan solidaritas nyata melalui aksi sosial dan tanggap bencana.",
    },
] as const;

export default function Program() {
    const [activeSlide, setActiveSlide] = useState(0);

    useEffect(() => {
        const timer = window.setInterval(() => {
            setActiveSlide((prev) => (prev + 1) % galleryImages.length);
        }, GALLERY_INTERVAL_MS);
        return () => window.clearInterval(timer);
    }, []);

    return (
        <section id="program" className="bg-background">
            {/* Hero */}
            <div className="relative overflow-hidden">
                {galleryImages.map((src, index) => (
                    <img
                        key={src}
                        src={src}
                        alt=""
                        aria-hidden="true"
                        className={cn(
                            "absolute inset-0 h-full w-full object-cover transition-opacity duration-1200 ease-in-out",
                            index === activeSlide ? "opacity-100" : "opacity-0",
                        )}
                    />
                ))}
                <div className="absolute inset-0 bg-linear-to-r from-background via-background/75 to-background/20 sm:to-background/10" />
                <div className="absolute inset-0 bg-linear-to-t from-background/60 via-transparent to-transparent sm:hidden" />

                <div className="relative mx-auto flex min-h-105 max-w-6xl flex-col justify-center gap-5 px-6 py-16 sm:min-h-135 sm:px-8 lg:px-10">
                    {/* <p className="text-sm text-muted-foreground">
                        Beranda{" "}
                        <span className="mx-1.5 text-muted-foreground/50">
                            ·
                        </span>
                        <span className="font-semibold text-foreground">
                            Program
                        </span>
                    </p> */}
                    <h1 className="max-w-xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                        Program Kami
                    </h1>
                    <p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                        Suruh Nusantara Cendekia (SNC) mendedikasikan gerakannya
                        pada empat pilar utama: Pendidikan, Kesehatan Holistik,
                        Lingkungan, dan Kemanusiaan. Kami berpijak pada
                        keyakinan bahwa transformasi dan pemberdayaan manusia
                        Indonesia hanya akan maksimal jika berakar kuat pada
                        jati diri bangsa Nusantara. Melalui integrasi nilai
                        luhur dan aksi nyata, SNC hadir untuk menjadi pionir
                        bagi kemajuan peradaban yang harmonis.
                    </p>
                </div>
            </div>

            {/* Pilar */}
            <div className="mx-auto max-w-6xl px-6 py-14 sm:px-8 lg:px-10">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
                    <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:max-w-sm">
                        Pilar Program penggerak Perubahan
                    </h2>
                    <p className="text-sm leading-relaxed text-muted-foreground lg:max-w-md">
                        Pilar program kami adalah pondasi untuk menciptakan
                        kemajuan kesadaran diri yang bermanfaat bagi masyarakat
                        luas. Setiap pilar berfokus pada kesejahteraan,
                        pemberdayaan, dan keberlanjutan untuk menciptakan dampak
                        perubahan positif.
                    </p>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {pillars.map(({ icon: Icon, title, description }) => (
                        <Card
                            key={title}
                            className="border-primary/25 bg-card shadow-none hover:bg-card/40 hover:border-primary/50"
                        >
                            <CardContent className="flex flex-col gap-5 p-6 sm:p-7 group cursor-pointer">
                                <span className="flex h-12 w-12 items-center justify-center rounded-lg border border-primary/40 text-primary">
                                    <Icon
                                        className="h-5 w-5"
                                        strokeWidth={1.75}
                                    />
                                </span>
                                <div className="flex flex-col gap-2">
                                    <h3 className="text-lg font-semibold text-foreground">
                                        {title}
                                    </h3>
                                    <p className="text-sm leading-relaxed text-muted-foreground">
                                        {description}
                                    </p>
                                </div>
                                {/* <Button
                                    variant="link"
                                    className="h-auto w-fit p-0 text-sm font-medium text-primary hover:no-underline bg-red-400"
                                >
                                    Lihat Selengkapnya
                                    <ArrowRight className="h-4 w-4" />
                                </Button> */}
                                <TextLink className="font-medium text-primary p-0 text-sm flex flex-row items-center gap-1">
                                    Lihat Selengkapnya
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </TextLink>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
