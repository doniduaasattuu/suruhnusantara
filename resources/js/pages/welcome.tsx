import { Head } from "@inertiajs/react";
import Hero from "@/components/welcome/hero";
import { AppHeader } from "@/components/app-header";
import { StatsBar } from "@/components/welcome/stats-bar";
import Footer from "@/components/welcome/footer";
import Program from "@/components/welcome/program";
import Event from "@/components/welcome/event";

export default function Welcome() {
    return (
        <>
            <AppHeader />
            <Head title="Welcome" />
            <Hero />
            <StatsBar />
            <Program />
            <Event />
            <Footer />
        </>
    );
}
