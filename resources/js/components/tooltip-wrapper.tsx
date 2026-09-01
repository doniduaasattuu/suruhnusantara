import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export type Props = {
    key?: string | number;
    children: React.ReactNode;
    content: React.ReactNode;
};

export default function TooltipWrapper(props: Props) {
    return (
        <Tooltip key={props.key}>
            <TooltipTrigger>{props.children}</TooltipTrigger>
            <TooltipContent>{props.content}</TooltipContent>
        </Tooltip>
    );
}
