"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard/investment", label: "Explorar Lotes", icon: "grid" },
  { href: "/dashboard/my-farm", label: "Mi Finca", icon: "wallet" },
  { href: "#", label: "Liquidaciones", icon: "trend" },
  { href: "#", label: "Analítica Pecuaria", icon: "chart" },
  { href: "#", label: "Billetera Soroban", icon: "wallet" },
];

function Icon({ name }: { name: string }) {
  const paths: Record<string, string> = {
    grid: "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z",
    wallet: "M4 7h16v12H4zM16 12h4M7 7V5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v2",
    chart: "M4 19V5M4 19h16M7 15l3-4 3 2 4-6",
    trend: "M4 16l5-5 3 3 7-8M15 6h4v4",
    logout: "M10 5H5v14h5M14 8l4 4-4 4M9 12h9",
    bell: "M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4",
  };

  return <svg aria-hidden="true" className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={paths[name]} /></svg>;
}

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <main className="dashboard">
      <aside className="sidebar">
        <div className="brand"><Image src="/hatofi-logo.png" alt="HatoFi" width={102} height={39} priority className="logo-image" /><span>Inversionista</span></div>
        <nav className="navigation" aria-label="Navegación">
          {navItems.map((item) => item.href === "#" ? (
            <button className="nav-item" key={item.label} type="button" disabled><Icon name={item.icon} />{item.label}</button>
          ) : (
            <Link className={`nav-item ${pathname === item.href ? "active" : ""}`} href={item.href} key={item.label}><Icon name={item.icon} />{item.label}</Link>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div className="network"><i /> Stellar Mainnet <b>Online</b></div>
          <div className="account"><div className="account-icon">◈</div><div><span>Cuenta Soroban</span><strong>0x8F2d...c3Ea</strong></div><Icon name="logout" /></div>
        </div>
      </aside>
      <section className="workspace">
        <header className="topbar">
          <div className="platform">Plataforma de Inversión Pecuaria RWA</div>
          <div className="header-actions"><span className="price">⌁ Precio Kilo Pie: <b>$8,950 COP</b> <small>(~$2.28 USD)</small></span><span className="cash">▣ $14,250.00 USDC</span><button aria-label="Notificaciones" type="button"><Icon name="bell" /></button><button className="profile" aria-label="Perfil" type="button">H</button></div>
        </header>
        {children}
      </section>
    </main>
  );
}
