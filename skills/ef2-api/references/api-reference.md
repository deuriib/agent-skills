# EF2 API Reference

> Source: https://doc.ef2.do/ — EF2 API v2.0

## Base URL

```
https://master.ef2.do/api2
```

## Authentication

### Login Endpoint

```
POST /auth/login.php
Content-Type: application/json
```

**Request:**
```json
{
  "username": "your_username",
  "password": "tok_your_token_here"
}
```

**Response:**
```json
{
  "success": true,
  "token": "tok_...",
  "empresa": { "nombre": "COMPANY NAME", "rnc": "123456789" }
}
```

**Shortcut:** If password starts with `tok_`, use it directly as `Authorization: Bearer tok_...` without calling login.

### Test Credentials

| Field | Value |
|-------|-------|
| Username | `api_2buy_mliec4sb` |
| Token | `tok_e0f3065a8a7df34785d30b744bf4715b3c3b96759a1a7ca19f354817e4471e2e` |
| RNC Empresa | `132596161` |
| Empresa | `2BUY ELECTRONICS AND SERVICES SRL` |

---

## Invoice Processing

### Send Invoice

```
POST /procesar_factura.php
Content-Type: application/json
Authorization: Bearer {token}
```

**Request body:** JSON with `ECF` structure (see examples).

**Success response:**
```json
{
  "success": true,
  "ncf": "E310000003935",
  "estado": "Aceptado",
  "qr_link": "https://ecf.dgii.gov.do/...",
  "pdf_cloud_url": "https://storage.googleapis.com/..."
}
```

**Error response:**
```json
{
  "success": false,
  "message": "Description of the error"
}
```

---

## ECF JSON Structure

```
ECF
├── Encabezado
│   ├── Version: "1.0"
│   ├── IdDoc
│   │   ├── TipoeCF: "31"|"32"|"33"|"34"|"41"|"43"|"44"|"45"|"46"|"47"
│   │   ├── eNCF: (OPTIONAL — auto-generated)
│   │   ├── FechaVencimientoSecuencia: "dd-mm-yyyy" (NOT for E32)
│   │   ├── IndicadorMontoGravado: "0"|"1" (NOT for E44/E47)
│   │   ├── TipoIngresos: "01"–"06"
│   │   ├── TipoPago: "1"–"3"
│   │   ├── FechaLimitePago: "dd-mm-yyyy" (required for E32)
│   │   ├── IndicadorNotaCredito: "0" (only E34)
│   │   ├── TablaFormasPago: { FormaDePago: [{ FormaPago, MontoPago }] }
│   │   ├── TipoCuentaPago, NumeroCuentaPago, BancoPago (E44, E47)
│   │   └── TerminoPago: string (E46)
│   ├── Emisor
│   │   ├── RNCEmisor: "9 digits"
│   │   ├── RazonSocialEmisor: string
│   │   ├── NombreComercial: string
│   │   ├── DireccionEmisor: string
│   │   ├── Municipio: "6-digit code"
│   │   ├── Provincia: "6-digit code"
│   │   ├── CorreoEmisor: email
│   │   ├── FechaEmision: "dd-mm-yyyy"
│   │   ├── NumeroFacturaInterna: string (optional)
│   │   └── TablaTelefonoEmisor: { TelefonoEmisor: [strings] } (optional)
│   ├── Comprador (NOT for E43; conditional for E32)
│   │   ├── RNCComprador: "9 or 11 digits" (not E47)
│   │   ├── IdentificadorExtranjero: string (E47 only)
│   │   ├── RazonSocialComprador: string
│   │   ├── ContactoComprador: string (optional)
│   │   ├── CorreoComprador: email
│   │   ├── DireccionComprador: string
│   │   ├── MunicipioComprador: "6-digit code"
│   │   └── ProvinciaComprador: "6-digit code"
│   ├── InformacionReferencia (E33/E34 only — INSIDE Encabezado)
│   │   ├── NCFModificado: "E31XXXXXXXXXX"
│   │   ├── RazonModificacion: string (REQUIRED)
│   │   ├── FechaNCFModificado: "dd-mm-yyyy"
│   │   └── CodigoModificacion: "1"–"5"
│   ├── InformacionesAdicionales (E46 — logistics)
│   │   ├── FechaEmbarque, NumeroEmbarque, NumeroContenedor
│   │   ├── PesoBruto, PesoNeto, UnidadPesoBruto, UnidadPesoNeto
│   │   ├── CantidadBulto, UnidadBulto, VolumenBulto, UnidadVolumen
│   │   └── NumeroReferencia
│   ├── Transporte: { NumeroAlbaran: string } (E46)
│   ├── OtraMoneda (E47)
│   │   ├── TipoMoneda: "USD"|"EUR"|etc (ISO 4217)
│   │   ├── TipoCambio: "60.0000"
│   │   ├── MontoExentoOtraMoneda: "3000.00"
│   │   └── MontoTotalOtraMoneda: "3000.00"
│   └── Totales
│       ├── MontoGravadoTotal, MontoGravadoI1 (18%), MontoGravadoI3 (0%, exports)
│       ├── ITBIS1: "18", ITBIS3: "0"
│       ├── TotalITBIS, TotalITBIS1, TotalITBIS3
│       ├── MontoExento
│       ├── MontoTotal
│       ├── ValorPagar (optional)
│       ├── TotalITBISRetenido (E41)
│       └── TotalISRRetencion (E41, E47)
└── DetallesItems
    └── Item: [{
        ├── NumeroLinea: "1"
        ├── IndicadorFacturacion: "1"|"2"|"3"|"4"
        ├── NombreItem: string
        ├── IndicadorBienoServicio: "1"|"2"|"3"|"4"
        ├── DescripcionItem: string (optional)
        ├── CantidadItem: "1" or "1.00"
        ├── UnidadMedida: "43"|"NIU"|etc
        ├── PrecioUnitarioItem: "1500.00"
        ├── MontoItem: "1500.00"
        ├── Retencion (E41, E47): {
        │   IndicadorAgenteRetencionoPercepcion: "1",
        │   MontoITBISRetenido: "1800.00",
        │   MontoISRRetenido: "1000.00"
        │ }
        ├── TablaCodigosItem (E46): {
        │   CodigosItem: [{ TipoCodigo: "INTERNA", CodigoItem: "123456" }]
        │ }
        └── OtraMonedaDetalle (E47): {
            PrecioOtraMoneda: "3000.0000",
            MontoItemOtraMoneda: "3000.00"
          }
    }]
```

---

## ITBIS Calculation

### IndicadorMontoGravado = "0" (ITBIS NOT included in prices)

```
MontoGravadoTotal = sum(MontoItem for gravado items)
TotalITBIS = MontoGravadoTotal * 0.18
MontoTotal = MontoGravadoTotal + TotalITBIS + MontoExento
```

### IndicadorMontoGravado = "1" (ITBIS already included in prices)

```
MontoGravadoTotal = sum(MontoItem) / 1.18
TotalITBIS = sum(MontoItem) - MontoGravadoTotal
MontoTotal = sum(MontoItem) + MontoExento
```

---

## NCF Sequence Management

### Endpoint

```
https://master.ef2.do/api2/ecf_secuencia_api.php
Authorization: Bearer {token}
```

### List ECF Types

```
GET ?resource=tipos_ecf                    # All available types
GET ?resource=tipos_ecf&filter=empresa     # Types configured for your company
```

Response: `{ "success": true, "data": [{ "id": 1, "codigo": "31", "nombre": "...", "prefijo": "E31" }] }`

### Create Sequence Range

```
POST /ecf_secuencia_api.php
{
  "tipo_ecf_id": 1,
  "prefijo": "E31",
  "desde": 1,
  "hasta": 50000,
  "secuencia_actual": 0,
  "fecha_vencimiento": "2028-12-31",
  "estado": true
}
```

Rules:
- Ranges must be DGII-authorized BEFORE registering.
- Continuity: new range `desde` = previous `hasta + 1`. No gaps.
- No overlapping. One active range per type.
- E32 does NOT require `fecha_vencimiento`.

### List Registered Ranges

```
GET /ecf_secuencia_api.php
```

Returns ranges with stats: `secuencias_disponibles`, `porcentaje_uso`, `fecha_vencimiento`.

### Specialized Queries

```
GET ?id=42                          # Specific range
GET ?prefijo=E31                    # Max hasta for prefix (to calculate next desde)
GET ?disponibilidad_prefijo=E31     # Available sequences count
```

### Update Range

```
PUT /ecf_secuencia_api.php
{ "id": 42, "estado": false }       # Deactivate
{ "id": 42, "secuencia_actual": 4500 }  # Adjust counter
```

### Delete Range

```
DELETE /ecf_secuencia_api.php
{ "id": 42 }
```

Only inactive ranges can be deleted. Deactivate first with PUT.

### Typical Flow

1. `GET ?resource=tipos_ecf` → get `id` for the type
2. `GET ?prefijo=E31` → get last `max_hasta`
3. `POST` with `desde = max_hasta + 1`
4. Emit invoices via `POST /procesar_factura.php` — eNCF auto-generated
5. Monitor: `GET ?disponibilidad_prefijo=E31`

---

## Error Catalog

### Validation Errors (API)

| Code | Error | Solution |
|------|-------|----------|
| `VALIDATION_ERROR` | RNCComprador must be 9 or 11 digits | Verify RNC format |
| `VALIDATION_ERROR` | MontoTotal is required | Include MontoTotal in Totales |
| `VALIDATION_ERROR` | TipoeCF not valid | Use: 31, 32, 33, 34, 41, 43, 44, 45, 46, 47 |
| `AUTH_ERROR` | Token required | Add `Authorization: Bearer {token}` header |
| `AUTH_ERROR` | Invalid or expired token | Re-authenticate via `/auth/login.php` |

### DGII Rejection Errors

| Code | Message | Cause / Solution |
|------|---------|------------------|
| 145 | Invalid sequence expiration date | Sequence expired at DGII. Renew via DGII portal |
| 3 | eNCF invalid or already used | eNCF was already sent. Don't resubmit |
| 1209 | Invalid child element | Field not valid for this e-CF type (e.g. IndicadorMontoGravado on E44/E47) |
| -- | No sequence for this RNC/type | Register sequence at DGII portal first |
| -- | NCFModificado not found | For E33/E34: referenced invoice must exist and be accepted |
| -- | Buyer RNC not found | RNC not registered at DGII |
| -- | Total doesn't match detail | Recalculate MontoGravadoTotal, TotalITBIS, MontoTotal |

### Per-Type Restrictions

| Type | Restriction |
|------|-------------|
| E32 | NO `FechaVencimientoSecuencia`. Always `FechaLimitePago`. <250K: no Comprador. ≥250K: real buyer data |
| E33/E34 | `InformacionReferencia` goes INSIDE `Encabezado`. `RazonModificacion` required |
| E43 | NO `Comprador` section. Only `MontoExento` + `MontoTotal` |
| E44 | NO `IndicadorMontoGravado` in IdDoc |
| E47 | NO `IndicadorMontoGravado`. Use `IdentificadorExtranjero` instead of `RNCComprador` |

---

## Catalog Codes

### Unidades de Medida (UnidadMedida)

| Code | Description | Common use |
|------|-------------|------------|
| `43` | Service / Unit | Services, licenses, unit items |
| `NIU` | Unit (alternative) | Products per unit |
| `15` | Liter | Fuels, liquids |
| `21` | Kilogram | Weight, agricultural products |
| `25` | Box | Packaged products |
| `27` | Cubic meter | Volumes, shipments |
| `MTR` | Meter | Length, fabrics |
| `DPC` | Dozen pieces | Products by dozen |
| `GLL` | Gallon | Fuels, paints |
| `LBR` | Pound | Alternative weight |
| `YRD` | Yard | Fabrics, construction |
| `SET` | Set | Kits, tool sets |

### Formas de Pago (FormaPago)

| Code | Description |
|------|-------------|
| `1` | Cash |
| `2` | Check / Transfer / Deposit |
| `3` | Credit / Debit Card |
| `4` | Credit Purchase |
| `5` | Barter |
| `6` | Credit Note |
| `7` | Mixed |

### Tipo de Ingresos (TipoIngresos)

| Code | Description |
|------|-------------|
| `01` | Operating income (non-financial) |
| `02` | Financial income |
| `03` | Extraordinary income |
| `04` | Rental income |
| `05` | Sale of depreciable assets |
| `06` | Other income |

### IndicadorFacturacion (per item)

| Code | Description | ITBIS Rate |
|------|-------------|------------|
| `1` | Taxed ITBIS Rate 1 | 18% |
| `2` | Taxed ITBIS Rate 2 | 16% |
| `3` | Taxed ITBIS Rate 3 | 0% (exports) |
| `4` | ITBIS Exempt | N/A |

### IndicadorBienoServicio

| Code | Description |
|------|-------------|
| `1` | Good |
| `2` | Service |
| `3` | Good and Service |
| `4` | Other |

### CodigoModificacion (E33/E34)

| Code | Description |
|------|-------------|
| `1` | Full invoice cancellation |
| `2` | Text correction / typo |
| `3` | Return of goods |
| `4` | Discount / bonus |
| `5` | Price change |

### Currency Codes (ISO 4217)

| Code | Currency |
|------|----------|
| `DOP` | Dominican Peso |
| `USD` | US Dollar |
| `EUR` | Euro |
| `GBP` | British Pound |
| `CAD` | Canadian Dollar |
| `CHF` | Swiss Franc |

### Main Provinces

| Code | Province |
|------|----------|
| `010000` | Distrito Nacional |
| `020000` | Azua |
| `030000` | Bahoruco |
| `040000` | Barahona |
| `050000` | Dajabon |
| `060000` | Duarte |
| `070000` | Elias Pina |
| `080000` | El Seibo |
| `090000` | Espaillat |
| `100000` | Independencia |
| `110000` | La Altagracia |
| `120000` | La Romana |
| `130000` | La Vega |
| `140000` | Maria Trinidad Sanchez |
| `150000` | Monte Cristi |
| `160000` | Pedernales |
| `170000` | Peravia |
| `180000` | Puerto Plata |
| `190000` | Hermanas Mirabal |
| `200000` | Samana |
| `210000` | San Cristobal |
| `220000` | San Juan |
| `230000` | San Pedro de Macoris |
| `240000` | Sanchez Ramirez |
| `250000` | Santiago |
| `260000` | Santiago Rodriguez |
| `270000` | Valverde |
| `280000` | Monsenor Nouel |
| `290000` | Monte Plata |
| `300000` | Hato Mayor |
| `310000` | San Jose de Ocoa |
| `320000` | Santo Domingo |

### Main Municipalities

| Code | Municipality | Province |
|------|-------------|----------|
| `010100` | Santo Domingo de Guzman | Distrito Nacional |
| `320100` | Santo Domingo Este | Santo Domingo |
| `320200` | Santo Domingo Oeste | Santo Domingo |
| `320300` | Santo Domingo Norte | Santo Domingo |
| `320400` | Boca Chica | Santo Domingo |
| `320600` | Los Alcarrizos | Santo Domingo |
| `250100` | Santiago de los Caballeros | Santiago |
| `230100` | San Pedro de Macoris | San Pedro de Macoris |
| `120100` | La Romana | La Romana |
| `180100` | San Felipe de Puerto Plata | Puerto Plata |
| `130100` | La Vega | La Vega |
| `210100` | San Cristobal | San Cristobal |
| `110100` | Higuey | La Altagracia |
| `060100` | San Francisco de Macoris | Duarte |

---

## Date Format

All dates use `dd-mm-yyyy`:

```
PHP:        date('d-m-Y')
Python:     datetime.now().strftime("%d-%m-%Y")
JavaScript: new Date().toLocaleDateString('es-DO', { day:'2-digit', month:'2-digit', year:'numeric' })
C#:         DateTime.Now.ToString("dd-MM-yyyy")
Java:       LocalDate.now().format(DateTimeFormatter.ofPattern("dd-MM-yyyy"))
Go:         time.Now().Format("02-01-2006")
```

## RNC Validation

```
RNC (empresa): 9 digits     → /^\d{9}$/
Cedula (persona): 11 digits → /^\d{11}$/
Combined: /^\d{9}$|^\d{11}$/
```
