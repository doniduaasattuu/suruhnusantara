import { Head } from "@inertiajs/react";
import { dashboard } from "@/routes";
import Welcome from "./welcome";
import { AppHeader } from "@/components/app-header";

export default function Dashboard() {
    return (
        <>
            <Head title="Dashboard" />

            <AppHeader />

            <Welcome />
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: "Dashboard",
            href: dashboard(),
        },
    ],
};
