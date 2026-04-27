"use client"

import "./globals.css"
import { useState } from "react"
import Link from "next/link"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)

const links = [
  { name: "Dashboard", href: "/control" },
  { name: "Jobs", href: "/control?tab=new" },
  { name: "Applied", href: "/control?tab=applied" },
  { name: "Outreach", href: "/control?tab=crm" },

  // 🔥 Tools
  { name: "n8n", href: "/n8n" },
  { name: "Retool", href: "/retool" },

  // 🔥 Pages
  { name: "Hire Me", href: "/hire/google" },
]

  return (
    <html lang="en">
      <body className="bg-gradient-to-b from-slate-900 to-black text-white">

        {/* 🔝 TOPBAR */}
        <div className="hidden md:flex justify-between items-center px-10 py-4 border-b border-white/10">
          <h1 className="text-xl font-bold">🚀 Career OS</h1>

          <div className="flex gap-6">
            {links.map((link) => (
              <a key={link.name} href={link.href}>
                <span className="hover:text-blue-400 cursor-pointer">
                  {link.name}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* 📱 MOBILE TOPBAR */}
        <div className="md:hidden flex justify-between p-4 border-b border-white/10">
          <button onClick={() => setOpen(true)}>☰</button>
          <h1>Career OS</h1>
        </div>

        {/* 📱 SIDEBAR */}
        {open && (
          <div className="fixed inset-0 bg-black/80 z-50">
            <div className="w-64 bg-slate-900 h-full p-6">
              <button
                onClick={() => setOpen(false)}
                className="mb-4"
              >
                ✖ Close
              </button>

              {links.map((link) => (
                <Link key={link.name} href={link.href}>
                  <p
                    onClick={() => setOpen(false)}
                    className="py-3 border-b border-white/10"
                  >
                    {link.name}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* 📦 PAGE CONTENT */}
        <main className="p-6 md:p-10">{children}</main>
      </body>
    </html>
  )
}
