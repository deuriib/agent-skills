---
name: wifi-roam-fix
description: Use when WiFi se conecta y desconecta en loop solo con un SSID (otros SSID y moviles funcionan bien) en Arch u Omarchy con iwd + systemd-networkd, tipicamente con Realtek RTL8821CE.
---

# WiFi Roam Fix — loop por ping-pong entre nodos

Síntomas: WiFi se conecta/desconecta en loop solo con un SSID, otros SSID bien,
móviles bien en ese mismo SSID.

Causa típica verificada: el SSID tiene 2 BSSIDs (repetidor/mesh) en el mismo
canal con señal parecida (-66 a -78 dBm). `iwd` con defaults
(`RoamThreshold=-70`) salta cada 1-3 min. Cada salto tira el carrier y
`systemd-networkd` pierde el lease DHCP (incluso contra servidores DHCP
distintos, ej. `192.168.1.1` vs `192.168.1.11`).

## Workflow

1. Diagnosticar con `scripts/wifi-roam-fix.sh diagnose [SSID]`.
   Confirma 2 BSSIDs + `roaming` en `journalctl -u iwd` + `Lost carrier` en
   `systemd-networkd` correlacionados en tiempo.
2. Si hay ping-pong, aplicar fix con `scripts/wifi-roam-fix.sh fix`.
   Crea `/etc/iwd/main.conf` (baja agresividad) + apaga power_save + regla
   udev persistente. Requiere sudo.
3. Verificar con `scripts/wifi-roam-fix.sh verify`.
   Éxito = 0 `roaming` y 0 `Lost carrier` en 10 min + ping sin pérdida.
4. Si la señal está bajo -80 dBm y sigue saltando, escalar a
   `DisableRoamingScan=true` o fijar afinidad a un BSSID (pierde movilidad).
   No tocar el router sin acceso confirmado.

## Archivos

- `scripts/wifi-roam-fix.sh` — diagnose / fix / verify, idempotente, con backup.
- Cambios que hace `fix`: `/etc/iwd/main.conf`,
  `/etc/udev/rules.d/81-wifi-powersave.rules`, `systemctl restart iwd`.

## Límites

- Sin sudo no se puede escribir `/etc/iwd/` ni `/var/lib/iwd/`; en ese caso
  guiar en modo manual (usuario pega los comandos).
- No adivinar sintaxis `iwctl`; validar con `man iwd.config` (RoamThreshold,
  RoamThreshold5G, RoamRetryInterval, DisableRoamingScan).
- Señal bajo -80 dBm = física, no config: acercarse al nodo bueno.

## Archivos

- `scripts/wifi-roam-fix.sh` — diagnose / fix / verify, idempotente, con backup.
- Cambios que hace `fix`: `/etc/iwd/main.conf`,
  `/etc/udev/rules.d/81-wifi-powersave.rules`, `systemctl restart iwd`.
