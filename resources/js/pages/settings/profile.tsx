import { Form, Head, usePage } from "@inertiajs/react";
import { Link } from "@inertiajs/react";
import ProfileController from "@/actions/App/Http/Controllers/Settings/ProfileController";
import DeleteUser from "@/components/delete-user";
import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { edit } from "@/routes/profile";
import type { Auth } from "@/types";
import { send } from "@/routes/verification";
import RequiredLabel from "@/components/required-label";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useInitials } from "@/hooks/use-initials";
import FieldWrapper from "@/components/field-wrapper";

type PageProps = {
    auth: Auth;
};

export default function Profile({
    mustVerifyEmail,
    status,
}: {
    mustVerifyEmail: boolean;
    status?: string;
}) {
    const { auth } = usePage<PageProps>().props;
    const getInitials = useInitials();

    return (
        <>
            <Head title="Pengaturan profil" />

            <h1 className="sr-only">Pengaturan profil</h1>

            <div className="space-y-6">
                <Heading
                    variant="small"
                    title="Profil"
                    description="Perbarui nama dan alamat email Anda"
                />

                <Form
                    {...ProfileController.update.form()}
                    options={{
                        preserveScroll: true,
                    }}
                    className="space-y-6"
                    resetOnSuccess={["avatar"]}
                >
                    {({ processing, errors }) => (
                        <>
                            {/* Avatar */}
                            <Field>
                                <FieldLabel htmlFor="avatar">
                                    Foto profil
                                </FieldLabel>

                                <div className="flex items-center gap-4">
                                    <Avatar className="size-20">
                                        <AvatarImage
                                            className="aspect-square h-full w-full object-cover"
                                            src={
                                                auth.user.avatar_url ??
                                                undefined
                                            }
                                            alt={auth.user.name}
                                        />

                                        <AvatarFallback className="text-lg">
                                            {getInitials(auth.user?.name ?? "")}
                                        </AvatarFallback>
                                    </Avatar>

                                    <div className="space-y-2">
                                        <Input
                                            id="avatar"
                                            type="file"
                                            name="avatar"
                                            accept="image/jpeg,image/png,image/webp"
                                        />

                                        <p className="text-muted-foreground text-xs">
                                            JPG, PNG, atau WebP. Maksimal 2 MB.
                                        </p>
                                    </div>
                                </div>

                                <FieldError>{errors.avatar}</FieldError>
                            </Field>

                            <FieldWrapper className="sm:grid-cols-2">
                                {/* Nama */}
                                <Field>
                                    <FieldLabel htmlFor="name">
                                        Nama lengkap
                                        <RequiredLabel />
                                    </FieldLabel>

                                    <Input
                                        id="name"
                                        defaultValue={auth.user.name}
                                        name="name"
                                        required
                                        autoComplete="name"
                                        placeholder="Nama lengkap"
                                    />

                                    <FieldError>{errors.name}</FieldError>
                                </Field>

                                {/* Email */}
                                <Field>
                                    <FieldLabel htmlFor="email">
                                        Alamat email
                                        <RequiredLabel />
                                    </FieldLabel>

                                    <Input
                                        id="email"
                                        type="email"
                                        defaultValue={auth.user.email}
                                        name="email"
                                        required
                                        autoComplete="username"
                                        placeholder="Alamat email"
                                    />

                                    <FieldError>{errors.email}</FieldError>
                                </Field>
                            </FieldWrapper>

                            {/* Verifikasi Email */}
                            {mustVerifyEmail &&
                                auth.user.email_verified_at === null && (
                                    <div>
                                        <p className="-mt-4 text-sm text-muted-foreground">
                                            Alamat email Anda tidak
                                            terverifikasi.{" "}
                                            <Link
                                                href={send()}
                                                as="button"
                                                className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                                            >
                                                Klik di sini untuk mengirim
                                                ulang email verifikasi.
                                            </Link>
                                        </p>

                                        {status ===
                                            "verification-link-sent" && (
                                            <div className="mt-2 text-sm font-medium text-green-600">
                                                Tautan verifikasi baru telah
                                                dikirimkan ke alamat email Anda.
                                            </div>
                                        )}
                                    </div>
                                )}

                            <FieldWrapper className="sm:grid-cols-3">
                                {/* Nomor Telepon */}
                                <Field>
                                    <FieldLabel htmlFor="phone">
                                        Nomor telepon
                                        <RequiredLabel />
                                    </FieldLabel>

                                    <Input
                                        id="phone"
                                        type="tel"
                                        defaultValue={auth.user.phone ?? ""}
                                        name="phone"
                                        autoComplete="tel"
                                        placeholder="08xxxxxxxxxx"
                                    />

                                    <FieldError>{errors.phone}</FieldError>
                                </Field>

                                {/* Tanggal Lahir */}
                                <Field>
                                    <FieldLabel htmlFor="birth_date">
                                        Tanggal lahir
                                        <RequiredLabel />
                                    </FieldLabel>

                                    <Input
                                        id="birth_date"
                                        type="date"
                                        defaultValue={
                                            auth.user.birth_date ?? ""
                                        }
                                        name="birth_date"
                                        autoComplete="bday"
                                    />

                                    <FieldError>{errors.birth_date}</FieldError>
                                </Field>

                                {/* Jenis Kelamin */}
                                <Field>
                                    <FieldLabel htmlFor="gender">
                                        Jenis kelamin
                                        <RequiredLabel />
                                    </FieldLabel>

                                    <Select
                                        name="gender"
                                        defaultValue={
                                            auth.user.gender ?? undefined
                                        }
                                    >
                                        <SelectTrigger id="gender">
                                            <SelectValue placeholder="Pilih jenis kelamin" />
                                        </SelectTrigger>

                                        <SelectContent>
                                            <SelectItem value="male">
                                                Laki-laki
                                            </SelectItem>

                                            <SelectItem value="female">
                                                Perempuan
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>

                                    <FieldError>{errors.gender}</FieldError>
                                </Field>
                            </FieldWrapper>

                            {/* Bio */}
                            <Field>
                                <FieldLabel htmlFor="bio">Bio</FieldLabel>

                                <Textarea
                                    id="bio"
                                    name="bio"
                                    defaultValue={auth.user.bio ?? ""}
                                    placeholder="Ceritakan sedikit tentang diri Anda"
                                    rows={4}
                                />

                                <FieldError>{errors.bio}</FieldError>
                            </Field>

                            {/* Submit */}
                            <div className="flex items-center gap-4">
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    data-test="update-profile-button"
                                >
                                    {processing ? "Menyimpan..." : "Simpan"}
                                </Button>
                            </div>
                        </>
                    )}
                </Form>
            </div>

            <DeleteUser />
        </>
    );
}

Profile.layout = {
    breadcrumbs: [
        {
            title: "Profile settings",
            href: edit(),
        },
    ],
    className: "md:max-w-3xl",
    contentClassName: "max-w-3xl",
};
