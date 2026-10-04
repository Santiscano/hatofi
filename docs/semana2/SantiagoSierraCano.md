# Historias de Usuario — Santiago Sierra Cano
**Rol en el proyecto:** Blockchain Architecture & Integration

## Mis historias de usuario

1. **HU-SC01 (Operador de Subasta - Trazabilidad y Arete):**
   * **Como** operador de subasta ganadera aliada,
   * **quiero** acuñar un NFT en Stellar con el identificador oficial del arete (código único) y peso de entrada,
   * **para** que cada animal tenga un gemelo digital inmutable vinculado a su lote de ceba.

2. **HU-SC02 (Ganadero - Consulta simplificada):**
   * **Como** ganadero con baja conectividad,
   * **quiero** consultar el estado de mi lote y los animales a mi cargo usando una interfaz móvil sencilla con billetera embebida,
   * **para** dar seguimiento a mis obligaciones sin gestionar frases semilla complejas.

3. **HU-SC03 (Inversionista - Verificación de métricas):**
   * **Como** inversionista,
   * **quiero** visualizar el histórico de pesaje y eventos veterinarios reportados durante la ceba,
   * **para** monitorear la salud productiva del activo en el que coloqué mi dinero.

4. **HU-SC04 (Subasta - Registro de pesaje final):**
   * **Como** certificador de subasta en la báscula,
   * **quiero** firmar y registrar en blockchain el peso final de salida y el comprobante de báscula del lote,
   * **para** certificar objetivamente el incremento de kilos que determina la ganancia del ciclo.

5. **HU-SC05 (Administrador del Protocolo - Despliegue de contratos):**
   * **Como** desarrollador de HatoFi,
   * **quiero** usar un contrato Factory para desplegar de forma estandarizada los pares Vault / Profit Splitter de cada nuevo lote,
   * **para** reducir costos de gas y evitar errores de configuración en cada ronda ganadera.

6. **HU-SC06 (Ganadero - Retiro ágil de fondos):**
   * **Como** ganadero,
   * **quiero** retirar mi saldo obtenido a moneda local mediante una pasarela/anchor sin fricciones bancarias,
   * **para** comprar insumos agrícolas inmediatamente tras la venta de los bovinos.

---

## La más importante y por qué

* **Orden de mayor a menor importancia:**
  1. HU-SC01 (Acuñación del NFT del bovino con arete)
  2. HU-SC04 (Registro de pesaje final en báscula)
  3. HU-SC05 (Contrato Factory estandarizado)
  4. HU-SC02 (Interfaz móvil con custodia embebida)
  5. HU-SC03 (Monitoreo de métricas y salud)
  6. HU-SC06 (Salida a moneda local vía Anchor)

* **¿Por qué la HU-SC01 es la más importante?:**
  Resuelve el problema central del oráculo físico: conectar el animal real con el registro digital inalterable. Si el arete y los datos del bovino no quedan fijados de manera unívoca al momento de la compra en la subasta, se rompe la confianza entre el inversionista y la existencia tangible del activo ganadero.