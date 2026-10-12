# DESIGN.md — HatoFi UI/UX Specification for Google Stitch

## 1. Project Overview & Context

**Project Name:** HatoFi  
**Domain:** Livestock RWA (Real World Assets) Investment & Crowdfunding Protocol on Stellar Blockchain.  
**Core Purpose:** Connect urban and institutional investors with small-scale rural cattle farmers who have pasture capacity but lack working capital to purchase feeder calves.  
**Platform Nature:** Responsive Web Application / Progressive Web App (PWA) designed to be accessible via URL on mobile, tablet, and desktop, easily installed as a home screen shortcut.

---

## 2. Visual Identity & Art Direction

### 2.1 Aesthetic Archetype: "ReFi Luxury Fintech"
The aesthetic blends high-tier dark-mode financial software with nature and regenerative agriculture. It must feel like an institutional Web3 fintech terminal (inspired by **FocusFlow**) fused with the sleek, immersive, frosted-glass simplicity of modern consumer apps (inspired by **Tour AI**). It should **never** look like a rustic, outdated farming site.

### 2.2 Color Tokens
| Token Name | Hex Code | Purpose & Usage |
|---|---|---|
| **Background Dark** | `#0E1514` | Primary app canvas (deep matte obsidian / slate). |
| **Surface Dark** | `#111817` | Card, drawer, and modal surfaces. |
| **Surface Elevated** | `#1A2522` | Hover states, active list items, input field backgrounds. |
| **Primary Brand Green** | `#063B32` | Dark forest emerald for brand anchors and solid header surfaces. |
| **Accent Vibrant Green** | `#5BCB35` | High-impact actions, active tabs, progress bars, positive yields. |
| **Accent Glow** | `#99F84D` | Subtle neon aura and active sparkline chart gradients. |
| **Text Primary** | `#FFFFFF` | Headings, key numbers, primary labels. |
| **Text Muted** | `#94A3B8` | Subtitles, metadata, secondary captions. |
| **Card Border** | `rgba(255, 255, 255, 0.08)` | 1px translucent border for frosted glass cards. |

### 2.3 Typography & Hierarchy
- **Font Family:** `Sora` or `Manrope` (Fallback: `Inter`).
- **Brand Logo:** "Hato" (Font-weight: 600 SemiBold) + "Fi" (Font-weight: 700 Bold).
- **Display Headings:** Large, high-contrast, clean geometric lines.
- **Numbers / Metrics:** Monospace or tabular figures for financial values (e.g. `$32,500.00 USDC`).

### 2.4 UI Patterns & Materials
- **Bento Grid Architecture:** Modular, organized cards of varying proportions with rounded corners (`border-radius: 20px - 28px`).
- **Frosted Glassmorphism:** Subtle background blur (`backdrop-filter: blur(16px)`), soft inner glow, and semi-transparent borders.
- **Pill Badges & Status Chips:** Capsule-shaped tags with micro-indicators (e.g., `● Activo`, `● En Ceba`, `● Subasta`).
- **Tactile Inputs:** Large touch targets (min 48x48 dp) optimized for both desktop cursors and one-handed mobile use in field conditions.

---

## 3. User Personas & Dual UX Architecture

### 3.1 Persona A: The Impact Investor (Desktop / Tablet Focus)
- **Mindset:** Numbers-driven, analytical, values transparency and verified on-chain proof of reserves.
- **Key Tasks:** Browse verified cattle batches, analyze projected APY and fattening timeline, deposit USDC using Freighter wallet, track herd progress and claim profits upon auction sale.

### 3.2 Persona B: The Rural Cattle Farmer (Mobile PWA Focus)
- **Mindset:** Pragmatic, working in rural paddocks, requires zero crypto jargon (displays values in local currency equivalents and kilograms gained).
- **Key Tasks:** Register their farm, view calves assigned under their care, log bi-weekly scale weigh-ins with photos, check accumulated meat weight gained, and request payout.

### 3.3 Persona C: The Auction & Scale Operator (Field Tablet / Mobile)
- **Mindset:** Fast operational logging on public scales.
- **Key Tasks:** Register ear-tag numbers (`#ICA-XXXX`) and certified initial weights on entry; log final sale price and exit weight at auction.

---

## 4. Screen-by-Screen Detailed Specifications

### Screen 1: Investor Dashboard & Batch Catalog (`/investor/explore`)
- **Header:**
  - Logo with green horns/sprout emblem.
  - Category filters: `[Todos los Lotes]` `[Ceba Intensiva]` `[Levante]` `[Raza Brahman]`.
  - Wallet chip: `Freighter Conectado • 14,250 USDC`.
- **Hero Metrics Bento Grid (4 Cards):**
  1. *Total Invertido:* `$32,500.00 USD` (Includes 7-day sparkline).
  2. *Rendimiento Pecuario Promedio:* `14.2% APY` (Green badge `+2.4%`).
  3. *Ganancias Acumuladas:* `$1,850.50 USDC` with quick `[Reclamar]` action.
  4. *Bovinos en Pastoreo:* `185 Cabezas` across 3 active batches.
- **Batch Cards Grid:**
  - High-resolution pasture hero thumbnail.
  - Farm Name: *Hacienda Santa Rosalía* (Location: *Córdoba, Colombia*).
  - Breed Badge: *Brahman Blanco* • Term: *10 Meses*.
  - Funding Progress Bar: Glowing green bar showing `82% financiado ($24,600 / $30,000 USDC)`.
  - Target Return Pill: `15.2% ROI`.
  - Primary CTA: `[Invertir en este Lote]`.
- **Investment Drawer / Modal:**
  - Amount input slider in USDC.
  - Interactive ROI calculator (e.g., "1,000 USDC $\rightarrow$ Retorno Estimado: 1,152 USDC").
  - `[Confirmar Inversión con Stellar]` button.

---

### Screen 2: Farmer Herd Portal (`/farmer/my-herd`) — Mobile First PWA
- **App Bar:**
  - Farm title: *Finca La Cabaña* • Location: *Montería, CO*.
  - Offline sync indicator pill: `● Datos Sincronizados`.
- **Batch Status Hero Card:**
  - Visual timeline: `[Día 1: Entrada]` ➔ `[Mes 4: En Ceba]` ➔ `[Mes 10: Venta]`.
  - Key Counter: `105 Terneros Asignados` • `+58 kg promedio ganado`.
- **Cattle Inventory (Swipeable Cards & List):**
  - Ear Tag Pill: `#ICA-9042`.
  - Entry Weight: `210 kg` ➔ Current Weight: `268 kg` (`+58 kg` gain).
  - Health & Vaccine Status: `● Al día`.
  - Micro-action: `[Actualizar Peso]`.
- **Quick Weight Logging Modal:**
  - Large numeric weight keypad.
  - Camera trigger button to snap picture of the scale display.
  - `[Guardar Pesaje]` button with instant haptic/visual feedback.
- **Bottom Navigation Capsule Bar:**
  - Icons: `[Mi Hato]` `[Lotes]` `[Báscula]` `[Ganancias]`.

---

### Screen 3: Farm Registration & Batch Creation (`/farmer/new-batch`)
- **Step 1: Farm Profile:**
  - Farm Name, department/municipality, total pasture hectares, ICA livestock certificate upload.
- **Step 2: Batch Configuration:**
  - Requested herd capacity (e.g., 50 calves), starting weight estimate (200 kg), fattening timeframe (10 months).
- **Step 3: Funding Target & Summary:**
  - Calculated funding goal in USDC.
  - Submission button: `[Publicar Lote para Financiación]`.

---

### Screen 4: Cycle Settlement & Profit Splitter (`/settlement/:batchId`)
- **Auction Results Header:**
  - Certified Exit Scale Weight: `420 kg promedio`.
  - Total Beef Gain Produced: `+22,050 kg`.
  - Gross Auction Sale Revenue: `$84,000.00 USDC`.
- **Interactive Settlement Splitter (3 Connected Cards):**
  1. *Inversionistas:* Return of principal ($50,000 USDC) + Net Profit Margin ($18,480 USDC).
  2. *Ganadero:* Direct compensation for kilograms gained ($13,440 USD equivalent).
  3. *Protocolo HatoFi:* Platform maintenance & success fee (2.5% = $2,100 USDC).
- **Action Button:** `[Ejecutar Dispersión de Fondos en Stellar]`.

---

## 5. Responsive Behavior & PWA Optimization
- **Desktop ($\ge$ 1024px):** Full bento layout, persistent sidebar navigation, detailed data tables.
- **Tablet (768px - 1023px):** 2-column bento grid, top pill navigation, drawer modals.
- **Mobile ($\le$ 767px):** Single-column stacked cards, sticky floating bottom capsule bar, full-screen touch modals, high-contrast buttons for outdoor sunlight readability.
