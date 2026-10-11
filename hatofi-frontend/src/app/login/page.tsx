import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  return <main className="auth-page"><section className="auth-brand"><Image src="/hatofi-logo.png" alt="HatoFi" width={190} height={72} priority /><p>Activos reales.<br /><strong>Impacto real.</strong></p></section><section className="auth-card"><div className="auth-card-inner"><span className="auth-kicker">Bienvenido de nuevo</span><h1>Ingresa a tu cuenta</h1><p className="auth-description">Continúa construyendo el futuro del campo.</p><form><label>Email<input type="email" placeholder="tu@email.com" /></label><label>Contraseña<input type="password" placeholder="••••••••" /></label><div className="auth-options"><label className="checkbox"><input type="checkbox" /> Recordarme</label><a href="#forgot">¿Olvidaste tu contraseña?</a></div><Link className="primary auth-submit" href="/dashboard/investment">Iniciar sesión</Link></form><p className="auth-switch">¿Aún no tienes una cuenta? <Link href="/register">Crea una aquí</Link></p></div></section></main>;
}
