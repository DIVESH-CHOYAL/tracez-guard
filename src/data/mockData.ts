export const mockScanData = {
  filename: "WhatsApp_Mod_v2.apk",
  verdict: "DANGEROUS" as const,
  risk_score: 89,
  hash: "a3f2c9d84e11b72f38cc901456de8fa29c3b77e041d2891f5a63e09b14c82031",
  ai_explanation: "This app is a renamed variant of XLoader spyware, confirmed by AI similarity analysis at 91% match. It silently reads your SMS messages, records audio, and contacts command server 103.145.21.87 immediately on launch. VirusTotal shows 0/70 flags because the package name was changed. Do not install this application under any circumstances.",
  findings: [
    {
      id: 1,
      title: "XLoader Spyware SDK Detected",
      severity: "CRITICAL" as const,
      trzId: "TRZ-LIB-a3f2c9d84e11",
      layer: "L6 + L7",
      description: "XposedSpy SDK found as 'com.xload3r.agent'. AI similarity engine matched this to TRZ-LIB-a3f2c9d84e11 (XLoader) at 91.3% cosine similarity. This library harvests SMS messages, contacts, and device identifiers.",
    },
    {
      id: 2,
      title: "SMS Exfiltration Combo Rule Triggered",
      severity: "CRITICAL" as const,
      trzId: "TRZ-COMBO-f82a1c3d9e44",
      layer: "L2 + L6",
      description: "All three conditions met: (1) XLoader SDK present, (2) READ_SMS + SEND_SMS permissions declared, (3) SmsManager.sendTextMessage() called in bytecode. This is the exact fingerprint of SMS theft malware.",
    },
    {
      id: 3,
      title: "Unexpected Network Calls in Sandbox",
      severity: "HIGH" as const,
      trzId: null,
      layer: "L3",
      description: "During AI sandbox test 'Open app and navigate menu', the APK made 5 outbound HTTPS calls to 103.145.21.87:443 — a Romanian IP with no legitimate app reason. A calculator should make 0 network calls.",
    },
    {
      id: 4,
      title: "Hardcoded C2 Server IP in Bytecode",
      severity: "HIGH" as const,
      trzId: null,
      layer: "L2",
      description: "IP address 103.145.21.87 found hardcoded in bytecode string constants. Legitimate apps use domain names, not raw IPs. This is a command-and-control server address baked directly into the compiled code.",
    },
    {
      id: 5,
      title: "Self-Signed Certificate",
      severity: "MEDIUM" as const,
      trzId: null,
      layer: "L2",
      description: "APK signed with self-signed certificate. Issuer and subject are identical. Certificate serial: 0x1a2b3c4d. Not from a trusted CA. Real WhatsApp is signed by WhatsApp LLC's Play Store certificate.",
    },
  ],
  layer_summary: [
    { layer: "L1", name: "Hash Check", status: "clean" as const, message: "0/70 VT engines · 4 databases checked" },
    { layer: "L2", name: "Static Scan", status: "danger" as const, message: "3 critical permissions · 1 IP · self-signed cert" },
    { layer: "L3", name: "AI Sandbox", status: "danger" as const, message: "5 unexpected network calls detected" },
    { layer: "L4", name: "URL Intel", status: "warn" as const, message: "Not applicable for APK scan" },
    { layer: "L5", name: "AI Verdict", status: "done" as const, message: "DANGEROUS · Score 89" },
    { layer: "L6", name: "SDK Scan", status: "danger" as const, message: "XposedSpy SDK · SMS combo rule triggered" },
    { layer: "L7", name: "Similarity", status: "danger" as const, message: "91% match to XLoader · TRZ-LIB-a3f2c9d84e11" },
  ],
};

export const layerSteps = [
  { id: "L1", name: "Hash Check", desc: "64-char fingerprint vs 4 global threat databases", delay: 1100, runMsg: "Sending SHA-256 fingerprint to VirusTotal, MalwareBazaar, URLhaus, OTX...", doneMsg: "0 / 70 VirusTotal engines flagged · MalwareBazaar: clean · OTX: clean" },
  { id: "L2", name: "Static Scan", desc: "Reads every permission and byte of compiled code", delay: 2400, runMsg: "Unpacking APK · Reading AndroidManifest.xml · Parsing DEX bytecode...", doneMsg: "3 dangerous permissions · 1 IP found in bytecode · Self-signed cert" },
  { id: "L3", name: "AI Sandbox", desc: "Runs in fake phone, watches what it actually does", delay: 3800, runMsg: "Launching in isolated Docker environment · AI generating test cases...", doneMsg: "Unexpected: 5 network calls during calculation · Environment-sensitive behaviour detected" },
  { id: "L4", name: "URL Intel", desc: "Follows redirects, checks domain age and typosquats", delay: 1900, runMsg: "Tracing redirect chain · Querying WHOIS · Checking Safe Browsing...", doneMsg: "3 redirects resolved · Final domain: 4 days old · No blocklist hits" },
  { id: "L5", name: "AI Verdict", desc: "Translates all signals into plain English", delay: 4100, runMsg: "Aggregating all layer signals · Calculating risk score · Writing explanation...", doneMsg: "DANGEROUS · Score: 89 · AI explanation generated" },
  { id: "L6", name: "SDK Scan", desc: "Finds malicious libraries hidden in third-party code", delay: 2800, runMsg: "Extracting 847 class namespaces · Matching against threat database...", doneMsg: "XposedSpy SDK found (com.xposedspy.agent) · SMS Exfiltration combo rule triggered" },
  { id: "L7", name: "Similarity", desc: "Catches renamed variants at 91% match", delay: 3200, runMsg: "Generating AI embedding vector · Running cosine similarity search...", doneMsg: "91% match: TRZ-LIB-a3f2c9d84e11 (XLoader) · Variant confirmed" },
];

export const privacyLogLines = [
  "→ Computing SHA-256 hash: a3f2c9d84e11b72f38cc901456de8fa29c3b77e041...",
  "→ File bytes discarded. RAM cleared. Only hash string retained.",
  "→ Querying VirusTotal API: POST /files/{hash}/analyse",
  "→ Temporary APK file deleted from server.",
  "→ All external APIs received hash only. Zero file bytes transmitted.",
];

export const trzDatabaseEntries = [
  { id: "TRZ-LIB-a3f2c9d84e11", name: "XLoader Spyware SDK", category: "Spyware", severity: "CRITICAL", matched: 847, dateAdded: "2024-11-02", description: "XLoader is a commercial spyware SDK sold on dark web forums. Originally packaged as 'com.xloader.sdk', it has been observed repackaged under dozens of alternative namespaces. Primary function: SMS harvesting, contact exfiltration, device fingerprinting.", patterns: ["com.xloader.sdk", "com.xload3r.agent", "com.analytics.loader", "io.xlfork.base"], verdict: "Any APK containing XLoader or its variants should be considered a credential-stealing spyware. Do not install. Report to your device manufacturer.", firstSeen: "2023-04-12", timesMatched: "847 scans" },
  { id: "TRZ-LIB-f82a1c3d9e44", name: "SpyNote Remote Access Tool", category: "Spyware", severity: "CRITICAL", matched: 412, dateAdded: "2024-10-18", description: "SpyNote is a remote access trojan providing full device control including camera, microphone, and keylogging capabilities.", patterns: ["com.spynote.core", "net.spy.remote"], verdict: "Full device takeover capability. Do not install.", firstSeen: "2023-06-20", timesMatched: "412 scans" },
  { id: "TRZ-LIB-b91c4e7f2a10", name: "Goldoson Adware Library", category: "Adware", severity: "HIGH", matched: 1203, dateAdded: "2024-09-05", description: "Goldoson is an adware library that collects device data and performs ad fraud. Found in over 60 legitimate Play Store apps.", patterns: ["com.goldoson.ads", "io.gold.adlib"], verdict: "Data collection and ad fraud. Remove apps containing this library.", firstSeen: "2023-02-14", timesMatched: "1,203 scans" },
  { id: "TRZ-LIB-c33d8a1f0b92", name: "FluBot Banking Trojan", category: "Trojan", severity: "CRITICAL", matched: 289, dateAdded: "2024-12-01", description: "FluBot steals banking credentials through overlay attacks and intercepts SMS for 2FA bypass.", patterns: ["com.flubot.core", "net.flu.banking"], verdict: "Banking credential theft. Do not install. Report to bank immediately.", firstSeen: "2023-08-30", timesMatched: "289 scans" },
  { id: "TRZ-LIB-d44e9b2g1c03", name: "Joker Subscriber Adware", category: "Adware", severity: "HIGH", matched: 956, dateAdded: "2024-08-22", description: "Joker silently subscribes users to premium WAP services, causing unauthorized charges.", patterns: ["com.joker.sub", "io.jkr.premium"], verdict: "Unauthorized premium subscriptions. Remove and check billing.", firstSeen: "2022-11-15", timesMatched: "956 scans" },
  { id: "TRZ-COMBO-e55f0c3h2d14", name: "SMS Exfiltration Rule", category: "Supply Chain", severity: "CRITICAL", matched: 634, dateAdded: "2024-07-15", description: "Combo rule detecting SMS harvesting pattern: spyware SDK + SMS permissions + SmsManager API usage.", patterns: ["READ_SMS+SEND_SMS+SmsManager"], verdict: "Active SMS interception capability. Critical threat.", firstSeen: "2024-01-10", timesMatched: "634 scans" },
  { id: "TRZ-LIB-f66g1d4i3e25", name: "DawDropper Dropper", category: "Trojan", severity: "HIGH", matched: 178, dateAdded: "2025-01-03", description: "DawDropper is a dropper malware that downloads and installs secondary payloads after initial installation.", patterns: ["com.dawdrop.loader", "io.daw.install"], verdict: "Downloads additional malware. Remove immediately.", firstSeen: "2024-03-22", timesMatched: "178 scans" },
  { id: "TRZ-NET-g77h2e5j4f36", name: "Cerberus C2 Server Pattern", category: "Stalkerware", severity: "CRITICAL", matched: 341, dateAdded: "2024-11-28", description: "Cerberus command-and-control communication pattern detected through network behavior analysis.", patterns: ["cerberus.c2.pattern", "185.*.*.*/c2"], verdict: "Active C2 communication. Device may be compromised.", firstSeen: "2023-09-05", timesMatched: "341 scans" },
  { id: "TRZ-LIB-h88i3f6k5g47", name: "Triada System Trojan", category: "Trojan", severity: "CRITICAL", matched: 523, dateAdded: "2024-06-10", description: "Triada embeds into Android system processes, enabling deep device compromise and persistent access.", patterns: ["com.triada.sys", "android.triada.core"], verdict: "System-level compromise. Factory reset recommended.", firstSeen: "2022-07-28", timesMatched: "523 scans" },
  { id: "TRZ-STR-i99j4g7l6h58", name: "PhishKit Domain Template", category: "Phishing", severity: "HIGH", matched: 215, dateAdded: "2025-01-11", description: "Standardized phishing kit template detected through URL structure and page layout fingerprinting.", patterns: ["login-secure-*.com", "account-verify-*.net"], verdict: "Phishing page. Do not enter credentials.", firstSeen: "2024-05-18", timesMatched: "215 scans" },
];

export const sampleVerdicts = [
  {
    filename: "WhatsApp_Mod_v2.apk",
    verdict: "DANGEROUS" as const,
    score: 89,
    ai: "This app is a renamed version of XLoader spyware. It reads your SMS messages and contacts an anonymous server silently. Do not install.",
    layers: ["✓", "✓", "✗", "—", "✓", "✓", "✓"],
  },
  {
    filename: "Adobe_Reader_v22.pdf",
    verdict: "SAFE" as const,
    score: 4,
    ai: "No malicious patterns found across all 7 layers. Standard PDF with no suspicious permissions or network behaviour.",
    layers: ["✓", "✓", "✓", "✓", "✓", "✓", "✓"],
  },
  {
    filename: "free_vpn_setup.exe",
    verdict: "SUSPICIOUS" as const,
    score: 34,
    ai: "This file has two medium-risk signals: a domain registered 3 days ago and a self-signed certificate. Scan with caution.",
    layers: ["✓", "✓", "◐", "✗", "✓", "✓", "◐"],
  },
];
