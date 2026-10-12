"use client";

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
  {
    id: "05",
    tag: "#ICA-005",
    rfid: "982.000.412.985",
    breed: "Gyr x Holando",
    stage: "22 meses • Mes 7 de 10",
    initialWeight: 200,
    currentWeight: 465.0,
    gainNet: 265.0,
    gainBiweekly: 11.4,
    health: "En Monitoreo",
  },
  {
    id: "06",
    tag: "#ICA-006",
    rfid: "982.000.412.986",
    breed: "Brahman Blanco",
    stage: "26 meses • Mes 9 de 10",
    initialWeight: 230,
    currentWeight: 498.2,
    gainNet: 268.2,
    gainBiweekly: 16.0,
    health: "Vacunado / Óptimo",
  },
];

export default function CattleInventoryPage() {
  const [cattleList, setCattleList] = useState<Bovine[]>(initialCattle);
  const [selectedFilter, setSelectedFilter] = useState<"all" | "optimal" | "review">("all");
  const [weightModalOpen, setWeightModalOpen] = useState(false);
  const [selectedBovine, setSelectedBovine] = useState<Bovine | null>(null);
  const [newWeightInput, setNewWeightInput] = useState("");
  const [addBovineModalOpen, setAddBovineModalOpen] = useState(false);
  const [newTag, setNewTag] = useState("#ICA-007");
  const [newBreed, setNewBreed] = useState("Brahman x Simmental");
  const [newWeight, setNewWeight] = useState("220");
  const [toastMessage, setToastMessage] = useState("");

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
    const nextNum = cattleList.length + 1;
    const newBovine: Bovine = {
      id: String(nextNum).padStart(2, "0"),
      tag: newTag,
      rfid: `982.000.412.98${nextNum}`,
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

      {/* Header Limpio */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1.5 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F3EE] text-[#006244] text-xs font-bold w-fit border border-[#CCE3D8]">
            <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
            <span>Censo y Trazabilidad RFID • Certificado ICA #84920-CO</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0D1F1B] tracking-tight">
            Inventario y Monitoreo de Bovinos en Lote
          </h1>
          <p className="text-xs sm:text-sm text-[#5D6B66] leading-relaxed">
            Gestión individualizada de terneros de ceba, pesajes telemétricos en manga y control sanitario auditado bajo normativa ICA.
          </p>
        </div>

        {/* Botón Agregar Bovino */}
        <button
          type="button"
          onClick={() => setAddBovineModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#063B32] hover:bg-[#042822] text-white font-bold text-xs transition-all shadow-sm cursor-pointer self-start sm:self-center shrink-0"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <span>Agregar Bovino a la Manga</span>
        </button>
      </div>

      {/* Contenedor Principal de la Tabla */}
      <div className="bg-white rounded-2xl border border-[#E2E8E5] shadow-sm p-5 sm:p-6 flex flex-col gap-5">
        
        {/* Header con Filtros */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EEF2F0]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#E8F3EE] text-[#006244] flex items-center justify-center font-bold">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
              </svg>
            </div>
            <div>
              <h2 className="text-base font-extrabold text-[#0D1F1B]">
                Lote Activo #04 • Ceba de Finalización
              </h2>
              <span className="text-xs text-gray-500">
                {cattleList.length} bovinos registrados con arete oficial
              </span>
            </div>
          </div>

          {/* Filtros */}
          <div className="overflow-x-auto max-w-full pb-1 sm:pb-0">
            <div className="inline-flex p-1 rounded-xl bg-[#F0F4F2] text-xs font-bold shrink-0 gap-1 text-[#62736C]">
              <button
                type="button"
                onClick={() => setSelectedFilter("all")}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  selectedFilter === "all" ? "bg-white text-[#006244] shadow-sm" : "hover:text-[#0D1F1B]"
                }`}
              >
                Todos ({cattleList.length})
              </button>
              <button
                type="button"
                onClick={() => setSelectedFilter("optimal")}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  selectedFilter === "optimal" ? "bg-white text-[#006244] shadow-sm" : "hover:text-[#0D1F1B]"
                }`}
              >
                Óptimo (≥480kg)
              </button>
              <button
                type="button"
                onClick={() => setSelectedFilter("review")}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  selectedFilter === "review" ? "bg-white text-[#006244] shadow-sm" : "hover:text-[#0D1F1B]"
                }`}
              >
                Revisión (&lt;480kg)
              </button>
            </div>
          </div>
        </div>

        {/* VISTA MÓVIL: Tarjetas Adaptativas */}
        <div className="md:hidden flex flex-col gap-3">
          {filteredCattle.map((b) => (
            <div
              key={`mob-${b.id}`}
              className="p-4 rounded-xl border border-[#EEF2F0] bg-[#FAFBFB] flex flex-col gap-3 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#E8F3EE] flex items-center justify-center text-[#006244] font-black text-xs shrink-0">
                    {b.id}
                  </div>
                  <div>
                    <div className="font-black text-[#0D1F1B] text-sm leading-tight">{b.tag}</div>
                    <div className="text-[10px] text-gray-400 font-mono">RFID: {b.rfid}</div>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#E0F2FE] text-[#0369A1] font-bold text-[10px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7]"></span>
                  {b.health}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-gray-100">
                <div>
                  <span className="text-[10px] text-gray-400 block">Raza & Etapa</span>
                  <strong className="text-[#0D1F1B] font-bold block truncate">{b.breed}</strong>
                  <span className="text-[10px] text-gray-500 block truncate">{b.stage}</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 block">Pesaje Actual</span>
                  <div className="font-extrabold text-[#006244] text-sm">
                    {b.currentWeight} kg
                  </div>
                  <span className="text-[10px] text-[#059669] font-bold block">
                    ▲ +{b.gainBiweekly} kg (15d)
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleOpenWeightModal(b)}
                className="w-full py-2.5 rounded-xl bg-[#063B32] hover:bg-[#042822] text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
                <span>Registrar Pesaje en Báscula</span>
              </button>
            </div>
          ))}
        </div>

        {/* VISTA TABLET & DESKTOP: Tabla Estructurada */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#EEF2F0] text-gray-500 font-bold">
                <th className="py-3 px-3">Bovino / Arete</th>
                <th className="py-3 px-3">Raza & Etapa</th>
                <th className="py-3 px-3">Peso Inicial → Actual</th>
                <th className="py-3 px-3">Ganancia Quincenal</th>
                <th className="py-3 px-3">Sanidad</th>
                <th className="py-3 px-3 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EEF2F0]">
              {filteredCattle.map((b) => (
                <tr key={b.id} className="hover:bg-[#F9FBFA] transition-colors">
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#E8F3EE] flex items-center justify-center text-[#006244] font-bold text-xs shrink-0">
                        {b.id}
                      </div>
                      <div>
                        <div className="font-extrabold text-[#0D1F1B] text-sm">{b.tag}</div>
                        <div className="text-[10px] text-gray-400 font-mono">RFID: {b.rfid}</div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-3">
                    <div className="font-bold text-[#0D1F1B]">{b.breed}</div>
                    <div className="text-[11px] text-gray-500">{b.stage}</div>
                  </td>

                  <td className="py-3.5 px-3">
                    <div className="font-bold text-[#0D1F1B]">
                      {b.initialWeight} kg → <span className="text-[#006244] font-extrabold">{b.currentWeight} kg</span>
                    </div>
                    <div className="text-[11px] text-[#059669] font-semibold">+{b.gainNet} kg netos</div>
                  </td>

                  <td className="py-3.5 px-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#E8F5E9] text-[#006244] font-bold text-[11px]">
                      ▲ +{b.gainBiweekly} kg
                    </span>
                  </td>

                  <td className="py-3.5 px-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#E0F2FE] text-[#0369A1] font-semibold text-[11px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7]"></span>
                      {b.health}
                    </span>
                  </td>

                  <td className="py-3.5 px-3 text-right">
                    <button
                      type="button"
                      onClick={() => handleOpenWeightModal(b)}
                      className="px-3.5 py-2 rounded-lg bg-[#063B32] hover:bg-[#042822] text-white font-bold text-xs transition-colors cursor-pointer shadow-sm"
                    >
                      Registrar Pesaje
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer de la Tabla */}
        <div className="pt-3 border-t border-[#EEF2F0] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-gray-500">
          <span>Mostrando {filteredCattle.length} de {cattleList.length} bovinos auditados en finca</span>
          <span className="text-[11px] text-[#059669] font-bold">✓ Sincronizado con oráculo ganadero ICA</span>
        </div>
      </div>

      {/* MODAL REGISTRAR PESAJE */}
      {weightModalOpen && selectedBovine && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
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

              <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setWeightModalOpen(false)}
                  className="w-full sm:w-auto px-4 py-2.5 text-xs font-bold text-gray-600 hover:bg-gray-100 rounded-xl cursor-pointer text-center"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold text-white bg-[#063B32] hover:bg-[#042822] rounded-xl cursor-pointer text-center"
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
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
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

              <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setAddBovineModalOpen(false)}
                  className="w-full sm:w-auto px-4 py-2.5 text-xs font-bold text-gray-600 hover:bg-gray-100 rounded-xl cursor-pointer text-center"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold text-white bg-[#063B32] hover:bg-[#042822] rounded-xl cursor-pointer text-center"
                >
                  Agregar a la Manga
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
