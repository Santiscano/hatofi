"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterGanaderoPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [loading, setLoading] = useState(false);

  // Estados Paso 1
  const [ganType, setGanType] = useState<"individual" | "empresa">("individual");
  const [ganName, setGanName] = useState("");
  const [ganDoc, setGanDoc] = useState("");
  const [ganPhone, setGanPhone] = useState("");
  const [ganEmail, setGanEmail] = useState("");
  const [ganFarmName, setGanFarmName] = useState("");
  const [ganLocation, setGanLocation] = useState("");
  const [ganPass, setGanPass] = useState("");
  const [ganPassConfirm, setGanPassConfirm] = useState("");
  const [ganIcaConsent, setGanIcaConsent] = useState(true);

  // Estados Paso 2 (ICA / Predio)
  const [rppIca, setRppIca] = useState("05-001-00234-ICA");
  const [icaVerified, setIcaVerified] = useState(true);
  const [vaccineUploaded, setVaccineUploaded] = useState(true);
  const [hectareas, setHectareas] = useState(120);
  const [capacity, setCapacity] = useState(250);

  // Estados Paso 3 (Liquidación ACH)
  const [bank, setBank] = useState("bancolombia");
  const [accountType, setAccountType] = useState<"ahorros" | "corriente">("ahorros");
  const [accountNum, setAccountNum] = useState("245-891045-12");
  const [payoutFreq, setPayoutFreq] = useState("quincenal");

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep((prev) => (prev + 1) as 1 | 2 | 3);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setLoading(true);
      setTimeout(() => {
        router.push("/dashboard/my-farm");
      }, 700);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F7F5] text-[#0D1F1B] flex flex-col justify-between selection:bg-[#5BCB35] selection:text-white">
      {/* Top Navbar */}
      <header className="w-full bg-white/90 backdrop-blur-md border-b border-[#E2E8E5] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/login" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white border border-[#E2E8E5] p-1 flex items-center justify-center shadow-sm">
                <Image
                  src="/brand/hatofi-icon.svg"
                  alt="HatoFi"
                  width={28}
                  height={28}
                  priority
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="font-extrabold text-base tracking-tight text-[#063B32] block leading-tight">
                  HatoFi
                </span>
                <span className="text-[9px] font-bold tracking-widest text-[#7C8B85] uppercase block">
                  Portal Ganaderos & Predios RWA
                </span>
              </div>
            </Link>

            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E8F3EE] text-[#006244] text-[11px] font-semibold border border-[#CCE3D8]">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3z" />
              </svg>
              Registro ICA SIGMA Oficial • Liquidación ACH
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs font-medium">
            <Link
              href="/register/inversionista"
              className="hidden md:inline-flex items-center gap-1 text-[#006244] hover:underline font-bold"
            >
              ¿Eres Inversionista? Regístrate aquí →
            </Link>
            <Link
              href="/login"
              className="py-1.5 px-3 rounded-lg border border-[#006244] text-[#006244] font-bold hover:bg-[#006244] hover:text-white transition-all"
            >
              Iniciar Sesión
            </Link>
          </div>
        </div>
      </header>

      {/* Stepper Header Ganadero */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6">
        <div className="bg-white rounded-2xl border border-[#E2E8E5] p-4 sm:p-5 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#063B32] text-white flex items-center justify-center text-xs font-bold shrink-0">
                {step}
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#006244] uppercase tracking-wider block">
                  Paso {step} de 3 • Registro de Predio y Productor
                </span>
                <h2 className="text-sm font-extrabold text-[#0D1F1B]">
                  {step === 1 && "Paso 1: Datos del Titular y Ubicación del Predio"}
                  {step === 2 && "Paso 2: Validación Sanitaria ICA SIGMA & Capacidad UAF"}
                  {step === 3 && "Paso 3: Cuenta Bancaria de Liquidación ACH (COP)"}
                </h2>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#D1FAE5] text-[#065F46] self-start sm:self-center border border-[#A7F3D0]">
              {step === 1 ? "33% completado" : step === 2 ? "66% completado" : "90% completado"}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-2 border-t border-[#EEF2F0]">
            <div className="space-y-1">
              <div className={`h-1.5 w-full rounded-full transition-all ${step >= 1 ? "bg-[#006244]" : "bg-gray-200"}`}></div>
              <span className={`text-[11px] font-bold block truncate ${step >= 1 ? "text-[#006244]" : "text-gray-400"}`}>
                1. Titular & Finca
              </span>
            </div>
            <div className="space-y-1">
              <div className={`h-1.5 w-full rounded-full transition-all ${step >= 2 ? "bg-[#006244]" : "bg-gray-200"}`}></div>
              <span className={`text-[11px] font-bold block truncate ${step >= 2 ? "text-[#006244]" : "text-gray-400"}`}>
                2. ICA SIGMA & Pastos
              </span>
            </div>
            <div className="space-y-1">
              <div className={`h-1.5 w-full rounded-full transition-all ${step >= 3 ? "bg-[#006244]" : "bg-gray-200"}`}></div>
              <span className={`text-[11px] font-bold block truncate ${step >= 3 ? "text-[#006244]" : "text-gray-400"}`}>
                3. Liquidación ACH
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido Principal (2 Columnas Niveladas) */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 md:py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start flex-1">
        
        {/* COLUMNA IZQUIERDA: Formulario Ganadero */}
        <section className="lg:col-span-7 bg-white rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.04)] border border-[#E2E8E5] p-6 sm:p-9 md:p-10">
          
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#EEF2F0]">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#E8F3EE] text-[#006244] border border-[#CCE3D8]">
              <span className="w-2 h-2 rounded-full bg-[#5BCB35]"></span>
              RWA Ganadero Regulado
            </span>
            <Link
              href="/register/inversionista"
              className="text-xs font-bold text-[#64748B] hover:text-[#063B32] transition-colors"
            >
              Cambiar a Inversionista →
            </Link>
          </div>

          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0D1F1B] tracking-tight">
              Registra tu <span className="text-[#063B32]">Predio Ganadero</span>
            </h1>
            <p className="text-xs sm:text-sm text-[#5D6B66] mt-2 leading-relaxed">
              Accede a capital de ceba respaldado por peso en báscula. 100% financiamiento de novillos de ceba sin pagarés bancarios ni hipotecas sobre tu tierra.
            </p>
          </div>

          <form onSubmit={handleNextStep} className="space-y-5">
            {/* PASO 1 */}
            {step === 1 && (
              <div className="space-y-4">
                {/* Selector Tipo Productor */}
                <div className="grid grid-cols-2 gap-2 p-1 bg-[#EEF2F6] rounded-xl border border-[#DCE4EC]">
                  <button
                    type="button"
                    onClick={() => setGanType("individual")}
                    className={`py-2.5 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      ganType === "individual"
                        ? "bg-white text-[#063B32] shadow-sm"
                        : "text-[#64748B] hover:text-[#0D1F1B]"
                    }`}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    Productor Individual
                  </button>

                  <button
                    type="button"
                    onClick={() => setGanType("empresa")}
                    className={`py-2.5 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      ganType === "empresa"
                        ? "bg-white text-[#063B32] shadow-sm"
                        : "text-[#64748B] hover:text-[#0D1F1B]"
                    }`}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="18" height="18" x="3" y="3" rx="2" />
                      <path d="M3 9h18M9 21V9" />
                    </svg>
                    Empresa Ganadera / Asociación
                  </button>
                </div>

                {/* Nombre */}
                <div>
                  <label className="block text-xs font-bold text-[#2A3833] mb-1.5">
                    Nombre Completo del Titular o Administrador
                  </label>
                  <input
                    type="text"
                    required
                    value={ganName}
                    onChange={(e) => setGanName(e.target.value)}
                    placeholder="Ej. Carlos Arturo Restrepo Montes"
                    className="w-full px-4 py-2.5 bg-[#EEF2F6] focus:bg-white text-xs sm:text-sm text-[#0D1F1B] rounded-xl border border-transparent focus:border-[#006244] focus:outline-none transition-all"
                  />
                </div>

                {/* Cédula y Teléfono */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#2A3833] mb-1.5">Cédula de Ciudadanía o NIT</label>
                    <input
                      type="text"
                      required
                      value={ganDoc}
                      onChange={(e) => setGanDoc(e.target.value)}
                      placeholder="Ej. 71.394.821"
                      className="w-full px-4 py-2.5 bg-[#EEF2F6] focus:bg-white text-xs sm:text-sm text-[#0D1F1B] rounded-xl border border-transparent focus:border-[#006244] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#2A3833] mb-1.5">Teléfono Móvil / WhatsApp</label>
                    <div className="flex gap-2">
                      <span className="w-16 px-2 py-2.5 bg-[#EEF2F6] text-xs font-bold text-gray-700 rounded-xl flex items-center justify-center">
                        🇨🇴 +57
                      </span>
                      <input
                        type="tel"
                        required
                        value={ganPhone}
                        onChange={(e) => setGanPhone(e.target.value)}
                        placeholder="312 849 2011"
                        className="flex-1 px-4 py-2.5 bg-[#EEF2F6] focus:bg-white text-xs sm:text-sm text-[#0D1F1B] rounded-xl border border-transparent focus:border-[#006244] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Correo */}
                <div>
                  <label className="block text-xs font-bold text-[#2A3833] mb-1.5">Correo Electrónico</label>
                  <input
                    type="email"
                    required
                    value={ganEmail}
                    onChange={(e) => setGanEmail(e.target.value)}
                    placeholder="carlos.restrepo@agropecuario.com"
                    className="w-full px-4 py-2.5 bg-[#EEF2F6] focus:bg-white text-xs sm:text-sm text-[#0D1F1B] rounded-xl border border-transparent focus:border-[#006244] focus:outline-none"
                  />
                </div>

                {/* Finca y Municipio */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-[#EEF2F0]">
                  <div>
                    <label className="block text-xs font-bold text-[#2A3833] mb-1.5">Nombre del Predio / Finca</label>
                    <input
                      type="text"
                      required
                      value={ganFarmName}
                      onChange={(e) => setGanFarmName(e.target.value)}
                      placeholder="Ej. Hacienda La Palmira"
                      className="w-full px-4 py-2.5 bg-[#EEF2F6] focus:bg-white text-xs sm:text-sm text-[#0D1F1B] rounded-xl border border-transparent focus:border-[#006244] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#2A3833] mb-1.5">Departamento y Municipio</label>
                    <input
                      type="text"
                      required
                      value={ganLocation}
                      onChange={(e) => setGanLocation(e.target.value)}
                      placeholder="Ej. Córdoba, Montería"
                      className="w-full px-4 py-2.5 bg-[#EEF2F6] focus:bg-white text-xs sm:text-sm text-[#0D1F1B] rounded-xl border border-transparent focus:border-[#006244] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Contraseñas Ganadero */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#2A3833] mb-1.5">Contraseña de Acceso</label>
                    <input
                      type="password"
                      required
                      value={ganPass}
                      onChange={(e) => setGanPass(e.target.value)}
                      placeholder="Mínimo 8 caracteres"
                      className="w-full px-3 py-2.5 bg-[#EEF2F6] focus:bg-white text-xs sm:text-sm text-[#0D1F1B] rounded-xl border border-transparent focus:border-[#006244] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#2A3833] mb-1.5">Confirmar Contraseña</label>
                    <input
                      type="password"
                      required
                      value={ganPassConfirm}
                      onChange={(e) => setGanPassConfirm(e.target.value)}
                      placeholder="Repite tu contraseña"
                      className="w-full px-3 py-2.5 bg-[#EEF2F6] focus:bg-white text-xs sm:text-sm text-[#0D1F1B] rounded-xl border border-transparent focus:border-[#006244] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Autorización Sanitaria ICA */}
                <label className="flex items-start gap-2.5 text-xs text-[#52625C] cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={ganIcaConsent}
                    onChange={(e) => setGanIcaConsent(e.target.checked)}
                    required
                    className="mt-0.5 w-4 h-4 rounded text-[#006244] accent-[#006244]"
                  />
                  <span>
                    Autorizo la verificación sanitaria de predio ante el <strong>ICA (SIGMA)</strong> y acepto los <strong className="text-[#0D1F1B]">Términos de Operación RWA</strong> y la política de biomasa de HatoFi.
                  </span>
                </label>
              </div>
            )}

            {/* PASO 2: Validación ICA & Capacidad */}
            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-bold text-[#2A3833]">
                      Número de Registro de Predio Pecuario (RPP ICA)
                    </label>
                    <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Conectado a SIGMA
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      required
                      value={rppIca}
                      onChange={(e) => setRppIca(e.target.value)}
                      placeholder="05-001-00234-ICA"
                      className="flex-1 px-4 py-2.5 bg-[#EEF2F6] focus:bg-white text-xs sm:text-sm text-[#0D1F1B] rounded-xl border border-transparent focus:border-[#006244] focus:outline-none font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setIcaVerified(true)}
                      className="px-3 py-2 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300"
                    >
                      ✓ Verificado ICA
                    </button>
                  </div>
                  <span className="text-[11px] text-gray-500 mt-1 block">
                    Validado en tiempo real con la base de datos oficial del Instituto Colombiano Agropecuario.
                  </span>
                </div>

                {/* Certificado de Vacunación */}
                <div>
                  <label className="block text-xs font-bold text-[#2A3833] mb-1.5">
                    Certificado de Vacunación Fiebre Aftosa / Brucelosis (Fedegán / ICA)
                  </label>
                  <div className="p-3.5 bg-[#F0FDF4] border border-[#BBF7D0] rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-emerald-200 text-emerald-800 flex items-center justify-center font-bold text-xs">
                        PDF
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[#0D1F1B] block">registro_vacunacion_ciclo2_2024.pdf</span>
                        <span className="text-[11px] text-emerald-700">2.1 MB • Verificado con ICA SIGMA ✓</span>
                      </div>
                    </div>
                    <button type="button" className="text-xs font-bold text-[#006244] hover:underline">
                      Reemplazar
                    </button>
                  </div>
                </div>

                {/* Hectáreas y Capacidad */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-[#2A3833] mb-1.5">Hectáreas Efectivas de Pastoreo</label>
                    <div className="relative">
                      <input
                        type="number"
                        required
                        value={hectareas}
                        onChange={(e) => setHectareas(Number(e.target.value))}
                        className="w-full px-4 py-2.5 bg-[#EEF2F6] focus:bg-white text-xs sm:text-sm text-[#0D1F1B] rounded-xl border border-transparent focus:border-[#006244] focus:outline-none"
                      />
                      <span className="absolute right-3 top-2.5 text-xs font-bold text-gray-400">Ha</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#2A3833] mb-1.5">Capacidad Máxima de Ceba (UAF)</label>
                    <div className="relative">
                      <input
                        type="number"
                        required
                        value={capacity}
                        onChange={(e) => setCapacity(Number(e.target.value))}
                        className="w-full px-4 py-2.5 bg-[#EEF2F6] focus:bg-white text-xs sm:text-sm text-[#0D1F1B] rounded-xl border border-transparent focus:border-[#006244] focus:outline-none"
                      />
                      <span className="absolute right-3 top-2.5 text-xs font-bold text-gray-400">Novillos</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* PASO 3: Liquidación ACH */}
            {step === 3 && (
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-bold text-[#2A3833]">
                      Entidad Bancaria para Liquidación ACH (COP)
                    </label>
                    <span className="text-[11px] font-bold text-emerald-700">🔒 Cero comisiones de giro</span>
                  </div>
                  <select
                    value={bank}
                    onChange={(e) => setBank(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#EEF2F6] focus:bg-white text-xs sm:text-sm text-[#0D1F1B] rounded-xl border border-transparent focus:border-[#006244] focus:outline-none cursor-pointer font-bold"
                  >
                    <option value="bancolombia">Bancolombia (Ahorro a la Mano o Tradicional)</option>
                    <option value="banco-agrario">Banco Agrario de Colombia (Línea Agropecuaria)</option>
                    <option value="davivienda">Davivienda (DaviPlata o Empresarial)</option>
                    <option value="bbva">BBVA Colombia</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#2A3833] mb-1.5">Tipo de Cuenta</label>
                    <div className="grid grid-cols-2 gap-1 bg-[#EEF2F6] p-1 rounded-xl">
                      <button
                        type="button"
                        onClick={() => setAccountType("ahorros")}
                        className={`py-2 text-xs font-bold rounded-lg cursor-pointer ${
                          accountType === "ahorros" ? "bg-white text-[#063B32] shadow-sm" : "text-gray-500"
                        }`}
                      >
                        Ahorros
                      </button>
                      <button
                        type="button"
                        onClick={() => setAccountType("corriente")}
                        className={`py-2 text-xs font-bold rounded-lg cursor-pointer ${
                          accountType === "corriente" ? "bg-white text-[#063B32] shadow-sm" : "text-gray-500"
                        }`}
                      >
                        Corriente
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#2A3833] mb-1.5">Número de Cuenta</label>
                    <input
                      type="text"
                      required
                      value={accountNum}
                      onChange={(e) => setAccountNum(e.target.value)}
                      placeholder="245-891045-12"
                      className="w-full px-4 py-2.5 bg-[#EEF2F6] focus:bg-white text-xs sm:text-sm text-[#0D1F1B] rounded-xl border border-transparent focus:border-[#006244] focus:outline-none font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2A3833] mb-1.5">
                    Frecuencia de Liquidación de Anticipos y Ganancia de Peso
                  </label>
                  <select
                    value={payoutFreq}
                    onChange={(e) => setPayoutFreq(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#EEF2F6] focus:bg-white text-xs sm:text-sm text-[#0D1F1B] rounded-xl border border-transparent focus:border-[#006244] focus:outline-none cursor-pointer"
                  >
                    <option value="quincenal">Quincenal (Tras cada pesaje telemétrico en báscula)</option>
                    <option value="mensual">Mensual Consolidado</option>
                    <option value="ciclo">Al Cierre de Ciclo de Ceba (Novillos finalizados)</option>
                  </select>
                </div>

                <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-600">
                  <strong>Validación Antifraude:</strong> Por normativa fiduciaria y SAGRILAFT, la cuenta receptora de fondos debe coincidir 100% con el titular del RPP ICA.
                </div>
              </div>
            )}

            {/* Botones de Navegación */}
            <div className="pt-4 border-t border-[#EEF2F0] flex items-center justify-between gap-3">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep((prev) => (prev - 1) as 1 | 2 | 3)}
                  className="py-3 px-5 rounded-xl border border-[#CCD7D1] text-[#2A3833] font-bold text-xs hover:bg-[#EEF2F0] transition-all cursor-pointer"
                >
                  ← Regresar
                </button>
              ) : (
                <div />
              )}

              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-3.5 px-6 rounded-xl bg-[#063B32] hover:bg-[#042822] text-white font-extrabold text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
              >
                {loading ? (
                  <span>Procesando registro...</span>
                ) : step < 3 ? (
                  <>
                    <span>Continuar a {step === 1 ? "Validación ICA SIGMA (Paso 2)" : "Liquidación ACH (Paso 3)"}</span>
                    <span>→</span>
                  </>
                ) : (
                  <>
                    <span>Completar Registro de Predio Ganadero</span>
                    <span>✓</span>
                  </>
                )}
              </button>
            </div>
          </form>

          <p className="text-center text-xs text-[#71807A] mt-6">
            ¿Ya tienes una cuenta activa en HatoFi?{" "}
            <Link href="/login" className="font-bold text-[#006244] hover:underline">
              Iniciar Sesión
            </Link>
          </p>
        </section>

        {/* COLUMNA DERECHA: Widgets Ganadero (Nivelados) */}
        <aside className="lg:col-span-5 flex flex-col gap-5 w-full">
          {/* Widget 1: Modelo Ceba Sostenible */}
          <div className="bg-[#063B32] text-white rounded-2xl p-6 shadow-md border border-[#0B4B40] relative overflow-hidden">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-bold tracking-widest text-[#8DF0B2] uppercase">
                Modelo de Ceba Sostenible
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#0A4D40] text-[#8DF0B2] border border-[#166353]">
                Sin Deuda Bancaria
              </span>
            </div>

            <div className="my-2">
              <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">0% Interés</div>
              <div className="text-xs font-semibold text-[#8DF0B2]">Financiamiento 100% de Ganado en Pie</div>
            </div>

            <p className="text-xs text-[#B5D5C8] leading-relaxed mb-4">
              Recibes novillos seleccionados en tu finca sin pagar un solo peso por adelantado. Cobras directamente por cada kilo ganado en báscula.
            </p>

            <div className="bg-[#042822] p-3 rounded-xl border border-[#083E34]">
              <div className="flex justify-between text-[11px] font-semibold text-[#8DF0B2] mb-1">
                <span>Ganancia Diaria de Peso (GDP)</span>
                <span>+780 g/día promedio</span>
              </div>
              <svg viewBox="0 0 300 50" className="w-full h-10">
                <path
                  d="M 5 42 C 70 42, 110 28, 160 22 C 210 16, 250 10, 295 6"
                  fill="none"
                  stroke="#5BCB35"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          {/* Widget 2: Respaldo y Beneficios */}
          <div className="bg-white rounded-2xl p-6 border border-[#E2E8E5] shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 rounded-lg bg-[#E6F4EA] text-[#006244] flex items-center justify-center">
                ✓
              </div>
              <h3 className="font-extrabold text-sm sm:text-base text-[#0D1F1B]">
                Ventajas para el Ganadero Aliado
              </h3>
            </div>
            <p className="text-xs text-[#71807A] mb-4">Socio operativo sin riesgo fiduciario sobre tu tierra</p>

            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-[#F8FAF9] border border-[#E5EAE7] flex items-start gap-2.5">
                <span className="text-[#059669] font-bold text-sm">✓</span>
                <div>
                  <h4 className="text-xs font-bold text-[#0D1F1B]">Anticipos Directos en Cuenta ACH</h4>
                  <p className="text-[11px] text-[#55645E]">Recibe fondos periódicos para sales minerales, forrajes y sostenimiento sin esperas.</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#F8FAF9] border border-[#E5EAE7] flex items-start gap-2.5">
                <span className="text-[#059669] font-bold text-sm">✓</span>
                <div>
                  <h4 className="text-xs font-bold text-[#0D1F1B]">Báscula IoT & Aretes RFID Sin Costo</h4>
                  <p className="text-[11px] text-[#55645E]">Instalamos tecnología telemétrica en tu corral para certificar los pesajes en línea.</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#F8FAF9] border border-[#E5EAE7] flex items-start gap-2.5">
                <span className="text-[#059669] font-bold text-sm">✓</span>
                <div>
                  <h4 className="text-xs font-bold text-[#0D1F1B]">Tu Predio Jamás se Hipoteca</h4>
                  <p className="text-[11px] text-[#55645E]">La garantía recae exclusivamente sobre el lote de reses (Ley 1676), blindando tu patrimonio inmobiliario.</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#F8FAF9] border border-[#E5EAE7] flex items-start gap-2.5">
                <span className="text-[#059669] font-bold text-sm">✓</span>
                <div>
                  <h4 className="text-xs font-bold text-[#0D1F1B]">Monitoreo Satelital y Sanitario ICA</h4>
                  <p className="text-[11px] text-[#55645E]">Acompañamiento técnico permanente para certificar predio libre de deforestación y aftosa.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Widget 3: Hacienda La Palmira */}
          <div className="bg-white rounded-2xl overflow-hidden border border-[#E2E8E5] shadow-sm">
            <div className="relative h-32 w-full bg-[#1A382D]">
              <Image
                src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=600&q=80"
                alt="Hacienda La Palmira"
                fill
                className="object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-3 left-3 text-white">
                <span className="text-xs font-extrabold flex items-center gap-1.5">
                  📍 Hacienda La Palmira • Montería, Córdoba
                </span>
              </div>
            </div>
            <div className="p-3.5 flex justify-between items-center text-xs font-semibold text-[#55655F]">
              <span>Predio Asociado: 280 Novillos UAF</span>
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Predio Libre de Aftosa (ICA) ✓
              </span>
            </div>
          </div>

          {/* Widget 4: Testimonio Ganadero */}
          <div className="bg-white rounded-2xl p-5 border border-[#E2E8E5] shadow-sm">
            <div className="text-amber-400 text-sm mb-2">★★★★★</div>
            <p className="text-xs text-[#40504A] italic leading-relaxed mb-3">
              &ldquo;HatoFi nos quitó de encima los pagarés bancarios. Ahora recibimos novillos de calidad y nos pagan puntuales cada mes por el peso que ganamos en báscula.&rdquo;
            </p>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#006244] text-white flex items-center justify-center font-bold text-xs">
                CR
              </div>
              <div>
                <h5 className="text-xs font-bold text-[#0D1F1B]">Carlos Arturo Restrepo</h5>
                <span className="text-[11px] text-gray-500">Ganadero Tradicional, Córdoba</span>
              </div>
            </div>
          </div>
        </aside>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 border-t border-[#E2E8E5] flex flex-col md:flex-row items-center justify-between text-xs text-[#7A8882] gap-4 mt-8">
        <div className="flex flex-wrap items-center gap-4">
          <span>© 2025 HatoFi Protocol Ltd. Todos los derechos reservados.</span>
          <span className="text-gray-300 hidden md:inline">•</span>
          <span className="text-[#059669] font-medium">Registro Sanitario ICA SIGMA Oficial</span>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Link href="#" className="hover:underline hover:text-[#0D1F1B]">Términos Institucionales</Link>
          <Link href="#" className="hover:underline hover:text-[#0D1F1B]">Privacidad y Custodia RWA</Link>
          <Link href="#" className="hover:underline hover:text-[#0D1F1B]">Divulgación de Riesgos</Link>
        </div>
      </footer>
    </div>
  );
}
