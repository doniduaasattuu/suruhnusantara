import { Address } from "./address";

export type User = {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    avatar?: string;
    avatar_url: string | null;
    bio: string | null;
    birth_date: string | null;
    gender: "male" | "female" | null;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    is_active: boolean;
    last_login_at: string | null;
    last_logout_at: string | null;
    isAdministrator: boolean;
    addresses: Address[];
    primaryAddress?: Address;
    [key: string]: unknown;
};

export type Auth = {
    user: User;
    roles: string[];
    permissions: Record<string, boolean>;
};

export type Passkey = {
    id: number;
    name: string;
    authenticator: string | null;
    created_at_diff: string;
    last_used_at_diff: string | null;
};

export type TwoFactorSetupData = {
    svg: string;
    url: string;
};

export type TwoFactorSecretKey = {
    secretKey: string;
};
