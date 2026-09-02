import { cn } from "@/lib/utils";
import React from "react";

interface Props {
    children: React.ReactNode;
    className?: string;
}

export default function FieldWrapper({ children, className }: Props) {
    return (
        <div
            className={cn(
                "grid grid-cols-1 sm:grid-cols-2 gap-2 space-y-4 sm:space-y-0",
                className,
            )}
        >
            {children}
        </div>
    );
}
