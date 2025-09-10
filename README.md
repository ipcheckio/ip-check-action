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
```

### Bulk
```yaml
  uses: ip-check-io/ip-check-action@v1
  with:
    ips: '8.8.8.8,1.1.1.1'
    api-key: ${{ secrets.IPCHECK_API_KEY }}
```

### Use the output
```yaml
- id: ipchk
  uses: ip-check-io/ip-check-action@v1
  with:
    ip: '8.8.8.8'
    api-key: ${{ secrets.IPCHECK_API_KEY }}

- name: Print JSON
  run: echo "${{ steps.ipchk.outputs.json }}"
```

### Get an API Key

##### Create an account at ip-check.io, then add your key as a repo/organization secret named IPCHECK_API_KEY.


### Commit, tag, and release
```bash
npm install
git add .
git commit -m "feat: initial release of IP Check Action"
git tag v1.0.0
git push --tags
```
