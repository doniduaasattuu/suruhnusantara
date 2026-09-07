import { Head } from "@inertiajs/react";
import { dashboard } from "@/routes";

export default function AdminDashboard() {
    return (
        <>
            <Head title="Dashboard" />
        </>
    );
}

AdminDashboard.layout = {
    breadcrumbs: [
        {
            title: "Dashboard",
            href: dashboard(),
        },
    ],
};
