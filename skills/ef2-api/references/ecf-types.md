# e-CF Types — Detailed Rules

> Source: https://doc.ef2.do/ — EF2 API v2.0

## E31 — Factura de Crédito Fiscal

- **Use:** B2B sales between companies with RNC
- **Buyer deduction:** Allows ITBIS deduction for the buyer
- **Required:** Full Comprador section (RNCComprador, RazonSocialComprador, etc.)
- **FechaVencimientoSecuencia:** Required
- **IndicadorMontoGravado:** Required ("0" or "1")
- **DGII Status:** ✅ Accepted — verified

## E32 — Factura de Consumo

- **Use:** Sales to end consumers
- **Two modes based on amount:**
  - **< RD$250,000:** Do NOT send Comprador section. Only Emisor, Items, Totales
  - **≥ RD$250,000:** Full Comprador data required (same as E31)
- **FechaVencimientoSecuencia:** Do NOT include
- **FechaLimitePago:** ALWAYS include
- **DGII Status:** ✅ Accepted — verified

## E33 — Nota de Débito

- **Use:** Additional charges on a previous invoice
- **REQUIRES:** `InformacionReferencia` section INSIDE `Encabezado`:
  - `NCFModificado`: eNCF of the original invoice (must exist at DGII)
  - `RazonModificacion`: mandatory text description
  - `FechaNCFModificado`: date of original invoice
  - `CodigoModificacion`: "1"–"5"
- **Totales:** Only `MontoExento` + `MontoTotal`
- **Items:** Use `IndicadorFacturacion: "4"` (exempt)
- **DGII Status:** ⚠️ Structure valid, requires available sequence

## E34 — Nota de Crédito

- **Use:** Cancellations, returns, discounts
- **REQUIRES:** Same `InformacionReferencia` as E33
- **Extra IdDoc field:** `IndicadorNotaCredito: "0"`
- **Totales:** Include gravado amounts matching original invoice
- **DGII Status:** ✅ Accepted — verified

## E41 — Comprobante de Compra

- **Use:** Purchases with ITBIS and ISR withholdings
- **Items include:** `Retencion` block with:
  - `IndicadorAgenteRetencionoPercepcion: "1"`
  - `MontoITBISRetenido`
  - `MontoISRRetenido`
- **Totales include:** `TotalITBISRetenido`, `TotalISRRetencion`
- **Can include:** `TablaFormasPago` in IdDoc
- **DGII Status:** ⚠️ Structure valid, requires active sequence

## E43 — Gastos Menores

- **Use:** Minor company expenses
- **NO Comprador section** — not required
- **Totales:** Only `MontoExento` + `MontoTotal` (no gravado/ITBIS)
- **Items:** Use `IndicadorFacturacion: "4"` (exempt)
- **DGII Status:** ⚠️ Requires registered E43 sequence

## E44 — Regímenes Especiales

- **Use:** Sales to free trade zones (zonas francas)
- **Bank data required in IdDoc:**
  - `TipoCuentaPago: "CT"`
  - `NumeroCuentaPago: "0301678890090"`
  - `BancoPago: "BANCO POPULAR DOMINICANO"`
- **DO NOT include:** `IndicadorMontoGravado` — DGII rejects it
- **Totales:** Generally `MontoExento` (no ITBIS)
- **DGII Status:** ⚠️ Structure valid

## E45 — Gubernamental

- **Use:** Sales to government institutions
- **Buyer:** Must be a public entity with government RNC
- **Can include:** `InformacionesAdicionales` and purchase order data
- **DGII Status:** ✅ Accepted — verified

## E46 — Exportaciones

- **Use:** Sales abroad
- **ITBIS:** Rate 3 = 0% → `ITBIS3: "0"`, `MontoGravadoI3`, `TotalITBIS3: "0.00"`
- **IndicadorFacturacion:** "3" (tasa 0%)
- **Required logistics data in `InformacionesAdicionales`:**
  - FechaEmbarque, NumeroEmbarque, NumeroContenedor
  - PesoBruto, PesoNeto, CantidadBulto, VolumenBulto (with units)
- **`Transporte`:** `{ NumeroAlbaran: "..." }`
- **Items can include:** `TablaCodigosItem` with `TipoCodigo` + `CodigoItem`
- **DGII Status:** ⚠️ Requires active E46 sequence

## E47 — Pagos al Exterior

- **Use:** Payments to international suppliers
- **Buyer identification:** `IdentificadorExtranjero` instead of `RNCComprador`
- **DO NOT include:** `IndicadorMontoGravado`
- **`OtraMoneda` block required:**
  - `TipoMoneda: "USD"` (ISO 4217)
  - `TipoCambio: "60.0000"`
  - `MontoExentoOtraMoneda`, `MontoTotalOtraMoneda`
- **Items include:**
  - `Retencion` with `MontoISRRetenido`
  - `OtraMonedaDetalle` with `PrecioOtraMoneda` + `MontoItemOtraMoneda`
- **Totales:** `MontoExento` + `MontoTotal` + `TotalISRRetencion`
- **IdDoc includes:** `NumeroCuentaPago`, `BancoPago`
- **DGII Status:** ⚠️ Requires active E47 sequence

---

## DGII Verification Status Summary

| Type | Status | Detail |
|------|--------|--------|
| E31 | ✅ Accepted | Verified at DGII |
| E32 | ✅ Accepted | Verified at DGII |
| E33 | ⚠️ Structure valid | Correct JSON, requires available sequence |
| E34 | ✅ Accepted | Verified at DGII |
| E41 | ⚠️ Structure valid | Requires active sequence |
| E43 | ⚠️ Structure valid | Requires registered E43 sequence |
| E44 | ⚠️ Structure valid | Do NOT include IndicadorMontoGravado |
| E45 | ✅ Accepted | Verified at DGII |
| E46 | ⚠️ Structure valid | Requires active E46 sequence |
| E47 | ⚠️ Structure valid | Requires active E47 sequence |
