# Documentación Grupal — Semana 3: Functional Proof

**Proyecto:** HatoFi — Infraestructura de Inversión y Tokenización de Activos Ganaderos sobre Stellar (RWA)  
**Programa:** Blockchain Builders 101  
**Equipo:** Víctor Manuel Zapata, Santiago Sierra Cano, Jhon Benavides  

---

## 1. Front construido

Para el desarrollo del MVP de HatoFi, el equipo construyó la interfaz de usuario utilizando el framework **Next.js (App Router, versión 16 con React 19)** y **Tailwind CSS v4**, organizada bajo el directorio `hatofi-frontend/`. Esta interfaz materializa el recorrido de valor central definido en el Product Blueprint de la Semana 2, habilitando los puntos de interacción para los dos actores fundamentales del protocolo: el **Inversionista** y el **Ganadero Rural**.

La aplicación implementa una arquitectura web moderna, con un sistema de diseño de alto impacto visual ("ReFi / Dark Mode Fintech") que combina superficies en gris carbón y obsidiana con acentos en verde esmeralda y verde lima brillante, reflejando tanto la sostenibilidad del campo como el rigor de las finanzas descentralizadas.

Las pantallas y vistas implementadas son las siguientes:

### A. Autenticación y Onboarding (`/login` y `/register`)
- **Pantalla de Inicio de Sesión (`/login`):**
  - Permite a los usuarios acceder a su panel de control introduciendo sus credenciales (correo electrónico y contraseña).
  - Incluye opciones de persistencia de sesión ("Recordarme"), recuperación de contraseña y enlace directo hacia el registro.
  - Presenta la identidad de marca de HatoFi acompañada del lema del protocolo: *"Activos reales. Impacto real."*
- **Pantalla de Registro (`/register`):**
  - Permite la creación de nuevas cuentas solicitando nombre completo, correo electrónico y contraseña segura.
  - Diseñada para conectar con el backend de roles (`investor` y `farmer`), sentando las bases para direccionar a cada usuario a su interfaz operativa respectiva.
  - Cuenta con aceptación de términos y condiciones orientados a la inversión en activos agropecuarios reales (RWA).

### B. Shell del Dashboard y Navegación Global (`dashboard-shell.tsx`)
- **Barra Lateral (Sidebar):**
  - Muestra la marca HatoFi y el identificador de rol activo.
  - Menú de navegación principal con accesos a: *Explorar Lotes* (`/dashboard/investment`), *Mi Finca* (`/dashboard/my-farm`), *Liquidaciones*, *Analítica Pecuaria* y *Billetera Soroban*.
  - Pie de barra lateral con estado en tiempo real de la red (**Stellar Testnet / Soroban Online**) y visualización de la cuenta conectada.
- **Barra Superior (Topbar):**
  - Oráculo de mercado en vivo que refleja el precio de referencia por kilo de carne en pie (`$8,950 COP (~$2.28 USD)`), vital para las proyecciones de rentabilidad de ambos actores.
  - Indicador de saldo líquido disponible en billetera en moneda estable (`$14,250.00 USDC`).
  - Accesos rápidos a notificaciones operativas y perfil de usuario.

### C. Mercado Primario de Inversión Pecuaria (`/dashboard/investment`)
Esta vista corresponde al flujo del **Inversionista (HU-VZ01)** del Product Blueprint:
- **Hero de Mercado:** Explica la propuesta de valor de financiamiento colectivo para lotes de terneros de ceba con garantías prendarias e indexación a contratos inteligentes Soroban.
- **Cuadrícula de Métricas Clave (Bento Grid):**
  - *Total Invertido:* Muestra el capital acumulado en bóvedas (`$32,500.00 USDC`) con gráfica de tendencia (*sparkline* trimestral).
  - *Rendimiento Promedio (APY Real):* Despliega la tasa proyectada del `14.2% APY`, indexada al incremento de biomasa de carne en pie.
  - *Dividendos Disponibles:* Visualiza los rendimientos generados listos para cobro (`$1,850.50 USDC`) junto a un botón interactivo de reclamo (`Reclamar Dividendos`).
  - *Bovinos en Monitoreo:* Refleja la población activa respaldada (`185 Cabezas activas`) distribuidas en 3 lotes con aretes oficiales certificados.
- **Catálogo de Lotes Disponibles:**
  - Pestañas de filtrado por categoría (*Todos los Lotes*, *Ceba Intensiva*, *Cría & Levante*, *Certificados ICA*).
  - Tarjetas detalladas por lote ganadero (ej. *Hacienda Santa Rosalía*, *Finca El Mirador*, *Hacienda San Benito*) que exponen:
    - Fotografía de praderas de la finca, código oficial del lote y rendimiento pactado (% APY).
    - Datos zootécnicos: Raza de los terneros (Brahman Rojo, Brangus, Exportación), plazo de engorde (6 a 10 meses) y población de reses.
    - Barra de fondeo en tiempo real con porcentaje recaudado vs. meta financiera en USDC y ticket mínimo de entrada ($100 USDC).
    - Botón de acción `"Invertir en este Lote"`, que despliega la confirmación y simulación de la operación.

### D. Panel de Gestión Pecuaria — Mi Finca (`/dashboard/my-farm`)
Esta vista corresponde al flujo del **Ganadero Rural (HU-VZ02 y HU-SC01)** del Product Blueprint:
- **Resumen Operativo de la Finca:** Métricas específicas para el productor: cabezas de ganado bajo su cuidado (185 cabezas con identificación RFID), lotes activos en pastoreo (3 lotes), índice de salud zootécnica (98.4%) y fecha estimada para la próxima liquidación de venta en subasta.
- **Bitácora de Actividades y Pesajes Recientes:** Registro cronológico de eventos en potrero que alimentan la trazabilidad off-chain y on-chain: controles sanitarios preventivos, reportes de pesajes con ganancia media diaria (+12 kg promedio) y tareas pendientes de infraestructura.
- **Acceso a Registro:** Botón para registrar nuevas actividades de manejo y pesaje en báscula.

---

## 2. Decisión técnica: contratos

### Opción elegida: **A. Contrato propio**

El equipo decidió de manera unánime desarrollar **contratos inteligentes propios en Soroban (Rust)** para gobernar la lógica central de HatoFi, en lugar de utilizar exclusivamente herramientas prefabricadas del ecosistema.

### Justificación de la decisión:
En el *Product Blueprint* se definió que la propuesta de valor de HatoFi descansa en la eliminación de la intermediación desleal y la desconfianza histórica en la liquidación ganadera tradicional ("al partir"). Para lograr esto, se requiere un flujo automatizado y no custodial compuesto por tres responsabilidades críticas:

1. **Bóveda de Fondeo Condicional (Vault con Hard-Cap y Refund):**
   El contrato debe recibir depósitos en USDC de múltiples inversionistas hasta alcanzar la meta de compra del lote. Si la meta no se recauda antes de la fecha límite (*deadline*), el contrato debe habilitar el reembolso automático total (`refund`) sin intervención humana. Las herramientas estándar de emisión de activos no proporcionan esta lógica de tesorería condicional.
2. **Ciclo de Vida del Activo Biológico (NFT SEP-41 con Arete Oficial y Quema):**
   Cada ternero adquirido en subasta se representa mediante un token digital vinculado inmutablemente a su código de arete oficial y su peso inicial de báscula. El contrato debe restringir la acuñación exclusivamente a la dirección de la subasta aliada y forzar la quema irreversible (`burn`) una vez el animal regresa a la báscula de remate, evitando duplicidades de garantías o venta paralela.
3. **Distribución Algorítmica de Utilidades (Profit Splitter por Ganancia de Biomasa):**
   La dispersión financiera al liquidar el ganado no es una división simple porcentual fija. Depende de la fórmula matemática de ganancia de peso:
   $$\Delta W = W_{\text{final}} - W_{\text{inicial}}$$
   El contrato debe recibir los fondos brutos del remate, devolver el capital principal a los inversores, pagarle al campesino directamente por cada kilo de carne ganado en su finca ($\Delta W \times \text{tarifa\_kilo}$), y deducir la comisión de mantenimiento de HatoFi. 

### Alternativas del ecosistema evaluadas y descartadas:
- Se evaluó utilizar únicamente **cuentas multifirma estándar y transacciones pre-autorizadas de Stellar clásico**. Se descartaron porque no tienen la capacidad de computar dinámicamente fórmulas matemáticas de liquidación basadas en peso de báscula ni de almacenar metadatos de ciclo de ceba.
- Se evaluó usar plataformas de crowdfunding existentes en Web3; se descartaron debido a que no soportan la vinculación de aretes ganaderos como oráculos físicos ni el mecanismo de compensación por peso ganado para inclusión financiera rural.

Por tanto, crear contratos propios en Soroban es el único camino técnico que garantiza la ejecución autónoma, auditable y segura del modelo económico de HatoFi.

---

## 3. Participación del equipo

| Integrante | Usuario de GitHub | Aporte y Responsabilidad en el Entregable 3 |
|---|---|---|
| **Víctor Manuel Zapata** | [`@vzapatav`](https://github.com/vzapatav) | Coordinación del entregable, diseño conceptual de la experiencia de usuario (UI/UX), estructuración de las vistas en Next.js (`/login`, `/register`, `/dashboard/investment`) y redacción de la documentación grupal. |
| **Santiago Sierra Cano** | [`@Santiscano`](https://github.com/Santiscano) | Definición de la arquitectura técnica y contratos Soroban, diseño del flujo de datos de lotes y pesajes, estructuración del backend API y definición de la decisión técnica de contratos propios. |
| **Jhon Benavides** | [`@JhonMB`](https://github.com/JhonMB) | Implementación de componentes de frontend, maquetación de métricas y estilos en Tailwind CSS, estructuración de la vista de gestión ganadera (`/dashboard/my-farm`) y validación de ejecución local. |

---

## 4. Bloqueos y siguiente paso

### Bloqueos identificados:
- **Integración de Billetera Web3:** La versión actual del frontend muestra saldos y direcciones simuladas; se requiere instalar e integrar `@stellar/freighter-api` y `@stellar/stellar-sdk` para permitir firmas de transacciones reales en Stellar Testnet.
- **Conexión Frontend - Backend:** Las pantallas actuales operan con datos estáticos en memoria. Falta conectar las peticiones HTTP con los endpoints desarrollados en la API (`hatofi-api`) para registro, login, consulta de lotes y pesaje de bovinos.

### Siguientes pasos hacia el MVP:
1. **Semana 4 (Smart Contracts en Soroban):** Escribir y compilar en Rust los contratos inteligentes propios de `HatoFiVault` y `HatoFiProfitSplitter` bajo `wasm32v1-none` y desplegarlos en Stellar Testnet.
2. **Conexión de APIs:** Conectar los formularios del frontend con el backend FastAPI para persistencia de usuarios, fincas y lotes.
3. **Flujo End-to-End en Testnet:** Realizar la primera prueba funcional completa: *Depósito en Vault con Freighter $\rightarrow$ Registro de arete $\rightarrow$ Cierre de lote y dispersión de fondos*.
