import { Form, Head } from "@inertiajs/react";
import InputError from "@/components/input-error";
import PasswordInput from "@/components/password-input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { store } from "@/routes/password/confirm";
import {
    index as confirmOptions,
    store as confirmStore,
} from "@/actions/Laravel/Passkeys/Http/Controllers/PasskeyConfirmationController";
import PasskeyVerify from "@/components/passkey-verify";
import RequiredLabel from "@/components/required-label";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";

export default function ConfirmPassword() {
    return (
        <>
            <Head title="Confirm password" />

            <PasskeyVerify
                routes={{
                    options: confirmOptions(),
                    submit: confirmStore(),
                }}
                label="Confirm with passkey"
                loadingLabel="Confirming..."
                separator="Or confirm with password"
            />

            <Form {...store.form()} resetOnSuccess={["password"]}>
                {({ processing, errors }) => (
                    <div className="space-y-6">
                        <Field>
                            <FieldLabel htmlFor="password">
                                Kata sandi
                                <RequiredLabel />
                            </FieldLabel>
                            <PasswordInput
                                id="password"
                                name="password"
                                placeholder="Kata sandi"
                                autoComplete="current-password"
                                autoFocus
                            />

                            <FieldError>{errors.password}</FieldError>
                        </Field>

                        <div className="flex items-center">
                            <Button
                                className="w-full"
                                disabled={processing}
                                data-test="confirm-password-button"
                            >
                                {processing && <Spinner />}
                                Konfirmasi
                            </Button>
                        </div>
                    </div>
                )}
            </Form>
        </>
    );
}

ConfirmPassword.layout = {
    title: "Konfirmasi kata sandi",
    description: "Harap konfirmasi kata sandi Anda sebelum melanjutkan.",
};
