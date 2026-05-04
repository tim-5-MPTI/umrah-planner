export interface Airport {
  code: string
  name: string
  city: string
  province: string
}

export const INDONESIAN_AIRPORTS: Airport[] = [
  { code: 'CGK', name: 'Soekarno-Hatta International Airport', city: 'Jakarta', province: 'Banten' },
  { code: 'SUB', name: 'Juanda International Airport', city: 'Surabaya', province: 'Jawa Timur' },
  { code: 'UPG', name: 'Sultan Hasanuddin International Airport', city: 'Makassar', province: 'Sulawesi Selatan' },
  { code: 'BPN', name: 'Sultan Aji Muhammad Sulaiman Airport', city: 'Balikpapan', province: 'Kalimantan Timur' },
  { code: 'MDC', name: 'Sam Ratulangi International Airport', city: 'Manado', province: 'Sulawesi Utara' },
  { code: 'PLM', name: 'Sultan Mahmud Badaruddin II Airport', city: 'Palembang', province: 'Sumatera Selatan' },
  { code: 'KNO', name: 'Kualanamu International Airport', city: 'Medan', province: 'Sumatera Utara' },
  { code: 'BDJ', name: 'Syamsudin Noor International Airport', city: 'Banjarmasin', province: 'Kalimantan Selatan' },
  { code: 'LOP', name: 'Lombok International Airport', city: 'Lombok', province: 'NTB' },
  { code: 'SOC', name: 'Adisumarmo International Airport', city: 'Solo', province: 'Jawa Tengah' },
  { code: 'JOG', name: 'Yogyakarta International Airport', city: 'Yogyakarta', province: 'DIY' },
  { code: 'SRG', name: 'Ahmad Yani International Airport', city: 'Semarang', province: 'Jawa Tengah' },
]

export const SAUDI_AIRPORTS = [
  { code: 'JED', name: 'King Abdulaziz International Airport', city: 'Jeddah' },
  { code: 'MED', name: 'Prince Mohammad bin Abdulaziz Airport', city: 'Madinah' },
]

export const getAirportByCode = (code: string): Airport | undefined => {
  return INDONESIAN_AIRPORTS.find(a => a.code === code)
}