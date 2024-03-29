"use client"

import { NextUIProvider } from "@nextui-org/react";
import Homepage from "@/components/homepage";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer"
export default function Home() {
  return (
    <>
      <NextUIProvider>
        <Navbar />
        <Homepage />
        <Footer />
      </NextUIProvider>
    </>

  );
}
