import { Head, usePage } from "@inertiajs/react";
import Hero from "@/components/welcome/hero";
import Navbar from "@/components/welcome/navbar";
import { AppHeader } from "@/components/app-header";
import { StatsBar } from "@/components/welcome/stats-bar";
import Footer from "@/components/welcome/footer";
import Program from "@/components/welcome/program";
import Event from "@/components/welcome/event";

export default function Welcome() {
    const { auth } = usePage().props;

    return (
        <>
            {!auth.user && <AppHeader />}
            {/* <Head title="Welcome" /> */}
            {/* <Navbar /> */}
            <Hero />
            <StatsBar />
            <Program />
            <Event />
            <Footer />
        </>
    );
}
