# Employee Management Project

Proyek ini adalah aplikasi manajemen karyawan yang dibangun dengan Angular. Aplikasi ini mencakup fitur untuk login, melihat daftar karyawan, menambahkan karyawan baru, mengedit karyawan yang ada, dan melihat detail karyawan. Aplikasi ini juga menampilkan desain web responsif dan menggunakan Tailwind CSS untuk styling.

## Fitur

- **Halaman Login**: Memungkinkan pengguna untuk login dengan username dan password.
- **Halaman Daftar Karyawan**: Menampilkan daftar karyawan dengan paginasi, serta opsi untuk mencari, mengurutkan, menambahkan, mengedit, dan menghapus karyawan.
- **Halaman Tambah Karyawan**: Formulir untuk menambahkan karyawan baru dengan validasi.
- **Halaman Edit Karyawan**: Formulir untuk mengedit detail karyawan yang ada dengan validasi.
- **Halaman Detail Karyawan**: Menampilkan informasi detail tentang seorang karyawan.
- **Guard**: Memastikan bahwa hanya pengguna yang sudah login yang dapat mengakses halaman tertentu.

## Prasyarat

- Node.js (versi 14.x atau lebih baru)
- Angular CLI (versi 12.x atau lebih baru)
- JSON Server

## Memulai

### 1. Clone repositori

```bash
git clone https://github.com/Rafif-Agdyaputra/employee-management.git
cd employee-management
```

### 2. Instalasi node modules
```bash
npm install
```
### 3. Menjalankan data json
Install package json-serve secara global.
```bash
npm install -g json-server
json-server --watch db.json --port 3000
```
### 4. Menjalankan aplikasi
```bash
ng serve
```
