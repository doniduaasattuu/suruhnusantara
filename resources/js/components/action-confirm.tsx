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

interface ActionConfirmProps {
    action: () => void;
    title?: string;
    description?: string;
    children: React.ReactNode | undefined;
    actionLabel?: string;
}

export function ActionConfirm({
    action,
    title,
    description,
    actionLabel,
    children,
}: ActionConfirmProps) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        {title ?? "Apakah anda yakin?"}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        {description ??
                            "Perhatian, tindakan ini tidak dapat dibatalkan."}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="cursor-pointer">
                        Batalkan
                    </AlertDialogCancel>
                    <AlertDialogAction
                        className="cursor-pointer"
                        onClick={action}
                    >
                        {actionLabel ?? "Hapus"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
