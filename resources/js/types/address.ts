export interface Province {
    code: string;
    name: string;
}

export interface Regency {
    code: string;
    name: string;
    province_code: string;
}

export interface District {
    code: string;
    name: string;
    regency_code: string;
}

export interface Village {
    code: string;
    name: string;
    district_code: string;
    type: "desa" | "kelurahan";
    postal_code: string | null;
}

export interface Address {
    id: number;
    user_id: number;

    label: string;
    recipient_name: string;
    phone: string;
    address: string;

    province_code: string;
    province: Province | null;

    regency_code: string;
    regency: Regency | null;

    district_code: string;
    district: District | null;

    village_code: string;
    village: Village | null;

    postal_code: string;
    notes: string | null;

    is_primary: boolean;

    created_at: string;
    updated_at: string;
}
