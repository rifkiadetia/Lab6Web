const form = document.getElementById("formWorkshop");
const nama = document.getElementById("nama");
const email = document.getElementById("email");
const sesi = document.getElementById("sesi");
const catatan = document.getElementById("catatan");
const hitung = document.getElementById("hitung");
const pesanSukses = document.getElementById("pesanSukses");
const polaEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function setError(input, idError, teks) {
  document.getElementById(idError).textContent = teks;
  input.closest(".field").classList.toggle("salah", teks !== "");
  return teks === "";
}

function cekNama()  { const v = nama.value.trim();
  return setError(nama, "errNama", v === "" ? "Nama wajib diisi." : v.length < 3 ? "Nama minimal 3 karakter." : ""); }
function cekEmail() { return setError(email, "errEmail", polaEmail.test(email.value.trim()) ? "" : "Masukkan email yang valid."); }
function cekSesi()  { return setError(sesi, "errSesi", sesi.value === "" ? "Pilih salah satu sesi." : ""); }

function perbaruiRingkasan() {
  document.getElementById("rNama").textContent = nama.value.trim() || "-";
  document.getElementById("rEmail").textContent = email.value.trim() || "-";
  document.getElementById("rSesi").textContent = sesi.value || "-";
}

// Fungsi 1: ringkasan langsung (event input)
[nama, email].forEach(el => el.addEventListener("input", perbaruiRingkasan));

// Fungsi 2: penghitung karakter (event input)
catatan.addEventListener("input", () => { hitung.textContent = catatan.value.length; });

// Fungsi 3: event change dropdown (Eksperimen 3)
sesi.addEventListener("change", () => {
  document.getElementById("infoSesi").textContent = sesi.value ? "Sesi dipilih: " + sesi.value : "";
  perbaruiRingkasan();
});

// Fungsi 4: validasi saat submit
form.addEventListener("submit", (event) => {
  event.preventDefault();
  pesanSukses.textContent = "";
  const valid = [cekNama(), cekEmail(), cekSesi()].every(Boolean);
  if (valid) {
    pesanSukses.textContent = "Pendaftaran berhasil! Sampai jumpa di sesi " + sesi.value + ".";
  }
});

// Fungsi 5: tombol reset
document.getElementById("tombolReset").addEventListener("click", () => {
  form.reset();
  ["errNama", "errEmail", "errSesi", "infoSesi", "pesanSukses"].forEach(id => document.getElementById(id).textContent = "");
  document.querySelectorAll(".field.salah").forEach(f => f.classList.remove("salah"));
  hitung.textContent = "0";
  perbaruiRingkasan();
});