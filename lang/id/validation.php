<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Pesan Bahasa Validasi
    |--------------------------------------------------------------------------
    |
    | Baris bahasa berikut berisi pesan kesalahan bawaan yang digunakan oleh
    | kelas validator. Beberapa aturan memiliki beberapa versi, seperti
    | aturan ukuran. Silakan sesuaikan setiap pesan sesuai kebutuhan.
    |
    */

    'accepted' => 'Kolom :attribute harus disetujui.',
    'accepted_if' => 'Kolom :attribute harus disetujui jika :other bernilai :value.',
    'active_url' => 'Kolom :attribute harus berupa URL yang valid.',
    'after' => 'Kolom :attribute harus berupa tanggal setelah :date.',
    'after_or_equal' => 'Kolom :attribute harus berupa tanggal setelah atau sama dengan :date.',
    'alpha' => 'Kolom :attribute hanya boleh berisi huruf.',
    'alpha_dash' => 'Kolom :attribute hanya boleh berisi huruf, angka, tanda hubung, dan garis bawah.',
    'alpha_num' => 'Kolom :attribute hanya boleh berisi huruf dan angka.',
    'any_of' => 'Kolom :attribute tidak valid.',
    'array' => 'Kolom :attribute harus berupa array.',
    'array_keys' => 'Kolom :attribute hanya boleh berisi kunci berikut: :values.',
    'ascii' => 'Kolom :attribute hanya boleh berisi karakter dan simbol alfanumerik satu byte.',
    'base64' => 'Kolom :attribute harus berupa string Base64 yang valid.',
    'before' => 'Kolom :attribute harus berupa tanggal sebelum :date.',
    'before_or_equal' => 'Kolom :attribute harus berupa tanggal sebelum atau sama dengan :date.',

    'between' => [
        'array' => 'Kolom :attribute harus memiliki :min hingga :max item.',
        'file' => 'Ukuran file :attribute harus antara :min hingga :max kilobita.',
        'numeric' => 'Nilai :attribute harus antara :min hingga :max.',
        'string' => 'Kolom :attribute harus memiliki panjang antara :min hingga :max karakter.',
    ],

    'boolean' => 'Kolom :attribute harus bernilai benar atau salah.',
    'can' => 'Kolom :attribute berisi nilai yang tidak diizinkan.',
    'confirmed' => 'Konfirmasi :attribute tidak cocok.',
    'contains' => 'Kolom :attribute tidak memiliki nilai yang diperlukan.',
    'current_password' => 'Kata sandi tidak benar.',
    'date' => 'Kolom :attribute harus berupa tanggal yang valid.',
    'date_equals' => 'Kolom :attribute harus berupa tanggal yang sama dengan :date.',
    'date_format' => 'Kolom :attribute harus sesuai dengan format :format.',
    'decimal' => 'Kolom :attribute harus memiliki :decimal angka di belakang koma.',
    'declined' => 'Kolom :attribute harus ditolak.',
    'declined_if' => 'Kolom :attribute harus ditolak jika :other bernilai :value.',
    'different' => 'Kolom :attribute dan :other harus berbeda.',
    'digits' => 'Kolom :attribute harus terdiri dari :digits digit.',
    'digits_between' => 'Kolom :attribute harus terdiri dari :min hingga :max digit.',
    'dimensions' => 'Kolom :attribute memiliki dimensi gambar yang tidak valid.',
    'distinct' => 'Kolom :attribute memiliki nilai yang duplikat.',
    'doesnt_contain' => 'Kolom :attribute tidak boleh mengandung salah satu dari nilai berikut: :values.',
    'doesnt_end_with' => 'Kolom :attribute tidak boleh diakhiri dengan salah satu dari nilai berikut: :values.',
    'doesnt_start_with' => 'Kolom :attribute tidak boleh diawali dengan salah satu dari nilai berikut: :values.',
    'email' => 'Kolom :attribute harus berupa alamat email yang valid.',
    'encoding' => 'Kolom :attribute harus menggunakan pengodean :encoding.',
    'ends_with' => 'Kolom :attribute harus diakhiri dengan salah satu dari nilai berikut: :values.',
    'enum' => 'Pilihan :attribute tidak valid.',
    'exists' => 'Pilihan :attribute tidak valid.',
    'extensions' => 'Kolom :attribute harus memiliki salah satu ekstensi berikut: :values.',
    'file' => 'Kolom :attribute harus berupa file.',
    'filled' => 'Kolom :attribute harus memiliki nilai.',

    'gt' => [
        'array' => 'Kolom :attribute harus memiliki lebih dari :value item.',
        'file' => 'Ukuran file :attribute harus lebih besar dari :value kilobita.',
        'numeric' => 'Nilai :attribute harus lebih besar dari :value.',
        'string' => 'Kolom :attribute harus memiliki lebih dari :value karakter.',
    ],

    'gte' => [
        'array' => 'Kolom :attribute harus memiliki :value item atau lebih.',
        'file' => 'Ukuran file :attribute harus lebih besar dari atau sama dengan :value kilobita.',
        'numeric' => 'Nilai :attribute harus lebih besar dari atau sama dengan :value.',
        'string' => 'Kolom :attribute harus memiliki :value karakter atau lebih.',
    ],

    'hex_color' => 'Kolom :attribute harus berupa kode warna heksadesimal yang valid.',
    'image' => 'Kolom :attribute harus berupa gambar.',
    'in' => 'Pilihan :attribute tidak valid.',
    'in_array' => 'Kolom :attribute harus terdapat dalam :other.',
    'in_array_keys' => 'Kolom :attribute harus memiliki setidaknya salah satu kunci berikut: :values.',
    'integer' => 'Kolom :attribute harus berupa bilangan bulat.',
    'ip' => 'Kolom :attribute harus berupa alamat IP yang valid.',
    'ipv4' => 'Kolom :attribute harus berupa alamat IPv4 yang valid.',
    'ipv6' => 'Kolom :attribute harus berupa alamat IPv6 yang valid.',
    'json' => 'Kolom :attribute harus berupa string JSON yang valid.',
    'list' => 'Kolom :attribute harus berupa daftar.',
    'lowercase' => 'Kolom :attribute harus menggunakan huruf kecil.',

    'lt' => [
        'array' => 'Kolom :attribute harus memiliki kurang dari :value item.',
        'file' => 'Ukuran file :attribute harus kurang dari :value kilobita.',
        'numeric' => 'Nilai :attribute harus kurang dari :value.',
        'string' => 'Kolom :attribute harus memiliki kurang dari :value karakter.',
    ],

    'lte' => [
        'array' => 'Kolom :attribute tidak boleh memiliki lebih dari :value item.',
        'file' => 'Ukuran file :attribute harus kurang dari atau sama dengan :value kilobita.',
        'numeric' => 'Nilai :attribute harus kurang dari atau sama dengan :value.',
        'string' => 'Kolom :attribute harus memiliki :value karakter atau kurang.',
    ],

    'mac_address' => 'Kolom :attribute harus berupa alamat MAC yang valid.',

    'max' => [
        'array' => 'Kolom :attribute tidak boleh memiliki lebih dari :max item.',
        'file' => 'Ukuran file :attribute tidak boleh lebih dari :max kilobita.',
        'numeric' => 'Nilai :attribute tidak boleh lebih dari :max.',
        'string' => 'Kolom :attribute tidak boleh memiliki lebih dari :max karakter.',
    ],

    'max_digits' => 'Kolom :attribute tidak boleh memiliki lebih dari :max digit.',
    'mimes' => 'Kolom :attribute harus berupa file dengan tipe: :values.',
    'mimetypes' => 'Kolom :attribute harus berupa file dengan tipe: :values.',

    'min' => [
        'array' => 'Kolom :attribute harus memiliki setidaknya :min item.',
        'file' => 'Ukuran file :attribute harus setidaknya :min kilobita.',
        'numeric' => 'Nilai :attribute harus setidaknya :min.',
        'string' => 'Kolom :attribute harus memiliki setidaknya :min karakter.',
    ],

    'min_digits' => 'Kolom :attribute harus memiliki setidaknya :min digit.',
    'missing' => 'Kolom :attribute tidak boleh ada.',
    'missing_if' => 'Kolom :attribute tidak boleh ada jika :other bernilai :value.',
    'missing_unless' => 'Kolom :attribute tidak boleh ada kecuali :other bernilai :value.',
    'missing_with' => 'Kolom :attribute tidak boleh ada jika :values tersedia.',
    'missing_with_all' => 'Kolom :attribute tidak boleh ada jika semua :values tersedia.',
    'multiple_of' => 'Kolom :attribute harus merupakan kelipatan dari :value.',
    'not_in' => 'Pilihan :attribute tidak valid.',
    'not_regex' => 'Format kolom :attribute tidak valid.',
    'numeric' => 'Kolom :attribute harus berupa angka.',

    'password' => [
        'letters' => 'Kolom :attribute harus mengandung setidaknya satu huruf.',
        'mixed' => 'Kolom :attribute harus mengandung setidaknya satu huruf besar dan satu huruf kecil.',
        'numbers' => 'Kolom :attribute harus mengandung setidaknya satu angka.',
        'symbols' => 'Kolom :attribute harus mengandung setidaknya satu simbol.',
        'uncompromised' => 'Nilai :attribute telah ditemukan dalam kebocoran data. Silakan gunakan :attribute yang berbeda.',
    ],

    'present' => 'Kolom :attribute harus tersedia.',
    'present_if' => 'Kolom :attribute harus tersedia jika :other bernilai :value.',
    'present_unless' => 'Kolom :attribute harus tersedia kecuali :other bernilai :value.',
    'present_with' => 'Kolom :attribute harus tersedia jika :values tersedia.',
    'present_with_all' => 'Kolom :attribute harus tersedia jika semua :values tersedia.',

    'prohibited' => 'Kolom :attribute tidak diperbolehkan.',
    'prohibited_if' => 'Kolom :attribute tidak diperbolehkan jika :other bernilai :value.',
    'prohibited_if_accepted' => 'Kolom :attribute tidak diperbolehkan jika :other disetujui.',
    'prohibited_if_declined' => 'Kolom :attribute tidak diperbolehkan jika :other ditolak.',
    'prohibited_unless' => 'Kolom :attribute tidak diperbolehkan kecuali :other memiliki salah satu nilai berikut: :values.',
    'prohibits' => 'Kolom :attribute melarang :other untuk tersedia.',

    'regex' => 'Format kolom :attribute tidak valid.',
    'required' => 'Kolom :attribute wajib diisi.',
    'required_array_keys' => 'Kolom :attribute harus memiliki entri untuk: :values.',
    'required_if' => 'Kolom :attribute wajib diisi jika :other bernilai :value.',
    'required_if_accepted' => 'Kolom :attribute wajib diisi jika :other disetujui.',
    'required_if_declined' => 'Kolom :attribute wajib diisi jika :other ditolak.',
    'required_unless' => 'Kolom :attribute wajib diisi kecuali :other memiliki salah satu nilai berikut: :values.',
    'required_with' => 'Kolom :attribute wajib diisi jika :values tersedia.',
    'required_with_all' => 'Kolom :attribute wajib diisi jika semua :values tersedia.',
    'required_without' => 'Kolom :attribute wajib diisi jika :values tidak tersedia.',
    'required_without_all' => 'Kolom :attribute wajib diisi jika tidak ada :values yang tersedia.',

    'same' => 'Kolom :attribute harus sama dengan :other.',

    'size' => [
        'array' => 'Kolom :attribute harus berisi :size item.',
        'file' => 'Ukuran file :attribute harus :size kilobita.',
        'numeric' => 'Nilai :attribute harus :size.',
        'string' => 'Kolom :attribute harus terdiri dari :size karakter.',
    ],

    'starts_with' => 'Kolom :attribute harus diawali dengan salah satu dari nilai berikut: :values.',
    'string' => 'Kolom :attribute harus berupa teks.',
    'timezone' => 'Kolom :attribute harus berupa zona waktu yang valid.',
    'unique' => 'Kolom :attribute sudah digunakan.',
    'uploaded' => 'Kolom :attribute gagal diunggah.',
    'uppercase' => 'Kolom :attribute harus menggunakan huruf kapital.',
    'url' => 'Kolom :attribute harus berupa URL yang valid.',
    'ulid' => 'Kolom :attribute harus berupa ULID yang valid.',
    'uuid' => 'Kolom :attribute harus berupa UUID yang valid.',

    /*
    |--------------------------------------------------------------------------
    | Pesan Validasi Kustom
    |--------------------------------------------------------------------------
    |
    | Di sini Anda dapat menentukan pesan validasi khusus untuk atribut
    | tertentu menggunakan format "attribute.rule". Cara ini memudahkan
    | penentuan pesan khusus untuk aturan validasi tertentu.
    |
    */

    'custom' => [
        'attribute-name' => [
            'rule-name' => 'pesan-kustom',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Atribut Validasi Kustom
    |--------------------------------------------------------------------------
    |
    | Bagian berikut digunakan untuk mengganti placeholder atribut
    | dengan nama yang lebih mudah dipahami pengguna, misalnya
    | "Alamat Email" daripada "email".
    |
    */

    'attributes' => [],

];
