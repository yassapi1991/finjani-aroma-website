export const brand = {
  name: "Finjani Aroma",
  whatsappNumber: "212707857924",
  whatsappLabel: "+212 7 07 85 79 24",
  whatsappMessage: "Bonjour, je souhaite commander chez Finjani Aroma.",
  instagram: "https://www.instagram.com/finjani.aroma/",
  facebook: "https://www.facebook.com/profile.php?id=61585757199054",
  tiktok: "https://www.tiktok.com/@finjani.aroma?_r=1&_t=ZG-96RdAw7wTLt",
  email: "Finjani.aroma@gmail.com",
  addressLines: [
    "Immeuble 8, Residence Lilas",
    "27182 Bouskoura, Grand Casablanca",
    "Maroc",
  ],
  mapsUrl: "https://maps.app.goo.gl/JWFnG5Uj2hGMMxsz7?g_st=ic",
  wazeUrl: "https://waze.com/ul/hevfw3unue",
} as const;

export function getWhatsAppUrl(message: string = brand.whatsappMessage) {
  return `https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
