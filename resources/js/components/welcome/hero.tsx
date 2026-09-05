import { ArrowRight, MapPin, Dot, Users } from "lucide-react";
import { router } from "@inertiajs/react";
import GradientBadge from "../gradient-badge";
import { Button } from "../ui/button";
import { login } from "@/routes";

export default function Hero() {
    return (
        <section className="relative overflow-hidden px-4 pt-16 pb-20 sm:px-6 sm:pt-20 sm:pb-28 lg:px-8 lg:pt-24 lg:pb-36">
            {/* Background decorations */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
            >
                <div className="absolute top-0 left-1/2 h-150 w-150 -translate-x-1/2 -translate-y-1/4 rounded-full bg-linear-to-br from-main-400/20 via-indigo-400/10 to-transparent blur-3xl" />
                <div className="absolute top-32 -right-32 h-100 w-100 rounded-full bg-linear-to-bl from-blue-400/15 to-transparent blur-3xl" />
                <div className="absolute bottom-0 -left-32 h-100 w-100 rounded-full bg-linear-to-tr from-main-400/15 to-transparent blur-3xl" />
                {/* Grid pattern */}
                <svg
                    className="absolute inset-0 h-full w-full opacity-[0.03] dark:opacity-[0.06]"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        <pattern
                            id="grid"
                            width="60"
                            height="60"
                            patternUnits="userSpaceOnUse"
                        >
                            <path
                                d="M 60 0 L 0 0 0 60"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1"
                            />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>

            <div className="mx-auto max-w-5xl text-center">
                <div className="mb-6 flex justify-center">
                    <GradientBadge>
                        <MapPin className="h-3 w-3" />
                        Yayasan Nirlaba
                        <Dot className="h-4 w-4" />
                        Magetan, Jawa Timur
                    </GradientBadge>
                </div>

                <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl xl:text-8xl ">
                    Membangkitkan Jiwa Nusantara.{" "}
                    <span className="bg-linear-to-r from-amber-600 via-foreground to-amber-800 bg-clip-text text-transparent">
                        Satu Langkah Nyata.
                    </span>
                </h1>

                <p className="mx-auto mb-10 max-w-4xl leading-relaxed text-muted-foreground sm:text-lg md:text-2xl py-2 font-serif">
                    Suruh Nusantara Cendekia (SNC) adalah organisasi non-profit
                    yang berfokus pada pemberdayaan manusia, didirikan oleh
                    Tunjung Dhimas Bintoro pada tahun 2025. Berpusat di Magetan,
                    Jawa Timur, SNC mendedikasikan gerakannya pada empat pilar
                    utama: Pendidikan, Kesehatan, Lingkungan, dan Kemanusiaan.
                    Kami berpijak pada keyakinan bahwa transformasi dan
                    pemberdayaan manusia Indonesia hanya akan maksimal jika
                    berakar kuat pada jati diri bangsa Nusantara. Melalui
                    integrasi nilai luhur dan aksi nyata, SNC hadir untuk
                    menjadi pionir bagi kemajuan peradaban yang harmonis.
                </p>

                <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <Button
                        size="lg"
                        className="group"
                        // className="group h-12 gap-2 rounded-xl bg-linear-to-r from-main-600 to-main-600 px-8 text-base text-white shadow-lg shadow-main-500/25 transition-all hover:from-main-700 hover:to-main-800 hover:shadow-main-500/40"
                    >
                        Agenda Kami
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Button>
                    {/* <Button
                        variant="outline"
                        size="lg"
                        // className="h-12 gap-2 rounded-xl px-8 text-base"
                    >
                        <Users className="h-4 w-4" />
                        Tentang Kami
                    </Button> */}
                </div>
            </div>
        </section>
    );
}
