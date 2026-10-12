"use client";

import Image from "next/image";
import { useState } from "react";

interface Bovine {
  id: string;
  tag: string;
  rfid: string;
  breed: string;
  stage: string;
  initialWeight: number;
  currentWeight: number;
  gainNet: number;
  gainBiweekly: number;
  health: string;
}

const initialCattle: Bovine[] = [
  {
    id: "01",
    tag: "#ICA-001",
    rfid: "982.000.412.981",
    breed: "Brahman x Angus",
    stage: "24 meses • Mes 8 de 10",
    initialWeight: 210,
    currentWeight: 486.4,
    gainNet: 276.4,
    gainBiweekly: 14.2,
    health: "Vacunado / Óptimo",
  },
  {
    id: "02",
    tag: "#ICA-002",
    rfid: "982.000.412.982",
    breed: "Nelore Comercial",
    stage: "23 meses • Mes 8 de 10",
    initialWeight: 205,
    currentWeight: 478.0,
    gainNet: 273.0,
    gainBiweekly: 12.8,
    health: "Vacunado / Óptimo",
  },
  {
    id: "03",
    tag: "#ICA-003",
    rfid: "982.000.412.983",
    breed: "Brahman Puro",
    stage: "25 meses • Mes 8 de 10",
    initialWeight: 220,
    currentWeight: 492.5,
    gainNet: 272.5,
    gainBiweekly: 15.5,
    health: "Vacunado / Óptimo",
  },
  {
    id: "04",
    tag: "#ICA-004",
    rfid: "982.000.412.984",
    breed: "Brangus Colorado",
    stage: "24 meses • Mes 8 de 10",
    initialWeight: 215,
    currentWeight: 489.1,
    gainNet: 274.1,
    gainBiweekly: 13.6,
    health: "Vacunado / Óptimo",
  },
];

export default function MyFarmPage() {
  const [cattleList, setCattleList] = useState<Bovine[]>(initialCattle);
  const [selectedFilter, setSelectedFilter] = useState<"all" | "optimal" | "review">("all");
  const [weightModalOpen, setWeightModalOpen] = useState(false);
  const [selectedBovine, setSelectedBovine] = useState<Bovine | null>(null);
  const [newWeightInput, setNewWeightInput] = useState<string>("");
  const [toastMessage, setToastMessage] = useState<string>("");
  const [newBatchModalOpen, setNewBatchModalOpen] = useState(false);
  const [addBovineModalOpen, setAddBovineModalOpen] = useState(false);
  const [newTag, setNewTag] = useState("#ICA-005");
  const [newBreed, setNewBreed] = useState("Brahman x Simmental");
  const [newWeight, setNewWeight] = useState("225");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 4000);
  };

  const filteredCattle = cattleList.filter((b) => {
    if (selectedFilter === "optimal") return b.currentWeight >= 480;
    if (selectedFilter === "review") return b.currentWeight < 480;
    return true;
  });

  const handleOpenWeightModal = (bovine: Bovine) => {
    setSelectedBovine(bovine);
    setNewWeightInput((bovine.currentWeight + 2.5).toFixed(1));
    setWeightModalOpen(true);
  };

  const handleSaveWeight = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBovine) return;
    const val = parseFloat(newWeightInput);
    if (isNaN(val) || val <= 0) return;

    setCattleList((prev) =>
      prev.map((b) => {
        if (b.id === selectedBovine.id) {
          const diff = val - b.currentWeight;
          return {
            ...b,
            currentWeight: val,
            gainNet: parseFloat((b.gainNet + diff).toFixed(1)),
            gainBiweekly: parseFloat((b.gainBiweekly + diff).toFixed(1)),
          };
        }
        return b;
      })
    );

    setWeightModalOpen(false);
    showToast(`✓ Pesaje telemétrico registrado para ${selectedBovine.tag}: ${val} kg.`);
  };

  const handleAddBovine = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(newWeight) || 220;
    const newBovine: Bovine = {
      id: String(cattleList.length + 1).padStart(2, "0"),
      tag: newTag,
      rfid: `982.000.412.98${cattleList.length + 5}`,
      breed: newBreed,
      stage: "22 meses • Mes 1 de 10",
      initialWeight: w,
      currentWeight: w,
      gainNet: 0,
      gainBiweekly: 0,
      health: "Vacunado / Óptimo",
    };
    setCattleList([...cattleList, newBovine]);
    setAddBovineModalOpen(false);
    showToast(`✓ Bovino ${newTag} incorporado con arete RFID a la manga.`);
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      
      {/* Toast Notificación */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#006244] text-white px-5 py-3 rounded-xl shadow-xl text-xs font-bold flex items-center gap-3 animate-fade-in border border-[#10B981]">
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage("")} className="text-white hover:text-emerald-200 cursor-pointer">
            ✕
          </button>
        </div>
      )}

      {/* Top Breadcrumb & Metadata Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-col gap-1.5 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F3EE] text-[#006244] text-xs font-bold w-fit border border-[#CCE3D8]">
            <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
            <span>Certificado ICA #84920-CO • Ganadería Sostenible Silvopastoril</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0D1F1B] tracking-tight">
            Gestión Operativa de Hacienda La Palmira
          </h1>
          <p className="text-xs sm:text-sm text-[#5D6B66] leading-relaxed">
            Monitoreo biológico de terneros de ceba, sincronización telemétrica de báscula IoT y liquidación de ganancias por biomasa generada en Montería, Córdoba.
          </p>
        </div>

        {/* Quick Actions Header */}
        <div className="flex flex-wrap items-center gap-2.5 self-start lg:self-center shrink-0">
          <button
            type="button"
            onClick={() => showToast("Descargando Certificado Oficial ICA SIGMA en PDF...")}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#D5DDD8] text-[#24332D] hover:bg-[#F4F7F5] transition-all shadow-sm text-xs font-bold cursor-pointer"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#006244]">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" />
            </svg>
            <span>Descargar Certificado ICA</span>
          </button>

          <button
            type="button"
            onClick={() => setNewBatchModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#063B32] hover:bg-[#042822] text-white transition-all shadow-sm text-xs font-bold cursor-pointer"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" x2="12" y1="5" y2="19" /><line x1="5" x2="19" y1="12" y2="12" />
            </svg>
            <span>Solicitar Nuevo Lote de Ceba</span>
          </button>
        </div>
      </div>

      {/* Bento KPI Row (4 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Ganancias por Liquidar */}
        <div className="p-5 rounded-2xl bg-white border border-[#E2E8E5] shadow-sm flex flex-col justify-between min-h-[180px]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#62736C]">Ganancias por Liquidar</span>
            <div className="w-8 h-8 rounded-lg bg-[#E8F3EE] flex items-center justify-center text-[#006244]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" x2="12" y1="2" y2="22" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
          </div>
          <div className="my-2">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#0D1F1B] tracking-tight">
              $13,685.00 <span className="text-xs font-medium text-gray-500">USD</span>
            </div>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-[#059669] font-bold">
              <span>▲</span>
              <span>+$1.15 USD / kg ganado en ceba</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => showToast("Iniciando solicitud de transferencia bancaria ACH en Colombia...")}
            className="w-full mt-auto py-2 px-3 bg-[#E8F3EE] hover:bg-[#D4E8DE] text-[#006244] text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Solicitar Transferencia Bancaria</span>
          </button>
        </div>

        {/* Card 2: GDP */}
        <div className="p-5 rounded-2xl bg-white border border-[#E2E8E5] shadow-sm flex flex-col justify-between min-h-[180px]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#62736C]">Ganancia Diaria Promedio (GDP)</span>
            <div className="w-8 h-8 rounded-lg bg-[#E8F3EE] flex items-center justify-center text-[#006244]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                <polyline points="16 7 22 7 22 13" />
              </svg>
            </div>
          </div>
          <div className="my-2">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#006244] tracking-tight">+780 g</span>
              <span className="text-xs text-gray-500">/ día</span>
            </div>
            <div className="inline-flex items-center gap-1 mt-1 text-[11px] font-bold text-[#059669]">
              <span>●</span>
              <span>Meta superada (+80 g/día)</span>
            </div>
          </div>
          <div className="h-8 w-full mt-auto">
            <svg className="w-full h-8 text-[#10B981]" fill="none" viewBox="0 0 160 32">
              <path d="M0 24 Q 25 22, 50 17 T 100 12 T 135 7 L 160 3" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5" />
              <path d="M0 24 Q 25 22, 50 17 T 100 12 T 135 7 L 160 3 L 160 32 L 0 32 Z" fill="currentColor" fillOpacity="0.08" />
              <circle cx="160" cy="3" fill="currentColor" r="3.5" />
            </svg>
          </div>
        </div>

        {/* Card 3: Bovinos en Pastoreo Activo */}
        <div className="p-5 rounded-2xl bg-white border border-[#E2E8E5] shadow-sm flex flex-col justify-between min-h-[180px]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#62736C]">Bovinos en Pastoreo Activo</span>
            <div className="w-8 h-8 rounded-lg bg-[#E8F3EE] flex items-center justify-center text-[#006244]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
          </div>
          <div className="my-2">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#0D1F1B] tracking-tight">
              105 <span className="text-xs font-medium text-gray-500">Cabezas</span>
            </div>
            <span className="text-xs text-gray-500 mt-1 block">Lote #04 • 100% Aretes RFID sincronizados</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#059669] font-bold mt-auto">
            <span>✓</span>
            <span>100% Trazabilidad Activa</span>
          </div>
        </div>

        {/* Card 4: Biomasa Total Acumulada */}
        <div className="p-5 rounded-2xl bg-white border border-[#E2E8E5] shadow-sm flex flex-col justify-between min-h-[180px]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#62736C]">Biomasa Total Acumulada</span>
            <div className="w-8 h-8 rounded-lg bg-[#E8F3EE] flex items-center justify-center text-[#006244]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
                <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
                <path d="M7 21h10M12 3v18M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
              </svg>
            </div>
          </div>
          <div className="my-2">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#0D1F1B] tracking-tight">
              31,840 <span className="text-xs font-medium text-gray-500">kg de carne</span>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Entrada: 210 kg → Actual: 486.4 kg
            </div>
          </div>
          <div className="flex items-center justify-between text-xs text-[#62736C] font-semibold mt-auto">
            <span>Ganancia ponderada</span>
            <span className="text-[#059669] font-bold">+131.6%</span>
          </div>
        </div>
      </div>

      {/* Main Dual-Column Section (8 cols / 4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: 8 cols (Inventario y Monitoreo de Bovinos) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-[#E2E8E5] shadow-sm p-6 flex flex-col gap-5">
          
          {/* Header de la Tabla con Filtros */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EEF2F0]">
            <div>
              <h2 className="text-base font-extrabold text-[#0D1F1B]">
                Inventario y Monitoreo de Bovinos en Lote
              </h2>
              <span className="text-xs text-gray-500 mt-0.5 block">
                Trazabilidad biométrica individual con arete oficial ICA y control de pesaje
              </span>
            </div>

            {/* Tabs de Filtro */}
            <div className="inline-flex p-1 rounded-xl bg-[#F0F4F2] text-xs font-bold shrink-0 gap-1 text-[#62736C]">
              <button
                type="button"
                onClick={() => setSelectedFilter("all")}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  selectedFilter === "all" ? "bg-white text-[#006244] shadow-sm" : "hover:text-[#0D1F1B]"
                }`}
              >
                Todos ({cattleList.length})
              </button>
              <button
                type="button"
                onClick={() => setSelectedFilter("optimal")}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  selectedFilter === "optimal" ? "bg-white text-[#006244] shadow-sm" : "hover:text-[#0D1F1B]"
                }`}
              >
                Óptimo (≥480kg)
              </button>
              <button
                type="button"
                onClick={() => setSelectedFilter("review")}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  selectedFilter === "review" ? "bg-white text-[#006244] shadow-sm" : "hover:text-[#0D1F1B]"
                }`}
              >
                Revisión (&lt;480kg)
              </button>
            </div>
          </div>

          {/* Tabla Responsive de Bovinos */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[#EEF2F0] text-gray-500 font-bold">
                  <th className="py-3 px-2">Bovino / Arete</th>
                  <th className="py-3 px-2">Raza & Etapa</th>
                  <th className="py-3 px-2">Peso Inicial → Actual</th>
                  <th className="py-3 px-2">Ganancia Quincenal</th>
                  <th className="py-3 px-2">Sanidad</th>
                  <th className="py-3 px-2 text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EEF2F0]">
                {filteredCattle.map((b) => (
                  <tr key={b.id} className="hover:bg-[#F9FBFA] transition-colors">
                    <td className="py-3.5 px-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-[#E8F3EE] flex items-center justify-center text-[#006244] font-bold text-xs shrink-0">
                          {b.id}
                        </div>
                        <div>
                          <div className="font-extrabold text-[#0D1F1B]">{b.tag}</div>
                          <div className="text-[10px] text-gray-400 font-mono">RFID: {b.rfid}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-2">
                      <div className="font-bold text-[#0D1F1B]">{b.breed}</div>
                      <div className="text-[11px] text-gray-500">{b.stage}</div>
                    </td>

                    <td className="py-3.5 px-2">
                      <div className="font-bold text-[#0D1F1B]">
                        {b.initialWeight} kg → <span className="text-[#006244] font-extrabold">{b.currentWeight} kg</span>
                      </div>
                      <div className="text-[11px] text-[#059669] font-semibold">+{b.gainNet} kg netos</div>
                    </td>

                    <td className="py-3.5 px-2">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#E8F5E9] text-[#006244] font-bold text-[11px]">
                        ▲ +{b.gainBiweekly} kg
                      </span>
                    </td>

                    <td className="py-3.5 px-2">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#E0F2FE] text-[#0369A1] font-semibold text-[11px]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7]"></span>
                        {b.health}
                      </span>
                    </td>

                    <td className="py-3.5 px-2 text-right">
                      <button
                        type="button"
                        onClick={() => handleOpenWeightModal(b)}
                        className="px-3 py-1.5 rounded-lg bg-[#063B32] hover:bg-[#042822] text-white font-bold text-xs transition-colors cursor-pointer"
                      >
                        Registrar Pesaje
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="pt-3 border-t border-[#EEF2F0] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-gray-500">
            <span>Mostrando {filteredCattle.length} de {cattleList.length} bovinos auditados en finca</span>
            <button
              type="button"
              onClick={() => setAddBovineModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F0F4F2] hover:bg-[#E2E8E5] text-[#006244] font-bold transition-colors cursor-pointer"
            >
              <span>+ Agregar Bovino a la Manga</span>
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: 4 cols (Báscula IoT & Ficha del Predio) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Card A: Báscula IoT en Manga */}
          <div className="p-6 rounded-2xl bg-white border border-[#E2E8E5] shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#006244]">
                  <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
                  <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
                  <path d="M7 21h10M12 3v18M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
                </svg>
                <h3 className="font-extrabold text-sm text-[#0D1F1B]">Báscula IoT en Manga</h3>
              </div>
              <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#D1FAE5] text-[#065F46] text-[11px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse"></span>
                <span>En Línea</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#F0F4F2] flex flex-col gap-1">
              <div className="flex items-center justify-between text-xs text-gray-500 font-semibold">
                <span>Última lectura en compuerta:</span>
                <span className="text-[#006244] font-bold">Arete #ICA-001</span>
              </div>
              <div className="flex items-baseline gap-1 my-1">
                <span className="text-3xl sm:text-4xl font-extrabold text-[#006244] tracking-tight">486.4</span>
                <span className="text-sm font-bold text-gray-500">kg</span>
              </div>
              <span className="text-[11px] text-gray-500">
                Captura automática con sensor RFID de pesaje
              </span>
            </div>

            {/* Progress to auction goal */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-gray-700">97% de meta alcanzada</span>
                <span className="text-gray-400">Meta: 500 kg</span>
              </div>
              <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-emerald-400 to-[#006244] rounded-full" style={{ width: "97%" }}></div>
              </div>
              <span className="text-[11px] text-[#059669] font-semibold block">
                Faltan ~13.6 kg (~17 días de ceba para remate)
              </span>
            </div>

            <button
              type="button"
              onClick={() => showToast("Sincronizando báscula de manga con oráculo Chainlink en Stellar...")}
              className="w-full py-2.5 px-4 rounded-xl bg-[#063B32] hover:bg-[#042822] text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12.55a11 11 0 0 1 14.08 0" />
                <path d="M1.42 9a16 16 0 0 1 21.16 0" />
                <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
                <line x1="12" y1="20" x2="12.01" y2="20" />
              </svg>
              <span>Sincronizar Nuevo Pesaje en Manga</span>
            </button>
          </div>

          {/* Card B: Ficha del Predio */}
          <div className="p-6 rounded-2xl bg-white border border-[#E2E8E5] shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-sm text-[#0D1F1B]">Ficha del Predio</h3>
              <span className="px-2.5 py-0.5 rounded-full bg-[#E8F3EE] text-[#006244] text-[11px] font-bold border border-[#CCE3D8]">
                Silvopastoril
              </span>
            </div>

            <div className="w-full h-36 rounded-xl overflow-hidden relative shadow-sm">
              <Image
                src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=600&q=80"
                alt="Hacienda La Palmira"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                <span className="text-white text-xs font-bold flex items-center gap-1.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#8DF0B2]">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>Montería, Córdoba • Vereda El Ceibal</span>
                </span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-500">Extensión efectiva</span>
                <span className="font-bold text-gray-900">450 Hectáreas (Rotacional)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-500">Captura de Carbono</span>
                <span className="font-bold text-[#059669]">+142 tCO2eq / año</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-gray-500">Auditoría Satelital</span>
                <span className="font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full text-[11px]">
                  0% Deforestación
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Module: Liquidación Final de Lote #04 */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#063B32] text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col gap-6">
          
          {/* Header row of the banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#166353]">
            <div className="flex flex-col gap-1.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0A4D40] text-[#8DF0B2] text-[11px] font-bold w-fit border border-[#166353]">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#8DF0B2]">
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <span>Bóveda Fiduciaria de Liquidación • Smart Contract Stellar Soroban</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Liquidación Final de Lote #04 — Venta en Subasta
              </h2>
            </div>

            <div className="text-left sm:text-right shrink-0">
              <span className="text-[11px] text-[#8DF0B2] font-bold uppercase tracking-wider block">Monto Neto a Liquidar</span>
              <div className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                $13,685.00 <span className="text-sm font-semibold text-[#8DF0B2]">USD</span>
              </div>
              <span className="text-[11px] text-[#B5D5C8]">≈ $54,800,000 COP al cambio preferencial RWA</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs text-[#B5D5C8] leading-relaxed max-w-3xl">
            Fondos liberados por contrato inteligente tras confirmación de peso de salida en báscula de subasta aliada. Sin comisiones de intermediarios tradicionales.
          </p>

          {/* Bottom Row: Metrics aligned directly with the Action Button */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch pt-2">
            <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/5 flex flex-col justify-center">
              <span className="text-[10px] text-[#8DF0B2] uppercase font-bold block mb-0.5">Kilos Netos Ganados</span>
              <span className="text-base font-extrabold text-white">11,900 kg</span>
            </div>

            <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/5 flex flex-col justify-center">
              <span className="text-[10px] text-[#8DF0B2] uppercase font-bold block mb-0.5">Grado de Canal</span>
              <span className="text-base font-extrabold text-white">Select+ Premium</span>
            </div>

            <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/5 flex flex-col justify-center">
              <span className="text-[10px] text-[#8DF0B2] uppercase font-bold block mb-0.5">Bono Silvopastoril</span>
              <span className="text-base font-extrabold text-[#5BCB35]">+4.5% Adicional</span>
            </div>

            <button
              type="button"
              onClick={() => showToast("Solicitud de transferencia bancaria directa (ACH) enviada con éxito.")}
              className="py-3 px-4 rounded-xl bg-[#5BCB35] hover:bg-[#4ebd28] active:bg-[#42a820] text-[#063B32] font-black text-xs sm:text-sm transition-all shadow-[0_4px_16px_rgba(91,203,53,0.35)] flex items-center justify-center gap-2 cursor-pointer border border-[#8DF0B2]/40"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#063B32]">
                <line x1="12" x2="12" y1="2" y2="22" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
              <span>Solicitar Transferencia Bancaria</span>
            </button>
          </div>
        </div>
      </div>

      {/* MODAL REGISTRAR PESAJE */}
      {weightModalOpen && selectedBovine && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-200">
            <h3 className="text-base font-extrabold text-[#0D1F1B] mb-1">
              Registrar Pesaje Telemétrico
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              Bovino: <strong className="text-[#006244]">{selectedBovine.tag}</strong> ({selectedBovine.breed})
            </p>

            <form onSubmit={handleSaveWeight} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Nuevo Peso en Báscula (Kg)
                </label>
                <input
                  type="number"
                  step="0.1"
                  required
                  value={newWeightInput}
                  onChange={(e) => setNewWeightInput(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-300 text-sm font-bold text-gray-900 focus:outline-none focus:border-[#006244]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setWeightModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-100 rounded-xl cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-[#063B32] hover:bg-[#042822] rounded-xl cursor-pointer"
                >
                  Guardar Pesaje
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL AGREGAR BOVINO */}
      {addBovineModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-200">
            <h3 className="text-base font-extrabold text-[#0D1F1B] mb-1">
              Agregar Bovino a la Manga
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              Incorporación con arete oficial ICA y sensor RFID
            </p>

            <form onSubmit={handleAddBovine} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Arete ICA</label>
                <input
                  type="text"
                  required
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 rounded-xl border border-gray-300 text-xs font-bold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Raza</label>
                <input
                  type="text"
                  required
                  value={newBreed}
                  onChange={(e) => setNewBreed(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 rounded-xl border border-gray-300 text-xs font-bold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Peso Inicial (Kg)</label>
                <input
                  type="number"
                  required
                  value={newWeight}
                  onChange={(e) => setNewWeight(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 rounded-xl border border-gray-300 text-xs font-bold"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setAddBovineModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-100 rounded-xl cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-[#063B32] hover:bg-[#042822] rounded-xl cursor-pointer"
                >
                  Agregar a la Manga
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL SOLICITAR NUEVO LOTE */}
      {newBatchModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-200">
            <h3 className="text-base font-extrabold text-[#0D1F1B] mb-1">
              Solicitar Nuevo Lote de Ceba
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              Financiación 100% de novillos sin deuda bancaria bajo contrato fiduciario Ley 1676.
            </p>
            <div className="space-y-3 text-xs text-gray-700">
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                <strong>Predio Certificado:</strong> Hacienda La Palmira (450 Ha)
                <br />
                <strong>Capacidad disponible:</strong> 150 Novillos UAF
              </div>
              <p>
                Al enviar la solicitud, los inspectores de HatoFi validarán el estado de pastos y coordinarán el desembolso de los terneros con arete RFID.
              </p>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <button
                type="button"
                onClick={() => setNewBatchModalOpen(false)}
                className="px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-100 rounded-xl cursor-pointer"
              >
                Cerrar
              </button>
              <button
                type="button"
                onClick={() => {
                  setNewBatchModalOpen(false);
                  showToast("✓ Solicitud de Lote #05 registrada. Un asesor técnico te contactará.");
                }}
                className="px-5 py-2 text-xs font-bold text-white bg-[#063B32] hover:bg-[#042822] rounded-xl cursor-pointer"
              >
                Confirmar Solicitud
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
