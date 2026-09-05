"use client";

import { Calendar, Clock, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

/**
 * Empat pilar program Suruh Nusantara Cendekia (SNC).
 */
export type EventPillar =
    | "Pendidikan"
    | "Kesehatan"
    | "Lingkungan"
    | "Kemanusiaan";

/**
 * Bentuk data event SNC. Dipakai bersama oleh section <Event />,
 * halaman detail event, maupun halaman agenda penuh.
 */
export interface SncEvent {
    id: string;
    slug: string;
    title: string;
    pillar: EventPillar;
    /** Format ISO, contoh: "2026-10-18" */
    date: string;
    /** Contoh: "08.00 - 12.00 WIB" */
    time: string;
    location: string;
    city: string;
    description: string;
    imageUrl: string;
    href: string;
}

const upcomingEvents: SncEvent[] = [
    {
        id: "evt-1",
        slug: "literasi-desa-magetan",
        title: "Gerakan Literasi Desa Magetan",
        pillar: "Pendidikan",
        date: "2026-10-18",
        time: "08.00 - 12.00 WIB",
        location: "Balai Desa Sukomoro",
        city: "Magetan, Jawa Timur",
        description:
            "Pelatihan literasi dan pendampingan baca-tulis untuk anak-anak dan remaja di wilayah pedesaan Magetan.",
        imageUrl: "https://picsum.photos/seed/snc-event-literasi/600/600",
        href: "/program/pendidikan/literasi-desa-magetan",
    },
    {
        id: "evt-2",
        slug: "pos-kesehatan-keliling",
        title: "Pos Kesehatan Keliling",
        pillar: "Kesehatan",
        date: "2026-10-25",
        time: "07.30 - 11.00 WIB",
        location: "Puskesmas Pembantu Plaosan",
        city: "Magetan, Jawa Timur",
        description:
            "Pemeriksaan kesehatan gratis, konsultasi gizi, dan edukasi kesehatan holistik bagi warga sekitar.",
        imageUrl: "https://picsum.photos/seed/snc-event-kesehatan/600/600",
        href: "/program/kesehatan/pos-kesehatan-keliling",
    },
    {
        id: "evt-3",
        slug: "tanam-serentak-lereng-lawu",
        title: "Tanam Serentak Lereng Lawu",
        pillar: "Lingkungan",
        date: "2026-11-02",
        time: "06.00 - 09.00 WIB",
        location: "Lereng Gunung Lawu",
        city: "Magetan, Jawa Timur",
        description:
            "Aksi penanaman pohon bersama warga dan relawan untuk menjaga daya dukung lingkungan di lereng Lawu.",
        imageUrl: "https://picsum.photos/seed/snc-event-lingkungan/600/600",
        href: "/program/lingkungan/tanam-serentak-lereng-lawu",
    },
    {
        id: "evt-4",
        slug: "tanggap-bencana-siaga-desa",
        title: "Tanggap Bencana Siaga Desa",
        pillar: "Kemanusiaan",
        date: "2026-11-14",
        time: "09.00 - 15.00 WIB",
        location: "Kecamatan Panekan",
        city: "Magetan, Jawa Timur",
        description:
            "Pelatihan kesiapsiagaan bencana dan penyaluran bantuan bagi warga di wilayah rawan bencana.",
        imageUrl: "https://picsum.photos/seed/snc-event-kemanusiaan/600/600",
        href: "/program/kemanusiaan/tanggap-bencana-siaga-desa",
    },
];

const dateFormatter = new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
});

export function Event() {
    return (
        <section id="event" className="bg-secondary">
            <div className="mx-auto max-w-6xl px-6 py-14 sm:px-8 lg:px-10">
                <div className="flex items-center justify-between gap-4">
                    <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                        Event Mendatang
                    </h2>
                    <Button variant="outline" className="rounded-full" asChild>
                        <a href="/agenda">Agenda Event</a>
                    </Button>
                </div>

                <Carousel opts={{ align: "start" }} className="mt-10">
                    <CarouselContent className="-ml-4">
                        {upcomingEvents.map((event) => (
                            <CarouselItem
                                key={event.id}
                                className="basis-[80%] pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 py-2"
                            >
                                <a
                                    href={event.href}
                                    className="group block h-full"
                                >
                                    {/* <Card className="h-full overflow-hidden border-border bg-card shadow-none transition-colors group-hover:border-primary/50"> */}
                                    <Card className="border-primary/25 bg-card shadow-none hover:bg-card/60 pt-0">
                                        <div className="relative aspect-square overflow-hidden bg-muted rounded-t-xl">
                                            <img
                                                src={event.imageUrl}
                                                alt={event.title}
                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                            <Badge className="absolute right-3 top-3 rounded-full bg-background/90 text-foreground hover:bg-background/90">
                                                {event.pillar}
                                            </Badge>
                                        </div>
                                        <CardContent className="flex flex-col gap-3 p-4">
                                            <h3 className="line-clamp-1 text-sm font-semibold text-foreground">
                                                {event.title}
                                            </h3>
                                            <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                                                {event.description}
                                            </p>
                                            <div className="flex flex-col gap-1.5 border-t border-border pt-3 text-xs text-muted-foreground">
                                                <span className="flex items-center gap-2">
                                                    <Calendar className="h-3.5 w-3.5 shrink-0 text-primary" />
                                                    {dateFormatter.format(
                                                        new Date(event.date),
                                                    )}
                                                </span>
                                                <span className="flex items-center gap-2">
                                                    <Clock className="h-3.5 w-3.5 shrink-0 text-primary" />
                                                    {event.time}
                                                </span>
                                                <span className="flex align-top gap-2">
                                                    <MapPin className="h-3.5 w-3.5 shrink-0 text-primary" />
                                                    {event.location},{" "}
                                                    {event.city}
                                                </span>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </a>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    {/* <CarouselPrevious className="left-0 sm:-left-4" />
                    <CarouselNext className="right-0 sm:-right-4" /> */}
                </Carousel>
            </div>
        </section>
    );
}

export default Event;
