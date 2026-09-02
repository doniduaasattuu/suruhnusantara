import { Form, Head } from "@inertiajs/react";
import { useRef } from "react";
import SecurityController from "@/actions/App/Http/Controllers/Settings/SecurityController";
import Heading from "@/components/heading";
import InputError from "@/components/input-error";
import PasswordInput from "@/components/password-input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { edit } from "@/routes/security";
import type { Props as ManagePasskeysProps } from "@/components/manage-passkeys";
import ManagePasskeys from "@/components/manage-passkeys";
import type { Props as ManageTwoFactorProps } from "@/components/manage-two-factor";
import ManageTwoFactor from "@/components/manage-two-factor";
import RequiredLabel from "@/components/required-label";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";

// oxfmt-ignore
type Props = {
    passwordRules: string;
    enableManageTwoFactor?: boolean;
    enableManagePasskeys?: boolean;
} & ManagePasskeysProps &
    ManageTwoFactorProps;

export default function Security(props: Props) {
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);

    return (
        <>
            <Head title="Pengaturan keamanan" />

            <h1 className="sr-only">Pengaturan keamanan</h1>

            <div className="space-y-6">
                <Heading
                    variant="small"
                    title="Perbarui kata sandi"
                    description="Pastikan akun Anda menggunakan kata sandi yang panjang dan acak agar tetap aman."
                />

                <Form
                    {...SecurityController.update.form()}
                    options={{
                        preserveScroll: true,
                    }}
                    resetOnError={[
                        "password",
                        "password_confirmation",
                        "current_password",
                    ]}
                    resetOnSuccess
                    onError={(errors) => {
                        if (errors.password) {
                            passwordInput.current?.focus();
                        }

                        if (errors.current_password) {
                            currentPasswordInput.current?.focus();
                        }
                    }}
                    className="space-y-6"
                >
                    {({ errors, processing }) => (
                        <>
                            <Field>
                                <FieldLabel htmlFor="current_password">
                                    Kata sandi saat ini
                                    <RequiredLabel />
                                </FieldLabel>

                                <PasswordInput
                                    id="current_password"
                                    ref={currentPasswordInput}
                                    name="current_password"
                                    autoComplete="current-password"
                                    placeholder="Kata sandi saat ini"
                                />

                                <FieldError>
                                    {errors.current_password}
                                </FieldError>
                            </Field>

                            <div className="grid gap-2">
                                <FieldLabel htmlFor="password">
                                    Kata sandi baru
                                    <RequiredLabel />
                                </FieldLabel>

                                <PasswordInput
                                    id="password"
                                    ref={passwordInput}
                                    name="password"
                                    autoComplete="new-password"
                                    placeholder="Kata sandi baru"
                                    passwordrules={props.passwordRules}
                                />

                                <FieldError>{errors.password}</FieldError>
                            </div>

                            <Field>
                                <FieldLabel htmlFor="password_confirmation">
                                    Konfirmasi kata sandi
                                    <RequiredLabel />
                                </FieldLabel>

                                <PasswordInput
                                    id="password_confirmation"
                                    name="password_confirmation"
                                    autoComplete="new-password"
                                    placeholder="Konfirmasi kata sandi"
                                    passwordrules={props.passwordRules}
                                />

                                <FieldError>
                                    {errors.password_confirmation}
                                </FieldError>
                            </Field>

                            <div className="flex items-center gap-4">
                                <Button
                                    disabled={processing}
                                    data-test="update-password-button"
                                >
                                    Simpan
                                </Button>
                            </div>
                        </>
                    )}
                </Form>
            </div>

            {props.enableManageTwoFactor && (
                <ManageTwoFactor
                    canManageTwoFactor={props.canManageTwoFactor}
                    requiresConfirmation={props.requiresConfirmation}
                    twoFactorEnabled={props.twoFactorEnabled}
                />
            )}

            {props.enableManagePasskeys && (
                <ManagePasskeys
                    canManagePasskeys={props.canManagePasskeys}
                    passkeys={props.passkeys}
                />
            )}
        </>
    );
}

Security.layout = {
    breadcrumbs: [
        {
            title: "Pengaturan keamanan",
            href: edit(),
        },
    ],
};
