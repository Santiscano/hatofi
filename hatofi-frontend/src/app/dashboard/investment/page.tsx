"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const lots = [
  { id: "rsr", code: "Lote #RSR-104", name: "Hacienda Santa Rosalía", place: "Montería, Córdoba", apy: "15.2%", breed: "Brahman Rojo", term: "8 Meses", cattle: "50 Novillos", raised: "$41,000 USDC", target: "$50,000 USDC", progress: 82, image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=900&q=80" },
  { id: "mirador", code: "Lote #MFM-088", name: "Finca El Mirador", place: "Armenia, Quindío", apy: "14.8%", breed: "Brangus", term: "10 Meses", cattle: "65 Novillos", raised: "$32,000 USDC", target: "$50,000 USDC", progress: 64, image: "https://images.unsplash.com/photo-1551884831-bbf3cdc6469e?auto=format&fit=crop&w=900&q=80" },
  { id: "benito", code: "Lote #SB-202", name: "Hacienda San Benito", place: "Puerto López, Meta", apy: "16.0%", breed: "Exportación", term: "6 Meses", cattle: "70 Reses", raised: "$76,000 USDC", target: "$80,000 USDC", progress: 95, image: "https://images.unsplash.com/photo-1527153857715-3908f4a2f83b?auto=format&fit=crop&w=900&q=80" },
];

function Icon({ name }: { name: string }) {
  const paths: Record<string, string> = { arrow: "M5 12h14M13 6l6 6-6 6", trend: "M4 16l5-5 3 3 7-8M15 6h4v4", download: "M12 4v11M8 11l4 4 4-4M5 20h14" };
  return <svg aria-hidden="true" className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={paths[name]} /></svg>;
}

export default function InvestmentPage() {
  const [notice, setNotice] = useState("");

  return <div className="page">
    <div className="crumbs"><span>Mercado Soroban v2.1</span><small>Garantías Prendarias RWA</small></div>
    <section className="hero"><div><h1>Mercado Primario de<br />Inversión Pecuaria</h1><p>Financia lotes certificados de terneros de ceba con<br className="desktop" /> garantías prendarias verificadas por ICA y contratos<br className="desktop" /> inteligentes Stellar Soroban.</p></div><div className="hero-buttons"><Link className="secondary" href="/dashboard/my-farm">Ir a Mi Finca</Link><button className="primary" type="button"><Icon name="trend" /> Simular Inversión RWA</button></div></section>
    <Metrics />
    <section className="lots-section"><div className="section-header"><div><h2>Lotes Disponibles para Financiación</h2><p>Originaciones abiertas para sindicación en bóvedas de custodia rural.</p></div><div className="tabs"><button className="selected" type="button">Todos los Lotes</button><button type="button">Ceba Intensiva</button><button type="button">Cría & Levante</button><button type="button">Certificados ICA</button></div></div><div className="lot-grid">{lots.map((lot) => <article className="lot-card" key={lot.id}><div className="lot-image"><Image src={lot.image} alt="" fill sizes="(max-width: 800px) 100vw, 30vw" /><span>{lot.code}</span><b>{lot.apy} APY</b><div className="lot-overlay"><strong>{lot.name}</strong><small>◉ {lot.place}</small></div></div><div className="lot-details"><div><span>Raza<strong>{lot.breed}</strong></span><span>Plazo<strong>{lot.term}</strong></span><span>Población<strong>{lot.cattle}</strong></span></div><div className="funding-line"><span>Recaudado: {lot.raised}</span><b>{lot.progress}%</b><div><i style={{ width: `${lot.progress}%` }} /></div><small>Meta: {lot.target}<em>Min. $100 USDC</em></small></div><button className="invest" type="button" onClick={() => setNotice(`Ahora puedes simular tu inversión en ${lot.name}.`)}>Invertir en este Lote <Icon name="arrow" /></button></div></article>)}</div>{notice && <p className="notice" role="status">{notice} <button type="button" onClick={() => setNotice("")}>×</button></p>}</section>
  </div>;
}

function Metrics() {
  return <section className="metrics"><article><div className="metric-head">Total Invertido <b>＄</b></div><strong>$32,500.00 <small>USDC</small></strong><span className="metric-positive">⌁ +12.4% este trimestre</span><div className="sparkline">╱╲╱╲╱</div></article><article><div className="metric-head">Rendimiento Promedio <b className="green-icon">%</b></div><strong className="green-text">14.2% <small>APY Real</small></strong><span className="metric-positive">● Indexado a biomasa de carne en pie</span></article><article><div className="metric-head">Dividendos Disponibles <b>▣</b></div><strong>$1,850.50 <small>USDC</small></strong><button className="claim" type="button">↙ Reclamar Dividendos</button></article><article><div className="metric-head">Bovinos en Monitoreo <b>⌁</b></div><strong>185 <small>Cabezas activas</small></strong><span className="metric-positive">◉ 3 Lotes activos con aretes RFID ICA</span></article></section>;
}
