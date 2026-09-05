import { Form, Head } from "@inertiajs/react";
import PasswordInput from "@/components/password-input";
import TextLink from "@/components/text-link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { login } from "@/routes";
import { store } from "@/routes/register";
import RequiredLabel from "@/components/required-label";
import GoogleButton from "@/components/google-button";
import { SeparatorWithText } from "@/components/separator-with-text";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";

type Props = {
    passwordRules: string;
};

export default function Register({ passwordRules }: Props) {
    return (
        <>
            <Head title="Daftar" />
            <Form
                {...store.form()}
                resetOnSuccess={["password", "password_confirmation"]}
                disableWhileProcessing
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <GoogleButton text="Daftar dengan Google" />

                        <SeparatorWithText text="Atau daftar dengan email" />

                        <div className="grid gap-6">
                            <Field>
                                <FieldLabel htmlFor="name">
                                    Nama lengkap
                                    <RequiredLabel />
                                </FieldLabel>
                                <Input
                                    id="name"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="name"
                                    name="name"
                                    placeholder="Nama lengkap"
                                />
                                <FieldError>{errors.name}</FieldError>
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="email">
                                    Alamat email
                                    <RequiredLabel />
                                </FieldLabel>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    tabIndex={2}
                                    autoComplete="email"
                                    name="email"
                                    placeholder="email@suruhnusantara.org"
                                />
                                <FieldError>{errors.email}</FieldError>
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="password">
                                    Kata sandi
                                    <RequiredLabel />
                                </FieldLabel>
                                <PasswordInput
                                    id="password"
                                    required
                                    tabIndex={3}
                                    autoComplete="new-password"
                                    name="password"
                                    placeholder="Kata sandi"
                                    passwordrules={passwordRules}
                                />
                                <FieldError>{errors.password}</FieldError>
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="password_confirmation">
                                    Konfirmasi kata sandi
                                    <RequiredLabel />
                                </FieldLabel>
                                <PasswordInput
                                    id="password_confirmation"
                                    required
                                    tabIndex={4}
                                    autoComplete="new-password"
                                    name="password_confirmation"
                                    placeholder="Konfirmasi kata sandi"
                                    passwordrules={passwordRules}
                                />
                                <FieldError>
                                    {errors.password_confirmation}
                                </FieldError>
                            </Field>

                            <Button
                                type="submit"
                                className="mt-2 w-full"
                                tabIndex={5}
                                data-test="register-user-button"
                            >
                                {processing && <Spinner />}
                                Buat akun
                            </Button>
                        </div>

                        <div className="text-muted-foreground text-center text-sm">
                            Sudah memiliki akun?{" "}
                            <TextLink href={login()} tabIndex={6}>
                                Log in
                            </TextLink>
                        </div>
                    </>
                )}
            </Form>
        </>
    );
}

Register.layout = {
    title: "Buat akun",
    description: "Masukkan data di bawah untuk membuat akun",
};
