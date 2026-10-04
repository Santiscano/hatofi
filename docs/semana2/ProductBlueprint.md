# PRODUCT BLUEPRINT — HATOFI

**Infraestructura de Inversión y Tokenización de Activos Ganaderos sobre Stellar**

**Entregable Grupal — Semana 2 (Blockchain Builders 101)**

*Equipo:* Víctor Manuel Zapata, Santiago Sierra Cano, Jhon Benavides

*Organizaciones aliadas:* Ruta N Medellín, BAF (Blockchain Acceleration Foundation), Stellar Development Foundation (SDF)

---

## 1. PRIORIZACIÓN DE HISTORIAS

El equipo consolidó las historias de usuario individuales propuestas en la Fase 1 y definió el conjunto prioritario que habilita el flujo de valor central de HatoFi:

* **HU-VZ01 (Inversionista - Aporte de Liquidez):** Como inversionista de impacto, quiero depositar fondos en USDC dentro del smart contract vault de un lote ganadero, para financiar la adquisición de terneros y asegurar un rendimiento transparente.
* **HU-SC01 (Operador de Subasta - Identidad del Activo):** Como operador de la subasta ganadera aliada, quiero acuñar un NFT en Stellar con el código del arete oficial y el peso de entrada, para vincular de forma inmutable el bovino físico con su gemelo digital.
* **HU-VZ02 (Ganadero - Asignación Productiva):** Como pequeño ganadero con forraje disponible, quiero recibir la custodia de los terneros adquiridos en subasta a mi nombre dentro del contrato, para iniciar la ceba sin recurrir a créditos usureros.
* **HU-SC04 (Subasta / Báscula - Certificación de Venta):** Como certificador en báscula pública de subasta, quiero firmar y registrar en blockchain el peso final de salida y el monto de venta del lote, para acreditar objetivamente el incremento de carne comercializada.
* **HU-VZ03 (Smart Contract - Liquidación y Quema):** Como contrato Profit Splitter de HatoFi, quiero recibir los fondos de la subasta comercial, quemar el NFT del bovino y liquidar automáticamente los márgenes, para cerrar el ciclo financiero sin custodia discrecional.
* **HU-VZ04 (Inversionista - Retiro de Ganancias):** Como inversionista, quiero ejecutar la función de reclamo de mi capital más la rentabilidad proporcional, para disponer de mis recursos sin demoras ni intermediarios.
* **HU-VZ05 (Ganadero - Compensación por Kilo):** Como productor rural, quiero recibir la dispersión automática de mi pago por ganancia de peso a mi billetera local, para obtener una remuneración justa por mi trabajo.
* **HU-JB05 (UX Rural - Billetera Embebida):** Como ganadero, quiero acceder al sistema mediante autenticación simplificada sin gestionar frases semilla complejas, para interactuar con la red sin fricciones técnicas.

**Criterio de priorización:**

Se aplicó la regla de **viabilidad del flujo de valor central (Happy Path)**. Únicamente pasaron al backlog del MVP las historias indispensables para completar el ciclo productivo y financiero: *Fondeo $\rightarrow$ Tokenización con arete $\rightarrow$ Ceba $\rightarrow$ Venta en subasta $\rightarrow$ Liquidación algorítmica y Quema*. Las historias orientadas a coberturas de seguros paramétricos, telemetría IoT o mercados secundarios de cesión de deuda se postergaron para iteraciones posteriores.

---

## 2. PROPUESTA DE VALOR

HatoFi transforma la capacidad ganadera ociosa en un activo financiero productivo, líquido y transparente. En el modelo rural tradicional, el pequeño ganadero dispone de tierra, pasturas y capacidad de trabajo, pero permanece marginado del sistema financiero formal debido a la falta de garantías hipotecarias, trámites bancarios engorrosos y tasas de interés prohibitivas. Ante esta barrera, el productor se ve forzado a pactar esquemas informales verbales ("al partir") o someterse a prestamistas locales ("gota a gota"), esquemas caracterizados por la desconfianza, la opacidad contable y la pérdida significativa de su margen de ganancia. Por su parte, los inversionistas interesados en diversificar en la economía real pecuaria (RWA) carecen de mecanismos directos, verificables y de bajo costo para fondear ciclos de engorde.

HatoFi resuelve esta desconexión vinculando la liquidez de inversionistas con el trabajo del ganadero mediante la infraestructura descentralizada de Stellar y contratos inteligentes en Soroban. El ganadero recibe terneros de subasta para ceba sin necesidad de endeudarse ni descapitalizarse, asegurando un pago justo, auditable y contractual por cada kilo de carne ganado en su finca. Al mismo tiempo, el inversionista obtiene acceso fraccionado a activos tangibles respaldados por la certificación neutral de subastas comerciales aliadas.

La diferencia frente a las soluciones actuales radica en la sustitución de la confianza interpersonal subjetiva por reglas programadas inmutables. En los acuerdos tradicionales, el ganadero depende de la honestidad del intermediario al momento de liquidar los animales. En HatoFi, la báscula de la subasta aliada actúa como oráculo físico que alimenta el contrato inteligente: las condiciones del lote, el pesaje inicial y el precio de venta final quedan asentados en un registro compartido. Al venderse el ganado, el smart contract dispersa automáticamente los fondos según fórmulas matemáticas predefinidas, eliminando el riesgo de retención fraudulenta y garantizando transparencia para todas las partes.

---

## 3. FLUJO DE USUARIO

El recorrido de la solución conecta al Inversionista, la Subasta Ganadera y el Pequeño Ganadero mediante una secuencia numerada de 7 etapas:

```text
[ Inversionista ] ──( 1. Fondeo USDC )──► [ Vault Soroban ]
                                                 │
                                         ( 2. Desembolso )
                                                 ▼
[ Ganadero ] ◄──( 4. Entrega Terneros )── [ Subasta Aliada ] ◄──( 3. Compra & Mint NFT )
     │
 ( 5. Ceba: 8-12 meses )
     │
     ▼
[ Subasta Aliada ] ──( 6. Pesaje & Venta )──► [ Profit Splitter ]
                                                    │
                               ┌────────────────────┴────────────────────┐
                               ▼                                         ▼
                 [ Inversionista: Capital + Margen ]         [ Ganadero: Pago por Kilo ]
```

1. **Estructuración del Lote:** HatoFi y la subasta aliada auditan y publican un lote de ceba disponible en la plataforma web, detallando la finca validada, número de cabezas estimadas, peso de entrada proyectado y plazo del ciclo.
2. **Fondeo Colectivo (Vault):** El inversionista ingresa al catálogo digital, conecta su billetera y aporta liquidez en USDC al contrato inteligente Vault del lote específico hasta alcanzar la meta financiera establecida.
3. **Adquisición y Aretado Digital:** Al completarse la ronda, el contrato transfiere el capital a la subasta ganadera. Esta adquiere los terneros en pista pública, registra el código del arete oficial y el peso de entrada en báscula, y acuña un NFT representativo (SEP-41) por cada animal en Stellar.
4. **Entrega y Traslado a Finca:** Los bovinos físicos son transportados al predio del ganadero preseleccionado, quien asume el manejo alimenticio y sanitario bajo las condiciones acordadas.
5. **Ciclo de Ceba:** El ganadero desarrolla el engorde durante un período de 8 a 12 meses, registrando bitácoras de sanidad y ganancia de peso a través de la aplicación móvil.
6. **Pesaje y Comercialización Final:** Concluido el engorde, los animales regresan a la subasta ganadera. En báscula pública certificada se fija el pesaje final y se rematan al mejor postor del mercado.
7. **Liquidación, Quema y Dispersión:** La subasta transfiere el dinero bruto de la venta al contrato Profit Splitter. El contrato procesa el pesaje de salida, ejecuta la quema definitiva de los NFTs correspondientes y dispersa automáticamente los recursos: reintegra el capital y margen al inversionista, paga los kilos ganados al ganadero y transfiere la comisión de mantenimiento al protocolo.

---

## 4. ALCANCE DEL MVP

El MVP de HatoFi delimita estrictamente sus funcionalidades para validar de forma rápida la eliminación de la intermediación desleal y la liquidación auditable durante el programa Blockchain Builders 101.

### Funcionalidad dentro del MVP (Core):

* **Vault de Fondeo en Soroban:** Smart contract que recibe y custodia depósitos en stablecoins (USDC en testnet), controlando topes de recaudación, fecha de cierre y función de reembolso automático ante rondas incompletas.
* **Tokenización Individual del Bovino (NFT / SEP-41):** Emisión de tokens no fungibles vinculados a metadatos esenciales e inmutables: identificador de arete oficial, peso de entrada y fecha de remate.
* **Smart Contract Profit Splitter:** Lógica algorítmica encargada de recibir el producto de la comercialización, contrastar peso inicial vs. final, y realizar la dispersión contable no custodial.
* **Mecanismo de Quema (Burn):** Retiro de circulación del activo digital al confirmarse la liquidación comercial en báscula, impidiendo duplicidades o reutilización de registros.
* **Interfaz de Inversión y Billetera Embebida:** Aplicación web responsiva que permite al inversionista explorar lotes y depositar, e integra custodia simplificada para que el ganadero consulte saldos sin gestionar llaves criptográficas complejas.

### Funcionalidad fuera del MVP (Fases posteriores):

* Conectores fiduciarios bancarios directos (rampas fiat automatizadas vía PSE, tarjetas o SPEI).
* Dispositivos de monitoreo remoto en tiempo real (sensores IoT, aretes con telemetría satelital o básculas inteligentes conectadas).
* Módulos de seguros paramétricos automáticos frente a contingencias de sequía o epidemias pecuarias.
* Mercado secundario para la compraventa de participaciones crediticias entre usuarios.

### Justificación del recorte:

El recorte es viable porque la barrera crítica del sector pecuario no es la falta de sensores en el potrero, sino la **exclusión del financiamiento inicial y la desconfianza histórica en la liquidación del ganado vendido**. Al asegurar que el pesaje sea certificado por un actor neutral (la subasta) y que los fondos se repartan mediante fórmulas inalterables en Soroban, el MVP valida la tesis central de confianza y viabilidad económica sin incurrir en complejidades de hardware ni fricciones regulatorias tempranas.

---

## 5. LEAN CANVAS

*Enlace visual en el repositorio:* `docs/semana2/leancanvas.svg`

| Bloque | Descripción aplicada al modelo HatoFi |
| --- | --- |
| **1. Problema** | • Pequeños ganaderos sin capital de trabajo ni acceso al crédito tradicional.<br><br>• Forraje y praderas ociosas por falta de capacidad económica para poblar hatos.<br><br>• Desconfianza, asimetría de información y liquidación opaca en acuerdos informales "al partir". |
| **2. Segmento de Clientes** | • **Productores:** Pequeños y medianos ganaderos con tierra y capacidad de pastoreo disponible.<br><br>• **Inversionistas:** Inversores particulares y fondos fintech interesados en rendimientos respaldados en la economía real pecuaria (RWA). |
| **3. Propuesta de Valor Única** | *Conectamos el capital de inversionistas con la tierra del campesino: ceba de ganado financiada en Stellar y liquidada de forma transparente por contratos inteligentes.* |
| **4. Solución** | • Vaults descentralizados de financiamiento por lote pecuario.<br><br>• Identidad digital del bovino mediante NFTs vinculados al arete oficial de subasta.<br><br>• Contratos inteligentes en Soroban para dispersión automática de utilidades post-venta. |
| **5. Canales** | • Alianzas estratégicas con subastas ganaderas comerciales y comités ganaderos regionales.<br><br>• Plataforma web responsiva y comunidades de finanzas descentralizadas (DeFi/RWA). |
| **6. Estructura de Ingresos** | • Tarifa de originación y estructuración tecnológica por lote financiado (1.5% a 2.5% del vault).<br><br>• Comisión de éxito (*success fee*) del 2% al 4% sobre la utilidad neta liquidada en la venta final. |
| **7. Estructura de Costos** | • Auditoría y despliegue de smart contracts en Soroban y mantenimiento de frontend.<br><br>• Visitas de validación técnica e inspección zootécnica en fincas participantes.<br><br>• Soporte legal para acuerdos marco de cuentas en participación y costos operativos locales. |
| **8. Métricas Clave** | • Valor Total Bloqueado (TVL) en contratos Vault (USDC).<br><br>• Número de animales tokenizados y fincas de ceba activadas.<br><br>• Ganancia media diaria de peso (GMD) y porcentaje de rendimiento neto distribuido a tiempo. |
| **9. Ventaja Diferencial** | Integración directa con subastas ganaderas como oráculos físicos neutrales en báscula pública y dispersión algorítmica no custodial en Soroban. |

---

## 6. BACKLOG PRIORIZADO (KANBAN)

El backlog priorizado del MVP se encuentra configurado y organizado en el tablero oficial de GitHub Projects:

* **Tablero Kanban:** [Backlog · Backlog Hatofi](https://github.com/orgs/hatofi/projects/5)

### Historias del Sprint Backlog y Criterios de Aceptación:

#### Tarjeta 1: HU-VZ01 - Depósito en Vault de Inversión

* **Como** inversionista de impacto, **quiero** depositar fondos en USDC dentro del smart contract vault de un lote ganadero, **para** financiar la adquisición de terneros y asegurar un rendimiento transparente.
* **Criterios de Aceptación:**
  1. El contrato en Soroban recibe y almacena depósitos en token USDC (testnet), acreditando el balance correspondiente a la dirección pública del inversor.
  2. El vault rechaza automáticamente transferencias cuando el monto recaudado alcanza el tope máximo fijado (*hard-cap*).
  3. Si la meta de recaudación no se cumple antes de la fecha límite, se activa la función pública de retiro total (`refund`) sin penalidades.

#### Tarjeta 2: HU-SC01 - Minting de NFT Bovino

* **Como** operador de subasta aliada, **quiero** acuñar un NFT en Stellar con el identificador del arete oficial y peso inicial, **para** crear un gemelo digital inmutable del animal.
* **Criterios de Aceptación:**
  1. El contrato emite un token (SEP-41) con metadatos inmutables que contienen el código único del arete, fecha, raza y peso inicial de báscula.
  2. La función de acuñación (`mint`) solo puede ser invocada por la cuenta autorizada correspondiente a la subasta ganadera aliada.
  3. El registro del token es verificable y consultable de forma pública en el explorador de la red Stellar.

#### Tarjeta 3: HU-VZ03 - Profit Splitter y Quema de Token

* **Como** contrato Profit Splitter de HatoFi, **quiero** recibir los fondos de la subasta comercial, quemar el NFT del bovino y liquidar automáticamente los márgenes, **para** cerrar el ciclo financiero sin custodia discrecional.
* **Criterios de Aceptación:**
  1. Al recibir la transferencia por venta comercial, el contrato deduce el capital de adquisición y calcula el margen neto en función del peso registrado en báscula de salida.
  2. El contrato invoca la instrucción de quema irreversible (`burn`) sobre los NFTs del lote, evitando duplicidades de activos en el mercado.
  3. Se habilitan los saldos de cobro (`claim`) independiente para el ganadero, los inversores y la plataforma, respetando los porcentajes definidos.

#### Tarjeta 4: HU-JB05 - Billetera Embebida e Inclusión Rural

* **Como** pequeño ganadero, **quiero** acceder a la plataforma mediante una billetera embebida ligada a credenciales simples, **para** consultar mis compromisos y saldos sin gestionar claves privadas complejas.
* **Criterios de Aceptación:**
  1. El usuario se autentica mediante correo electrónico o credenciales biométricas locales, abstrayendo la administración directa de la llave secreta.
  2. La interfaz muestra los valores en pesos colombianos de referencia y su equivalencia en stablecoins de forma comprensible.
  3. Las operaciones de firma requeridas por el ganadero se ejecutan en segundo plano con confirmación visual sencilla.

---

## 7. ARQUITECTURA INICIAL

La arquitectura inicial de HatoFi adopta un diseño híbrido desacoplado que minimiza los costos en blockchain, resguarda la privacidad de datos operativos y garantiza un acceso rápido para entornos rurales con conectividad variable:

```text
┌────────────────────────────────────────────────────────┐
│                   CAPA DE USUARIO                      │
│   [ Interfaz Web / Móvil: Next.js + Tailwind CSS ]     │
│       │                                    │           │
│       │ (Billetera Embebida / Freighter)   │ (HTTPS)   │
└───────┼────────────────────────────────────┼───────────┘
        ▼                                    ▼
┌───────────────────┐              ┌─────────────────────┐
│   RED STELLAR /   │              │   LÓGICA OFF-CHAIN  │
│      SOROBAN      │              │ (Node.js API + DB)  │
│                   │              │                     │
│ [ Vault Contract ]│              │ • Metadatos fincas  │
│        │          │              │ • Historial visitas │
│        ▼          │              │ • Registro pesajes  │
│  [ NFT SEP-41 ]   │              │ • Cache explorador  │
│        │          │              └─────────────────────┘
│        ▼          │                         ▲
│ [ Profit Splitter]│                         │
│ (Burn & Dispersa) │◄──────(Horizon / RPC)───┘
└───────────────────┘
```

* **Capa de Presentación:** Interfaz web responsiva desarrollada en Next.js y Tailwind CSS. Implementa bibliotecas de billetera embebida para productores rurales y conexión directa con billeteras Web3 (Freighter) para inversionistas, facilitando una experiencia de usuario sin fricción técnica.
* **Capa de Lógica y Datos (Off-Chain):** Servicios backend basados en Node.js conectados a una base de datos relacional PostgreSQL. Esta capa gestiona información pesada que no requiere verificación descentralizada (archivos fotográficos, informes agronómicos, geolocalización de potreros y bitácoras intermedias), evitando saturar el almacenamiento de los contratos inteligentes y abaratando costos.
* **Capa Blockchain (Stellar & Soroban):** La red entra en acción exclusivamente en los puntos donde concurre el intercambio económico y la necesidad de un registro inalterable entre actores sin confianza previa:
  1. *Captación:* El contrato Vault bloquea los aportes de capital en cuentas auditables hasta cumplir la condición de cierre del lote.
  2. *Representación:* El contrato de tokenización acuña los tokens SEP-41 vinculados al arete físico oficial de la subasta.
  3. *Liquidación y Dispersión:* El contrato Profit Splitter procesa el pago final de la subasta, ejecuta la quema del token y pone a disposición los saldos correspondientes a cada parte.

---

## 8. USO DE STELLAR Y JUSTIFICACIÓN

La elección de Stellar y el entorno de contratos inteligentes Soroban responde rigurosamente a las exigencias operativas y a los criterios de pertinencia definidos en el Problem Brief:

1. **Smart Contracts en Soroban (Rust):** Constituyen el mecanismo esencial para automatizar la confianza entre actores que no se conocen (inversores urbanos y productores agropecuarios). Permiten programar reglas inmutables de recaudación y dispersión financiera: los recursos aportados solo pueden dirigirse a la cuenta de la subasta autorizada y, una vez comercializados los bovinos, los ingresos se liquidan según fórmulas matemáticas cerradas, impidiendo desvíos discrecionales de fondos.
2. **Estándar de Tokenización RWA (SEP-41 / NFTs con ciclo de vida):** Permite certificar la existencia y el estado del activo biológico. Cada bovino cuenta con una representación digital unívoca amarrada a su arete físico. Al aplicar la quema obligatoria tras la venta en pista, el protocolo impide el doble financiamiento, la simulación de garantías o la comercialización duplicada de un mismo animal en mercados paralelos.
3. **Comisiones Mínimas de Red (~0.00001 XLM / 100 stroops por operación):** El negocio de ceba pecuaria opera con márgenes financieros estrechos. Las tarifas casi nulas de Stellar permiten realizar depósitos fraccionados, acuñaciones y dispersiones de rentabilidad sin erosionar los ingresos netos del pequeño ganadero ni los retornos del inversionista.
4. **Finalidad Rápida de Consenso (~5 segundos vía FBA / SCP):** La velocidad de confirmación del protocolo de consenso federado de Stellar asegura la sincronización en tiempo real requerida en las subastas ganaderas físicas, permitiendo confirmar pagos y transferir la titularidad de los lotes sin cuellos de botella operativos en pista de pesaje.
5. **Ecosistema de Anchors y Monedas Estables (USDC):** Permite operar bajo una unidad de cuenta estable libre de la volatilidad propia de los criptoactivos especulativos. Asimismo, la red de anchors de Stellar abre el camino para integrar pasarelas de intercambio a moneda local, asegurando que el productor pueda convertir sus saldos de manera ágil para la compra de concentrado, insumos veterinarios y servicios en su economía regional.
