# IP Check Lookup (GitHub Action)

Look up IP intelligence (geo, ASN/ISP) and security flags (proxy/VPN/Tor/hosting, threat score) using **ip-check.io**.

## Inputs
- `ip`: single IP (IPv4/IPv6)
- `ips`: comma-separated IPs (max 200)
- `fields`: CSV of fields to include (optional)
- `api-key` (required): your ip-check.io API key (store as secret)
- `base-url`: defaults to `https://api.ip-check.io`

## Outputs
- `json`: raw JSON response
- `summary`: short summary string

## Examples

### Single IP
```yaml
- name: IP Check (single)
  uses: ip-check-io/ip-check-action@v1
  with:
    ip: '8.8.8.8'
    fields: 'ip,country,city,asn,proxy,vpn,tor,hosting,threat'
    api-key: ${{ secrets.IPCHECK_API_KEY }}
