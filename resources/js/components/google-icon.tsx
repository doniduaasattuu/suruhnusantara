interface Props {
    className: string;
}

export default function GoogleIcon({ className }: Props) {
    return <img src="/google-icon.png" className={className} />;
}
