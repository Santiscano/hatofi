"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterInversionistaPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [loading, setLoading] = useState(false);

  // Estados Paso 1
  const [invType, setInvType] = useState<"individual" | "institutional">("individual");
  const [invName, setInvName] = useState("");
  const [invEmail, setInvEmail] = useState("");
  const [invPrefix, setInvPrefix] = useState("+57");
  const [invPhone, setInvPhone] = useState("");
  const [invCountry, setInvCountry] = useState("Colombia");
  const [invDocType, setInvDocType] = useState("CC");
  const [invDocNum, setInvDocNum] = useState("");
  const [invCapital, setInvCapital] = useState("10k-50k");
  const [invPass, setInvPass] = useState("");
  const [invPassConfirm, setInvPassConfirm] = useState("");
  const [invWalletConnected, setInvWalletConnected] = useState(false);
  const [invTerms, setInvTerms] = useState(true);

  // Estados Paso 2 (KYC)
  const [kycDocUploaded, setKycDocUploaded] = useState(false);
  const [kycOrigin, setKycOrigin] = useState("ahorros");
  const [kycPep, setKycPep] = useState(false);

  // Estados Paso 3 (Wallet / Custodia)
  const [invPublicKey] = useState("GCX4K9...79K2ST");
  const [invTrustline, setInvTrustline] = useState(true);

  // Medidor de fuerza de clave
  const getPasswordStrength = (pass: string) => {
    if (!pass) return { label: "Sin ingresar", pct: 0, color: "bg-gray-300", text: "text-gray-400" };
    if (pass.length < 6) return { label: "Débil", pct: 30, color: "bg-rose-500", text: "text-rose-600" };
    if (pass.length < 10) return { label: "Media", pct: 65, color: "bg-amber-500", text: "text-amber-600" };
    return { label: "Óptima (Segura)", pct: 100, color: "bg-emerald-500", text: "text-emerald-600" };
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep((prev) => (prev + 1) as 1 | 2 | 3);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setLoading(true);
      setTimeout(() => {
        router.push("/dashboard/investment");
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
                  Portal Inversionista RWA
                </span>
              </div>
            </Link>

            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E8F3EE] text-[#006244] text-[11px] font-semibold border border-[#CCE3D8]">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3z" />
              </svg>
              256-Bit HSM • Stellar Soroban Verified
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs font-medium">
            <Link
              href="/register/ganadero"
              className="hidden md:inline-flex items-center gap-1 text-[#006244] hover:underline font-bold"
            >
              ¿Eres Ganadero? Regístrate aquí →
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

      {/* Stepper Header */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6">
        <div className="bg-white rounded-2xl border border-[#E2E8E5] p-4 sm:p-5 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#063B32] text-white flex items-center justify-center text-xs font-bold shrink-0">
                {step}
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#006244] uppercase tracking-wider block">
                  Paso {step} de 3 • Perfil Inversionista
                </span>
                <h2 className="text-sm font-extrabold text-[#0D1F1B]">
                  {step === 1 && "Paso 1: Datos y Configuración de Cuenta"}
                  {step === 2 && "Paso 2: Verificación KYC & Cumplimiento Fiduciario"}
                  {step === 3 && "Paso 3: Billetera Stellar USDC y Custodia Soroban"}
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
                1. Cuenta
              </span>
            </div>
            <div className="space-y-1">
              <div className={`h-1.5 w-full rounded-full transition-all ${step >= 2 ? "bg-[#006244]" : "bg-gray-200"}`}></div>
              <span className={`text-[11px] font-bold block truncate ${step >= 2 ? "text-[#006244]" : "text-gray-400"}`}>
                2. KYC / AML
              </span>
            </div>
            <div className="space-y-1">
              <div className={`h-1.5 w-full rounded-full transition-all ${step >= 3 ? "bg-[#006244]" : "bg-gray-200"}`}></div>
              <span className={`text-[11px] font-bold block truncate ${step >= 3 ? "text-[#006244]" : "text-gray-400"}`}>
                3. Billetera
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido Principal (2 Columnas) */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 md:py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start flex-1">
        
        {/* COLUMNA IZQUIERDA: Formulario Inversionista */}
        <section className="lg:col-span-7 bg-white rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.04)] border border-[#E2E8E5] p-6 sm:p-9 md:p-10">
          
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#EEF2F0]">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#E8F3EE] text-[#006244] border border-[#CCE3D8]">
              <span className="w-2 h-2 rounded-full bg-[#5BCB35]"></span>
              Inversionista Institucional & Privado
            </span>
            <Link
              href="/register/ganadero"
              className="text-xs font-bold text-[#64748B] hover:text-[#063B32] transition-colors"
            >
              Cambiar a Ganadero →
            </Link>
          </div>

          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0D1F1B] tracking-tight">
              Crear Cuenta de Inversión en <span className="text-[#063B32]">Activos RWA</span>
            </h1>
            <p className="text-xs sm:text-sm text-[#5D6B66] mt-2 leading-relaxed">
              Participa en la financiación sindicada de ganado de ceba con rendimiento respaldado por biomasa viva real y contratos inteligentes auditados en Stellar Soroban.
            </p>
          </div>

          <form onSubmit={handleNextStep} className="space-y-5">
            {/* PASO 1 */}
            {step === 1 && (
              <div className="space-y-4">
                {/* Selector Tipo Inversionista */}
                <div className="grid grid-cols-2 gap-2 p-1 bg-[#EEF2F6] rounded-xl border border-[#DCE4EC]">
                  <button
                    type="button"
                    onClick={() => setInvType("individual")}
                    className={`py-2.5 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      invType === "individual"
                        ? "bg-white text-[#063B32] shadow-sm"
                        : "text-[#64748B] hover:text-[#0D1F1B]"
                    }`}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    Inversionista Individual / Privado
                  </button>

                  <button
                    type="button"
                    onClick={() => setInvType("institutional")}
                    className={`py-2.5 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      invType === "institutional"
                        ? "bg-white text-[#063B32] shadow-sm"
                        : "text-[#64748B] hover:text-[#0D1F1B]"
                    }`}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="18" height="18" x="3" y="3" rx="2" />
                      <path d="M3 9h18M9 21V9" />
                    </svg>
                    Fondo / Empresa Institucional
                  </button>
                </div>

                {/* Nombre */}
                <div>
                  <label className="block text-xs font-bold text-[#2A3833] mb-1.5">
                    {invType === "individual" ? "Nombre Completo del Titular" : "Razón Social de la Entidad o Fondo"}
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-3 text-[#85948F]">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="18" height="18" x="3" y="3" rx="2" /><path d="M7 7h10M7 12h10M7 17h6" />
                      </svg>
                    </span>
                    <input
                      type="text"
                      required
                      value={invName}
                      onChange={(e) => setInvName(e.target.value)}
                      placeholder={invType === "individual" ? "Ej. Carlos Mendoza Silva" : "Ej. InverLatam Capital S.A.S."}
                      className="w-full pl-10 pr-4 py-2.5 bg-[#EEF2F6] focus:bg-white text-xs sm:text-sm text-[#0D1F1B] rounded-xl border border-transparent focus:border-[#006244] focus:outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Correo */}
                <div>
                  <label className="block text-xs font-bold text-[#2A3833] mb-1.5">
                    Correo Electrónico (Corporativo o Personal)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-3 text-[#85948F]">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                    </span>
                    <input
                      type="email"
                      required
                      value={invEmail}
                      onChange={(e) => setInvEmail(e.target.value)}
                      placeholder="inversiones@familyoffice.com"
                      className="w-full pl-10 pr-4 py-2.5 bg-[#EEF2F6] focus:bg-white text-xs sm:text-sm text-[#0D1F1B] rounded-xl border border-transparent focus:border-[#006244] focus:outline-none transition-all"
                    />
                  </div>
                  <span className="text-[11px] text-[#62736C] flex items-center gap-1 mt-1">
                    🔒 Usaremos este correo para confirmaciones de firma multi-sig y dispersión de dividendos.
                  </span>
                </div>

                {/* Prefijo y Teléfono */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#2A3833] mb-1.5">Prefijo</label>
                    <select
                      value={invPrefix}
                      onChange={(e) => setInvPrefix(e.target.value)}
                      className="w-full px-3 py-2.5 bg-[#EEF2F6] focus:bg-white text-xs text-[#0D1F1B] rounded-xl border border-transparent focus:border-[#006244] focus:outline-none cursor-pointer"
                    >
                      <option value="+57">🇨🇴 +57 (COL)</option>
                      <option value="+1">🇺🇸 +1 (USA)</option>
                      <option value="+52">🇲🇽 +52 (MEX)</option>
                      <option value="+507">🇵🇦 +507 (PAN)</option>
                      <option value="+34">🇪🇸 +34 (ESP)</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-[#2A3833] mb-1.5">Teléfono / WhatsApp Móvil</label>
                    <input
                      type="tel"
                      required
                      value={invPhone}
                      onChange={(e) => setInvPhone(e.target.value)}
                      placeholder="310 456 7890"
                      className="w-full px-4 py-2.5 bg-[#EEF2F6] focus:bg-white text-xs sm:text-sm text-[#0D1F1B] rounded-xl border border-transparent focus:border-[#006244] focus:outline-none transition-all"
                    />
                  </div>
                </div>

                {/* País y Documento */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#2A3833] mb-1.5">País de Residencia Fiscal</label>
                    <select
                      value={invCountry}
                      onChange={(e) => setInvCountry(e.target.value)}
                      className="w-full px-3 py-2.5 bg-[#EEF2F6] focus:bg-white text-xs text-[#0D1F1B] rounded-xl border border-transparent focus:border-[#006244] focus:outline-none cursor-pointer"
                    >
                      <option value="Colombia">Colombia</option>
                      <option value="Estados Unidos">Estados Unidos</option>
                      <option value="Panamá">Panamá</option>
                      <option value="México">México</option>
                      <option value="Chile">Chile</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#2A3833] mb-1.5">Tipo y Documento</label>
                    <div className="flex gap-2">
                      <select
                        value={invDocType}
                        onChange={(e) => setInvDocType(e.target.value)}
                        className="w-2/5 px-2 py-2.5 bg-[#EEF2F6] focus:bg-white text-xs text-[#0D1F1B] rounded-xl border border-transparent focus:border-[#006244] focus:outline-none cursor-pointer font-bold"
                      >
                        <option value="CC">CC</option>
                        <option value="NIT">NIT</option>
                        <option value="PASSPORT">Pasap.</option>
                        <option value="CE">CE</option>
                      </select>
                      <input
                        type="text"
                        required
                        value={invDocNum}
                        onChange={(e) => setInvDocNum(e.target.value)}
                        placeholder="1020455890"
                        className="w-3/5 px-3 py-2.5 bg-[#EEF2F6] focus:bg-white text-xs sm:text-sm text-[#0D1F1B] rounded-xl border border-transparent focus:border-[#006244] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Rango de Capital */}
                <div>
                  <label className="block text-xs font-bold text-[#2A3833] mb-1.5">
                    Rango de Capital Proyectado a Colocar
                  </label>
                  <select
                    value={invCapital}
                    onChange={(e) => setInvCapital(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#EEF2F6] focus:bg-white text-xs sm:text-sm text-[#0D1F1B] rounded-xl border border-transparent focus:border-[#006244] focus:outline-none cursor-pointer font-semibold"
                  >
                    <option value="2.5k-10k">$2,500 USD – $10,000 USD (Inversión Semilla)</option>
                    <option value="10k-50k">$10,000 USD – $50,000 USD (Inversión Sindicada Intermedia)</option>
                    <option value="50k-250k">$50,000 USD – $250,000 USD (Lote Completo Ganadero)</option>
                    <option value="250k+">$250,000+ USD (Fondo Institucional / Multi-Hacienda)</option>
                  </select>
                </div>

                {/* Contraseñas */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#2A3833] mb-1.5">Contraseña Institucional</label>
                    <input
                      type="password"
                      required
                      value={invPass}
                      onChange={(e) => setInvPass(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full px-3 py-2.5 bg-[#EEF2F6] focus:bg-white text-xs sm:text-sm text-[#0D1F1B] rounded-xl border border-transparent focus:border-[#006244] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#2A3833] mb-1.5">Confirmar Contraseña</label>
                    <input
                      type="password"
                      required
                      value={invPassConfirm}
                      onChange={(e) => setInvPassConfirm(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full px-3 py-2.5 bg-[#EEF2F6] focus:bg-white text-xs sm:text-sm text-[#0D1F1B] rounded-xl border border-transparent focus:border-[#006244] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Barra de Fuerza */}
                <div className="p-3 bg-[#EEF2F6] rounded-xl border border-[#DCE4EC]">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-[#55655F]">Fortaleza de Clave Criptográfica:</span>
                    <span className={`font-bold ${getPasswordStrength(invPass).text}`}>
                      {getPasswordStrength(invPass).label}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${getPasswordStrength(invPass).color}`}
                      style={{ width: `${getPasswordStrength(invPass).pct}%` }}
                    ></div>
                  </div>
                </div>

                {/* Freighter Wallet Pre-Connect */}
                <div className="p-3.5 bg-[#EEF4FF] border border-[#CCDDF7] rounded-xl flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#D9E7FD] text-[#1E3A8A] flex items-center justify-center shrink-0">
                      ★
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#0D1F1B]">¿Dispones de Billetera Stellar?</h4>
                      <p className="text-[11px] text-[#55645E]">Conecta Freighter o Albedo para pre-verificar tu clave pública.</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setInvWalletConnected(!invWalletConnected)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
                      invWalletConnected
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                        : "bg-white text-[#063B32] border border-[#B8D5C8] hover:bg-emerald-50"
                    }`}
                  >
                    {invWalletConnected ? "✓ Freighter Conectado" : "🟢 Conectar Freighter"}
                  </button>
                </div>

                {/* Términos */}
                <label className="flex items-start gap-2.5 text-xs text-[#52625C] cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={invTerms}
                    onChange={(e) => setInvTerms(e.target.checked)}
                    required
                    className="mt-0.5 w-4 h-4 rounded text-[#006244] accent-[#006244]"
                  />
                  <span>
                    Acepto los <strong className="text-[#0D1F1B]">Términos de Servicio</strong> y reconozco la constitución del contrato de sindicación con <strong className="text-[#063B32]">Garantía Mobiliaria de Primer Grado bajo la Ley 1676</strong>, custodiada de forma fiduciaria e inmutable.
                  </span>
                </label>
              </div>
            )}

            {/* PASO 2: KYC */}
            {step === 2 && (
              <div className="space-y-4">
                <div className="p-3.5 bg-[#ECFDF5] border border-[#A7F3D0] rounded-xl flex items-center gap-3 text-xs text-[#065F46]">
                  <span>
                    Validación KYC/SAGRILAFT requerida por la normativa colombiana de Garantías Mobiliarias (RUG / Confecámaras) para emisión de títulos pecuarios.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2A3833] mb-1.5">
                    Cargar Cédula de Ciudadanía o RUT / Certificado Tributario
                  </label>
                  <div
                    onClick={() => setKycDocUploaded(true)}
                    className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                      kycDocUploaded
                        ? "border-emerald-500 bg-emerald-50/50"
                        : "border-gray-300 hover:border-[#006244] bg-[#F9FBFA]"
                    }`}
                  >
                    <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 text-[#006244] flex items-center justify-center mb-2">
                      📁
                    </div>
                    {kycDocUploaded ? (
                      <>
                        <h4 className="text-xs font-bold text-[#065F46]">✓ documento_identidad_titular.pdf (2.4 MB)</h4>
                        <p className="text-[11px] text-gray-500 mt-1">Verificación biométrica automatizada superada con éxito.</p>
                      </>
                    ) : (
                      <>
                        <h4 className="text-xs font-bold text-[#0D1F1B]">Arrastra tu archivo aquí o haz clic para subir</h4>
                        <p className="text-[11px] text-gray-500 mt-1">Formatos permitidos: PDF, JPG o PNG de alta resolución (máx 15MB).</p>
                      </>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2A3833] mb-1.5">
                    Declaración de Origen de Fondos (AML)
                  </label>
                  <select
                    value={kycOrigin}
                    onChange={(e) => setKycOrigin(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#EEF2F6] focus:bg-white text-xs sm:text-sm text-[#0D1F1B] rounded-xl border border-transparent focus:border-[#006244] focus:outline-none cursor-pointer"
                  >
                    <option value="ahorros">Ahorros y Patrimonio Personal / Salario</option>
                    <option value="rendimientos">Rendimientos de Capital / Inversiones Privadas</option>
                    <option value="empresarial">Actividad Comercial de Empresa / Dividendos</option>
                    <option value="agropecuario">Operaciones del Sector Agropecuario / Ganadería</option>
                  </select>
                </div>

                <label className="flex items-start gap-2.5 text-xs text-[#52625C] cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={kycPep}
                    onChange={(e) => setKycPep(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded text-[#006244] accent-[#006244]"
                  />
                  <span>
                    Declaro bajo juramento que no soy una Persona Expuesta Políticamente (PEP) ni tengo vinculación con listas restrictivas internacionales OFAC / ONU.
                  </span>
                </label>
              </div>
            )}

            {/* PASO 3: Custodia Soroban */}
            {step === 3 && (
              <div className="space-y-4">
                <div className="p-4 bg-[#F0F5FF] border border-[#CCDDF7] rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#006244] text-white flex items-center justify-center font-bold">
                      ★
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-[#006244] uppercase tracking-wider block">Billetera Stellar USDC</span>
                      <span className="font-mono text-xs font-bold text-[#0D1F1B]">{invPublicKey}</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                    ✓ Red Soroban Activa
                  </span>
                </div>

                <label className="flex items-center gap-2.5 text-xs text-[#52625C] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={invTrustline}
                    onChange={(e) => setInvTrustline(e.target.checked)}
                    className="w-4 h-4 rounded text-[#006244] accent-[#006244]"
                  />
                  <span>Habilitar Trustline de USDC y contrato inteligente Soroban para liquidación automática.</span>
                </label>

                <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-600 space-y-2">
                  <h4 className="font-bold text-[#0D1F1B]">Resumen de Cuenta de Inversión</h4>
                  <p>• Titular: <strong>{invName || "Carlos Mendoza"}</strong></p>
                  <p>• Modalidad: <strong>{invType === "individual" ? "Persona Natural" : "Entidad Institucional"}</strong></p>
                  <p>• Rango a sindicar: <strong>{invCapital}</strong></p>
                  <p>• Custodia: <strong>Garantía Agraria RUG Ley 1676</strong></p>
                </div>
              </div>
            )}

            {/* Navegación de Pasos */}
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
                    <span>Continuar a {step === 1 ? "Verificación KYC (Paso 2)" : "Custodia Soroban (Paso 3)"}</span>
                    <span>→</span>
                  </>
                ) : (
                  <>
                    <span>Completar Registro de Inversionista</span>
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

        {/* COLUMNA DERECHA: Widgets Inversionista */}
        <aside className="lg:col-span-5 flex flex-col gap-5 w-full">
          {/* Widget 1: Retorno Proyectado */}
          <div className="bg-[#063B32] text-white rounded-2xl p-6 shadow-md border border-[#0B4B40] relative overflow-hidden">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-bold tracking-widest text-[#8DF0B2] uppercase">
                Retorno Proyectado
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#0A4D40] text-[#8DF0B2] border border-[#166353]">
                Ceba Intensiva 2024-2025
              </span>
            </div>

            <div className="my-2">
              <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">14.2%</div>
              <div className="text-xs font-semibold text-[#8DF0B2]">APY Histórico Neto</div>
            </div>

            <p className="text-xs text-[#B5D5C8] leading-relaxed mb-4">
              Rentabilidad vinculada directamente a la ganancia diaria de peso (GDP) de novillos en llanos sostenibles y liquidación en stablecoin USDC.
            </p>

            <div className="bg-[#042822] p-3 rounded-xl border border-[#083E34]">
              <div className="flex justify-between text-[11px] font-semibold text-[#8DF0B2] mb-1">
                <span>Rendimiento Acumulado Ciclos 1-6</span>
                <span>+22.4 kg/mes prom.</span>
              </div>
              <svg viewBox="0 0 300 50" className="w-full h-10">
                <path
                  d="M 5 40 C 60 40, 90 25, 150 25 C 210 25, 240 12, 295 8"
                  fill="none"
                  stroke="#5BCB35"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          {/* Widget 2: Garantías y Protección del Capital */}
          <div className="bg-white rounded-2xl p-6 border border-[#E2E8E5] shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 rounded-lg bg-[#E6F4EA] text-[#006244] flex items-center justify-center">
                ✓
              </div>
              <h3 className="font-extrabold text-sm sm:text-base text-[#0D1F1B]">
                Garantías y Protección del Capital
              </h3>
            </div>
            <p className="text-xs text-[#71807A] mb-4">Mecanismos jurídicos y telemétricos auditados</p>

            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-[#F8FAF9] border border-[#E5EAE7] flex items-start gap-2.5">
                <span className="text-[#059669] font-bold text-sm">✓</span>
                <div>
                  <h4 className="text-xs font-bold text-[#0D1F1B]">Prenda Agraria de 1er Grado</h4>
                  <p className="text-[11px] text-[#55645E]">Inscripción jurídica ante RUG / Confecámaras protegiendo el lote antes del desembolso.</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#F8FAF9] border border-[#E5EAE7] flex items-start gap-2.5">
                <span className="text-[#059669] font-bold text-sm">✓</span>
                <div>
                  <h4 className="text-xs font-bold text-[#0D1F1B]">Telemetría IoT Continua</h4>
                  <p className="text-[11px] text-[#55645E]">Monitoreo de biomasa por pesajes quincenales, aretes RFID y oráculos Chainlink.</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#F8FAF9] border border-[#E5EAE7] flex items-start gap-2.5">
                <span className="text-[#059669] font-bold text-sm">✓</span>
                <div>
                  <h4 className="text-xs font-bold text-[#0D1F1B]">Smart Contracts Soroban</h4>
                  <p className="text-[11px] text-[#55645E]">Custodia no-permisionada y dispersión programática directa en USDC nativo.</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#F8FAF9] border border-[#E5EAE7] flex items-start gap-2.5">
                <span className="text-[#059669] font-bold text-sm">✓</span>
                <div>
                  <h4 className="text-xs font-bold text-[#0D1F1B]">Póliza Paramétrica Climática</h4>
                  <p className="text-[11px] text-[#55645E]">Cobertura automatizada mediante índices satelitales NDVI frente a sequías o inundaciones.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Widget 3: Hacienda Satelital */}
          <div className="bg-white rounded-2xl overflow-hidden border border-[#E2E8E5] shadow-sm">
            <div className="relative h-32 w-full bg-[#1A382D]">
              <Image
                src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=600&q=80"
                alt="Hacienda San Jerónimo"
                fill
                className="object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-3 left-3 text-white">
                <span className="text-xs font-extrabold flex items-center gap-1.5">
                  📍 Hacienda San Jerónimo • Puerto López, Meta
                </span>
              </div>
            </div>
            <div className="p-3.5 flex justify-between items-center text-xs font-semibold text-[#55655F]">
              <span>Lote activo #409: 350 Novillos</span>
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Auditoría Satelital OK
              </span>
            </div>
          </div>

          {/* Widget 4: Testimonio */}
          <div className="bg-white rounded-2xl p-5 border border-[#E2E8E5] shadow-sm">
            <div className="text-amber-400 text-sm mb-2">★★★★★</div>
            <p className="text-xs text-[#40504A] italic leading-relaxed mb-3">
              &ldquo;HatoFi transformó la inversión agropecuaria tradicional en un instrumento de renta fija estructurado, con trazabilidad milimétrica en blockchain y seguridad legal de primer nivel.&rdquo;
            </p>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#006244] text-white flex items-center justify-center font-bold text-xs">
                ME
              </div>
              <div>
                <h5 className="text-xs font-bold text-[#0D1F1B]">Mauricio Echeverry</h5>
                <span className="text-[11px] text-gray-500">CIO en InverLatam Private Wealth</span>
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
          <span className="text-[#059669] font-medium">Infraestructura auditada en red Stellar Soroban v21</span>
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
