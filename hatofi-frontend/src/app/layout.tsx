import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#063B32",
};

export const metadata: Metadata = {
  title: "HatoFi | Plataforma Ganadera RWA",
  description: "Financia lotes certificados de terneros de ceba con garantías prendarias verificadas por ICA y liquidación autónoma en Stellar Soroban.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "HatoFi",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es">
      <body className="antialiased overflow-x-hidden selection:bg-[#5BCB35] selection:text-white">
        {children}
      </body>
    </html>
  );
}
