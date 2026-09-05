export default function GradientBadge({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <span className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold bg-linear-to-r from-amber-100 via-background to-amber-200 dark:from-amber-900 dark:via-muted-background dark:to-yellow-900">
            {children}
        </span>
    );
}
