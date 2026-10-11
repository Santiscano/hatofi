import Link from "next/link";
import Image from "next/image";

export default function RegisterPage() {
  return <main className="auth-page"><section className="auth-brand"><Image src="/hatofi-logo.png" alt="HatoFi" width={190} height={72} priority /><p>Invierte en lo que<br /><strong>hace crecer al mundo.</strong></p></section><section className="auth-card"><div className="auth-card-inner"><span className="auth-kicker">Comienza hoy</span><h1>Crea tu cuenta</h1><p className="auth-description">Únete a la nueva economía del campo.</p><form><label>Nombre completo<input type="text" placeholder="Tu nombre" /></label><label>Email<input type="email" placeholder="tu@email.com" /></label><label>Contraseña<input type="password" placeholder="Mínimo 8 caracteres" /></label><label className="checkbox terms"><input type="checkbox" /> Acepto los términos y condiciones</label><Link className="primary auth-submit" href="/dashboard/investment">Crear cuenta</Link></form><p className="auth-switch">¿Ya tienes una cuenta? <Link href="/login">Inicia sesión</Link></p></div></section></main>;
}
