// Minimal JS action (Node 20 has global fetch)
const core = require('@actions/core');

async function run() {
  try {
    const ip = core.getInput('ip');
    const ips = core.getInput('ips');
    const fields = core.getInput('fields');
    const apiKey = core.getInput('api-key', { required: true });
    const baseUrl = core.getInput('base-url') || 'https://api.ip-check.io';

    if (!ip && !ips) {
      core.setFailed('Provide either "ip" or "ips".');
      return;
    }

    const path = ip ? `/${encodeURIComponent(ip)}` : `/${ips}`;
    const url = new URL(baseUrl.replace(/\/+$/,'') + path);
    url.searchParams.set('key', apiKey);
    if (fields) url.searchParams.set('fields', fields);

    const res = await fetch(url.toString(), { headers: { 'Accept': 'application/json' }});
    const text = await res.text();

    if (!res.ok) {
      core.setFailed(`HTTP ${res.status}: ${text}`);
      return;
    }

    let data;
    try { data = JSON.parse(text); } catch { data = text; }

    // Set outputs
    core.setOutput('json', typeof data === 'string' ? data : JSON.stringify(data));
    // Small human summary
    const summary = Array.isArray(data)
      ? `OK (${data.length} results)`
      : `OK ${data?.ip ? `for ${data.ip}` : ''}`;
    core.setOutput('summary', summary);

    // Log a concise line
    console.log(summary);
  } catch (err) {
    core.setFailed(err.message || String(err));
  }
}

run();
