import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "LinguaLink",
  description: "Plataforma LinguaLink",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Providers>
          {children}
          <Toaster position="bottom-center" toastOptions={{ removeDelay: 1000 }} />
        </Providers>
      </body>
    </html>
  );
}
