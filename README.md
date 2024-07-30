Table Produk {
  id INT [pk, increment]
  nama_produk VARCHAR(191)
  kategori VARCHAR(50)
  ukuran ENUM('S', 'M', 'L')
  harga FLOAT
  stok INT
  createdAt DATETIME [default: `now()`]
  updatedAt DATETIME
  deletedAt DATETIME
}

Table Transaksi {
  id INT [pk, increment]
  total_harga FLOAT
  tanggal_transaksi DATETIME [default: `now()`]
  customer_id INT
  voucher_code VARCHAR(191)
  voucher_discount FLOAT
  used_reward_points INT
  createdAt DATETIME [default: `now()`]
  updatedAt DATETIME
  deletedAt DATETIME
}

Table DetailTransaksi {
  id INT [pk, increment]
  transaksi_id INT
  produk_id INT
  jumlah INT
  harga_satuan FLOAT
  harga_total FLOAT
  createdAt DATETIME [default: `now()`]
  updatedAt DATETIME
  Indexes {
    (transaksi_id) [name: 'idx_transaksi_id']
    (produk_id) [name: 'idx_produk_id']
  }
}

Table Review {
  id INT [pk, increment]
  rating INT
  review VARCHAR(191)
  user_id INT
  transaksi_id INT
  createdAt DATETIME [default: `now()`]
  updatedAt DATETIME
}

Table Customer {
  id INT [pk, increment]
  nama VARCHAR(191)
  email VARCHAR(191)
  no_telepon VARCHAR(20)
  alamat TEXT
  createdAt DATETIME [default: `now()`]
  updatedAt DATETIME
  deletedAt DATETIME
}

Ref: DetailTransaksi.transaksi_id > Transaksi.id
Ref: DetailTransaksi.produk_id > Produk.id
Ref: Review.transaksi_id > Transaksi.id
