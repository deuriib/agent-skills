#!/usr/bin/env bash
# wifi-roam-fix — estabiliza loop connect/disconnect por roaming iwd.
# Uso: wifi-roam-fix.sh [diagnose [SSID] | fix | verify]
# Stack: Arch/Omarchy, iwd + systemd-networkd, RTL8821CE (rtw88_8821ce).
set -euo pipefail

MODE="${1:-diagnose}"
SSID="${2:-Alexa 74}"
IFACE="${IFACE:-wlan0}"
WINDOW="${WINDOW:-30 min ago}"
MAIN_CONF="/etc/iwd/main.conf"
UDEV_RULE="/etc/udev/rules.d/81-wifi-powersave.rules"

need_cmd() { command -v "$1" >/dev/null 2>&1 || { echo "Falta comando: $1" >&2; exit 1; }; }

sudo_if_needed() {
  if [ "$(id -u)" -eq 0 ]; then echo ""; else echo "sudo"; fi
}

cmd_diagnose() {
  need_cmd iw
  echo "== Link actual =="
  iw dev "$IFACE" link || true
  echo
  echo "== BSSIDs para SSID '$SSID' (scan dump cache) =="
  iw dev "$IFACE" scan dump 2>/dev/null \
    | awk -v ssid="$SSID" 'BEGIN{b=""} /^BSS /{b=$2} $0 ~ ssid {print b}' \
    | sort -u || true
  echo
  echo "== Señales vistas =="
  iw dev "$IFACE" scan dump 2>/dev/null \
    | grep -A2 "SSID: $SSID" | grep "signal:" | sort | uniq -c || true
  echo
  echo "== Roaming iwd (desde $WINDOW) =="
  journalctl -u iwd --since "$WINDOW" --no-pager 2>/dev/null \
    | grep -cE "state, old: .*roaming|new: roaming" || true
  echo "== Lost carrier networkd (desde $WINDOW) =="
  journalctl -u systemd-networkd --since "$WINDOW" --no-pager 2>/dev/null \
    | grep -c "Lost carrier" || true
  echo
  echo "== Detalle correlacionado (últimos 15) =="
  journalctl -u iwd -u systemd-networkd --since "$WINDOW" --no-pager 2>/dev/null \
    | grep -E "roaming|Lost carrier|Connected WiFi|DHCPv4 address" | tail -n 15 || true
  echo
  echo "Diagnóstico: si ves 2 BSSIDs + roaming cada 1-3 min + Lost carrier pareado,"
  echo "es ping-pong entre nodos. Sigue con: $0 fix"
}

cmd_fix() {
  local SUDO
  SUDO="$(sudo_if_needed)"
  need_cmd iw
  echo "== Backup ${MAIN_CONF} =="
  if [ -f "$MAIN_CONF" ]; then
    $SUDO cp -a "$MAIN_CONF" "${MAIN_CONF}.bak.$(date +%Y%m%d-%H%M%S)"
    echo "backup ok"
  else
    echo "no existía, se crea nuevo"
  fi
  echo "== Escribiendo ${MAIN_CONF} =="
  $SUDO mkdir -p /etc/iwd
  $SUDO tee "$MAIN_CONF" > /dev/null <<'EOF'
[General]
RoamThreshold=-82
RoamThreshold5G=-84
RoamRetryInterval=120
DisableRoamingScan=false
EOF
  cat "$MAIN_CONF"
  echo "== Reiniciando iwd =="
  $SUDO systemctl restart iwd
  sleep 3
  echo "== Estado =="
  iwctl station "$IFACE" show 2>/dev/null | grep -iE "State|Connected network" || iw dev "$IFACE" link || true
  echo "== Power save off (temporal, persiste vía udev) =="
  $SUDO iw dev "$IFACE" set power_save off || echo "WARN: no se pudo apagar power_save"
  iw dev "$IFACE" get power_save || true
  echo "== Regla udev persistente =="
  $SUDO tee "$UDEV_RULE" > /dev/null <<'EOF'
ACTION=="add", SUBSYSTEM=="net", KERNEL=="wlan*", RUN+="/usr/bin/iw dev %k set power_save off"
EOF
  cat "$UDEV_RULE"
  echo
  echo "Fix aplicado. Verifica con: $0 verify"
  echo "Si con señal < -80 dBm sigue saltando, escala a DisableRoamingScan=true"
  echo "(pierde movilidad, solo como último recurso)."
}

cmd_verify() {
  local SHORT="10 min ago"
  echo "== Roaming últimos 10 min (esperado 0-1) =="
  journalctl -u iwd --since "$SHORT" --no-pager 2>/dev/null | grep -c "roaming" || true
  echo "== Lost carrier últimos 10 min (esperado 0) =="
  journalctl -u systemd-networkd --since "$SHORT" --no-pager 2>/dev/null | grep -c "Lost carrier" || true
  echo "== Link =="
  iw dev "$IFACE" link | grep -E "SSID|signal|Connected" || true
  echo "== Ping gateway (5) =="
  local GW
  GW="$(ip r | awk '/^default/ {print $3; exit}')"
  echo "gateway: ${GW:-desconocido}"
  if [ -n "${GW:-}" ]; then ping -c 5 "$GW" | tail -n 4; fi
}

case "$MODE" in
  diagnose) cmd_diagnose ;;
  fix) cmd_fix ;;
  verify) cmd_verify ;;
  *) echo "Uso: $0 [diagnose [SSID] | fix | verify]" >&2; exit 1 ;;
esac
