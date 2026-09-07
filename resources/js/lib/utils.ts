import { Meta } from "@/types";
import type { InertiaLinkProps } from "@inertiajs/react";
import { clsx } from "clsx";
import type { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function toUrl(url: NonNullable<InertiaLinkProps["href"]>): string {
    return typeof url === "string" ? url : url.url;
}

export function tableCaption(meta: Meta) {
    if (!meta || meta.total === 0) return "Showing 0 to 0 of 0 results";

    const from = meta.from ?? 0;
    const to = meta.to ?? 0;
    const total = meta.total ?? 0;

    return `Showing ${from} to ${to} of ${total} results`;
}

export function formatDateTime(
    date: string | null,
    type: "full" | "date" | "time" = "full",
) {
    if (date == null) return "";

    const jsDate = new Date(date);

    // Validasi jika string date tidak valid
    if (isNaN(jsDate.getTime())) return "";

    const options: Intl.DateTimeFormatOptions = { hour12: false };

    // Atur opsi berdasarkan parameter type
    if (type === "full" || type === "date") {
        options.day = "2-digit";
        options.month = "2-digit";
        options.year = "numeric";
    }

    if (type === "full" || type === "time") {
        options.hour = "2-digit";
        options.minute = "2-digit";
        options.second = "2-digit";
    }

    const formatter = new Intl.DateTimeFormat("en-GB", options);

    // Ubah karakter pemisah "/" menjadi "-" dan bersihkan sisa koma/spasi di awal/akhir
    const formattedDate = formatter
        .format(jsDate)
        .replace(/\//g, "-")
        .replace(",", "")
        .trim();

    return formattedDate;
}
