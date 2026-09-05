import { Form, Head } from "@inertiajs/react";
import PasswordInput from "@/components/password-input";
import TextLink from "@/components/text-link";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { register } from "@/routes";
import { store } from "@/routes/login";
import { request } from "@/routes/password";
import PasskeyVerify from "@/components/passkey-verify";
import RequiredLabel from "@/components/required-label";
import GoogleButton from "@/components/google-button";
import { SeparatorWithText } from "@/components/separator-with-text";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";

type Props = {
    status?: string;
    canResetPassword: boolean;
};

export default function Login({ status, canResetPassword = false }: Props) {
    return (
        <>
            <Head title="Log in" />

            <PasskeyVerify />

            <Form
                {...store.form()}
                resetOnSuccess={["password"]}
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <GoogleButton text="Log in dengan Google" />

                        <SeparatorWithText text="Atau masuk dengan email" />

                        <div className="grid gap-6">
                            <Field>
                                <FieldLabel htmlFor="email">
                                    Alamat email
                                    <RequiredLabel />
                                </FieldLabel>

                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                    autoFocus
                                    tabIndex={2}
                                    autoComplete="email"
                                    placeholder="email@suruhnusantara.org"
                                />
                                <FieldError>{errors.email}</FieldError>
                            </Field>

                            <Field>
                                <div className="flex items-center">
                                    <FieldLabel htmlFor="password">
                                        Kata sandi
                                        <RequiredLabel />
                                    </FieldLabel>
                                    {true && (
                                        <TextLink
                                            href={request()}
                                            className="ml-auto text-sm"
                                            tabIndex={7}
                                        >
                                            Lupa password?
                                        </TextLink>
                                    )}
                                </div>
                                <PasswordInput
                                    id="password"
                                    name="password"
                                    required
                                    tabIndex={3}
                                    autoComplete="current-password"
                                    placeholder="Kata sandi"
                                />
                                <FieldError>{errors.password}</FieldError>
                            </Field>

                            <div className="flex items-center space-x-3">
                                <Checkbox
                                    id="remember"
                                    name="remember"
                                    tabIndex={4}
                                />
                                <Label htmlFor="remember">Ingat saya</Label>
                            </div>

                            <Button
                                type="submit"
                                className="mt-4 w-full"
                                tabIndex={5}
                                disabled={processing}
                                data-test="login-button"
                            >
                                {processing && <Spinner />}
                                Log in
                            </Button>
                        </div>

                        <div className="text-muted-foreground text-center text-sm">
                            Belum memiliki akun?{" "}
                            <TextLink href={register()} tabIndex={6}>
                                Daftar
                            </TextLink>
                        </div>
                    </>
                )}
            </Form>

            {status && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">
                    {status}
                </div>
            )}
        </>
    );
}

Login.layout = {
    title: "Log in ke akun anda",
    description: "Silakan masuk untuk melanjutkan",
};
