import React from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

export default function HoverWhatsapp({
    children,
    content,
}: {
    children: React.ReactNode;
    content: React.ReactNode;
}) {
    return (
        <HoverCard>
            <HoverCardTrigger>{children}</HoverCardTrigger>
            <HoverCardContent>{content}</HoverCardContent>
        </HoverCard>
    );
}
