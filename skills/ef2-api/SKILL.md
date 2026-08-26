---
name: ef2-api
description: "Trigger: facturacion electronica, e-CF, DGII, NCF, EF2, factura, comprobante fiscal, nota credito, nota debito. Build EF2 API integrations for Dominican Republic electronic invoicing."
license: Apache-2.0
metadata:
  author: deuriib
  version: "2.0"
---

## Activation Contract

Use this skill when building, debugging, or extending integrations with the EF2 API for Dominican Republic electronic invoicing (e-CF) via DGII.

## Hard Rules

- Base URL: `https://master.ef2.do/api2`
- Auth: `POST /auth/login.php` → returns JWT. If password starts with `tok_`, use directly as Bearer Token.
- Invoice endpoint: `POST /procesar_factura.php` with `Authorization: Bearer {token}`
- Sequence management: `GET/POST/PUT/DELETE /ecf_secuencia_api.php`
- eNCF field is OPTIONAL — system auto-generates from registered DGII sequences.
- Date format: `dd-mm-yyyy` everywhere.
- RNC: 9 digits (empresa) or 11 digits (cedula).
- All monetary values as strings with 2 decimals: `"1500.00"`.

## Decision Gates

| e-CF Type | When to use | Key differences |
|-----------|-------------|-----------------|
| E31 | B2B sales (credito fiscal) | Full Comprador required |
| E32 | Consumer sales | <250K: NO Comprador. ≥250K: full Comprador. NO FechaVencimientoSecuencia. Always FechaLimitePago |
| E33 | Debit note | Requires InformacionReferencia with NCFModificado inside Encabezado |
| E34 | Credit note | Requires InformacionReferencia + IndicadorNotaCredito |
| E41 | Purchase receipt | Items include Retencion block. Totals with TotalITBISRetenido |
| E43 | Minor expenses | NO Comprador. Only MontoExento + MontoTotal |
| E44 | Special regimes (zonas francas) | Bank data required. NO IndicadorMontoGravado |
| E45 | Government sales | Public entity as buyer |
| E46 | Exports | ITBIS 0% (ITBIS3). Logistics data required |
| E47 | Foreign payments | IdentificadorExtranjero (not RNC). OtraMoneda block. NO IndicadorMontoGravado |

## Execution Steps

1. Read `references/api-reference.md` for full endpoint docs, field specs, ITBIS calculation, and catalog codes.
2. Read `references/ecf-types.md` for per-type rules and gotchas.
3. Check `examples/json/` for ready-to-use JSON payloads per e-CF type.
4. Build the ECF JSON following the structure: `ECF > Encabezado > {Version, IdDoc, Emisor, Comprador?, Totales, InformacionReferencia?}` + `ECF > DetallesItems > Item[]`.

## References

- `references/api-reference.md` — Full API reference: endpoints, auth, sequences, errors, catalogs.
- `references/ecf-types.md` — Detailed rules per e-CF type with validation notes.
- `examples/json/` — JSON examples for all 10+ e-CF types (e31–e47).
- `examples/EF2_API_Collection.json` — Postman collection.
- `examples/swagger.yaml` — OpenAPI 3.0 spec.
