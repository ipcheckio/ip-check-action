# IP Check Lookup (GitHub Action)

Look up IP intelligence (geo, ASN/ISP) and security flags (proxy/VPN/Tor/hosting, threat score) using **ip-check.io**.

## Quick start

1. In your repo, add a secret **`IPCHECK_API_KEY`** (Settings → Secrets and variables → Actions → New repository secret).
2. Create a workflow using the examples below.
3. Pin to **`@v1`** to get compatible updates without breaking changes.

## Inputs

* **`ip`** — single IP (IPv4/IPv6).
* **`ips`** — comma-separated list of IPs (max 200).
  *Provide either `ip` or `ips`.*
* **`fields`** — comma-separated list of fields to include (optional). If omitted, **all fields** are returned.
* **`api-key`** *(required)* — your ip-check.io API key (store as a secret).

## Outputs

* **`json`** — raw JSON response (string).
* **`summary`** — short human summary.

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

## Example Response (Single)
```json
{
  "threat_details": {
    "bogon": false,
    "mobile_ip": false,
    "bot": false,
    "datacenter": true,
    "tor": false,
    "proxy": false,
    "vpn": true,
    "abuser": true,
    "vpn_name": ""
  },
  "location": {
    "ip": "8.8.8.8",
    "continent": "North America",
    "continentCode": "NA",
    "country": "United States",
    "countryCode": "US",
    "region": "California",
    "city": "Sunnyvale",
    "latitude": 37.36883,
    "longitude": -122.03635,
    "postal_code": "95196",
    "flag": {
      "emoji": "🇺🇸",
      "emoji_unicode": "U+1F1FA U+1F1F8"
    }
  },
  "organization": {
    "orgname": "Google LLC",
    "type": "business",
    "domain": "google.com"
  },
  "asn_details": {
    "number": 15169,
    "asn_org": "Google LLC",
    "description": "GOOGLE, US",
    "asn_type": "business",
    "prefix": "8.8.8.0/24",
    "asn_domain": "google.com",
    "country_code": "us",
    "status": true,
    "risk_score": "0.0001 (Very Low)",
    "registry": "ARIN",
    "last_updated": "2012-02-24",
    "abuse_email": "network-abuse@google.com"
  },
  "abuse_reporting": {
    "email": "network-abuse@google.com",
    "phone": "+1-650-253-0000",
    "name": "Google LLC",
    "address": "1600 Amphitheatre Parkway, Mountain View, CA, 94043, US"
  },
  "currency": {
    "code": "USD",
    "symbol": "$"
  },
  "timezone": {
    "timezone": "America/Los_Angeles",
    "local_time": "2024-11-14T14:13:29-08:00",
    "utc": "-08:00",
    "local_time_unix": 1731622409,
    "is_dst": false
  }
}
```

### Get an API Key
##### Create an account at ip-check.io, then add your key as a repo/organization secret named IPCHECK_API_KEY.

### Errors & troubleshooting
* If the request fails (non-2xx), the action fails the step and prints the response body in logs.
* Ensure the secret IPCHECK_API_KEY exists and is referenced as ${{ secrets.IPCHECK_API_KEY }}.
* If you see HTML instead of JSON, verify the base URL and that Accept: application/json is sent (the action already sets it).
