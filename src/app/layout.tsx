import "../../src/index.scss";
import type { Metadata } from "next";
import NoSsr from "@/utils/NoSsr";
import { Outfit, Roboto } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { ToastContainer } from "react-toastify";
import MainProvider from "@/utils/MainProvider";
import { I18nProvider } from "./i18n/i18n-context";
import { detectLanguage } from "./i18n/server";

const outfit = Outfit({
  weight: ["400", "500", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
  variable: "--outfit",
});

const roboto = Roboto({
  weight: ["300", "400", "500", "700", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--roboto",
});

export const metadata: Metadata = {
  title: {
    template: "%s | GeziEkibi Dashboard",
    default: "GeziEkibi Dashboard",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const lng = await detectLanguage();
  return (
    <I18nProvider language={lng}>
      <html lang="en">
        <head>
          <link
            rel="icon"
            href="/assets/images/favicon.png"
            type="image/x-icon"
          />
          <link
            rel="shortcut icon"
            href="/assets/images/favicon.png"
            type="image/x-icon"
          />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin=""
          />
          <script
            async
            src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAjeJEPREBQFvAIqDSZliF0WjQrCld-Mh0"
          ></script>
          <script async type="text/javascript" src="/assets/js/rte.js"></script>
          <script
            async
            type="text/javascript"
            src="/assets/js/plugins/all_plugins.js"
          ></script>
        </head>
        <body
          suppressHydrationWarning={true}
          className={`${outfit.variable} ${roboto.variable}`}
        >
          <NoSsr>
            <MainProvider>
              <NextTopLoader color="#307EF3" showSpinner={false} />
              {children}
            </MainProvider>
            <ToastContainer />
          </NoSsr>
        </body>
      </html>
    </I18nProvider>
  );
}
