import { Separator } from "@/components/ui/separator";

export function SeparatorWithText({ text }: { text: string }) {
    return (
        <div className="relative flex items-center justify-center w-full my-2">
            <div className="grow">
                <Separator />
            </div>
            <span className="shrink mx-2 text-xs text-muted-foreground bg-background px-2">
                {text}
            </span>
            <div className="grow">
                <Separator />
            </div>
        </div>
    );
}
