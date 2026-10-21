import Script from "next/script";

import Footer from "@/components/Footer";
import HeaderMiddle from "@/components/HeaderMiddle";
import HeaderBottom from "@/components/HeaderBottom";
import HeaderStart from "@/components/HeaderStart";
import Footermain from "@/components/Footermain";
import Footermobile from "@/components/Mobilefooter";
import Footermain2 from "@/components/Footermain2";
import Footermain3 from "@/components/Footermain3";

export const metadata = {
  title: "Wolmart",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
    <link
          rel="stylesheet"
          href="/assets/css/vendor/fontawesome-free/css/all.min.css"
        />
 <link
          rel="stylesheet"
          href="/assets/css/vendor/animate/animate.min.css"
        />
        <link
          rel="stylesheet"
          href="/css/vendor/magnific-popup/magnific-popup.min.css"
        />

        <link
          rel="stylesheet"
          href="/assets/css/vendor/swiper/swiper-bundle.min.css"
        />

        

        <link
          rel="stylesheet"
          href="/assets/css/demo1.min.css"
        />
      </head>

      <body className="home">
            <div className="page-wrapper">
                <h1 className="d-none">Wolmart - Responsive Marketplace HTML Template</h1>
             <header className="header">
               {/* Header Top */}
                   <HeaderStart />
                    <HeaderMiddle />
                       
                    <HeaderBottom/>
              </header>
                     {children}
                       <Footer/>
              </div>
                       {/* <Footermain/> */}
                   
                       {/* <Footermain2/>  */}
                       <Footermobile/>
                       {/* <Footermain3/> */}
           

      
  
  <Script
  src="/assets/vendor/jquery/jquery.min.js"
  strategy="beforeInteractive"
/>

<Script
  src="/assets/vendor/jquery.plugin/jquery.plugin.min.js"
  strategy="beforeInteractive"
/>

<Script
  src="/assets/vendor/imagesloaded/imagesloaded.pkgd.min.js"
  strategy="beforeInteractive"
/>

<Script
  src="/assets/vendor/zoom/jquery.zoom.js"
  strategy="beforeInteractive"
/>

<Script
  src="/assets/vendor/jquery.countdown/jquery.countdown.min.js"
  strategy="beforeInteractive"
/>

<Script
  src="/assets/vendor/magnific-popup/jquery.magnific-popup.min.js"
  strategy="beforeInteractive"
/>

<Script
  src="/assets/vendor/skrollr/skrollr.min.js"
  strategy="beforeInteractive"
/>

<Script
  src="/assets/vendor/swiper/swiper-bundle.min.js"
  strategy="beforeInteractive"
/>

<Script
  src="/assets/js/main.min.js"
  strategy="beforeInteractive"
/>
      </body>
    </html>
  );
}