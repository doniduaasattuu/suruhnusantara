import GoogleIcon from "@/components/google-icon";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import React from "react";
import { Button } from "./ui/button";

interface Props {
    text: string;
}

export default function GoogleButton({ text }: Props) {
    const [isOpen, setIsOpen] = React.useState<boolean>(false);

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger asChild>
                <Button
                    tabIndex={1}
                    type="button"
                    size={"lg"}
                    className="w-full rounded-full bg-muted-foreground"
                    onClick={(e) => {
                        e.preventDefault();
                        setIsOpen(!isOpen);
                    }}
                >
                    <GoogleIcon className="w-4 h-4" />
                    {text}
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Oops..</AlertDialogTitle>
                    <AlertDialogDescription>
                        Mohon maaf, saat ini fitur tidak tersedia.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction>Mengerti</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
