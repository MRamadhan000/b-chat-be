# B-Chat

B-Chat adalah aplikasi web untuk chat real-time yang dibangun menggunakan NestJS, PostgreSQL, dan JWT authentication. Aplikasi ini memungkinkan pengguna untuk mendaftar, login, mengelola teman, dan berinteraksi dalam sistem chat.

## Fitur Utama

- **Autentikasi Pengguna**: Registrasi dan login dengan JWT token.
- **Manajemen Teman**: Kirim permintaan pertemanan, terima/tolak, dan lihat daftar teman.
- **Sistem Chat**: (Dalam pengembangan) Chat real-time antar teman.
- **Database**: PostgreSQL dengan TypeORM untuk ORM.

## Teknologi yang Digunakan

- **Backend**: NestJS (Node.js framework)
- **Database**: PostgreSQL
- **Authentication**: JWT dengan Passport.js
- **ORM**: TypeORM
- **Containerization**: Docker & Docker Compose

## Prerequisites

- Node.js (versi 18 atau lebih baru)
- Docker & Docker Compose
- npm atau yarn

## Instalasi

1. Clone repository ini:
   ```bash
   git clone <ttps://github.com/MRamadhan000/b-chat-be.git>
   cd b-chat-be
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Setup environment variables:
   - Copy `.env.example` ke `.env`
   - Isi variabel yang diperlukan (database URL, JWT secret, dll.)

## Cara Menjalankan

1. Jalankan database PostgreSQL menggunakan Docker Compose:
   ```bash
   sudo docker-compose up -d
   ```
   Ini akan menjalankan container PostgreSQL di port 5434.

2. Jalankan aplikasi dalam mode development:
   ```bash
   npm run start:dev
   ```
   Aplikasi akan berjalan di `http://localhost:3001`.

## Contributing

1. Fork repository
2. Buat branch fitur baru
3. Commit perubahan
4. Push ke branch
5. Buat Pull Request