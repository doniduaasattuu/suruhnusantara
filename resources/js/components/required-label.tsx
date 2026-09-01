import { cn } from "@/lib/utils";

interface Props {
    className?: string;
}

export default function RequiredLabel({ className }: Props) {
    return (
        <span className={cn("text-destructive", className)} aria-hidden="true">
            {" *"}
        </span>
    );
}
