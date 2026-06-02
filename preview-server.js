const http = require("http");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const port = Number(process.env.PORT || 4190);
const ownerPassword = "shreekali100cr";
const dataDir = process.env.DATA_DIR ? path.resolve(process.env.DATA_DIR) : path.join(root, "data");
const inquiryFile = path.join(dataDir, "inquiries.json");
const visitorFile = path.join(dataDir, "visitors.json");
const externalFiles = {
  "/assets/models/shree-kali-furnace.glb": path.join(root, "assets", "models", "shree-kali-furnace.glb")
};

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".glb": "model/gltf-binary",
  ".pdf": "application/pdf",
  ".mp4": "video/mp4",
  ".vcf": "text/vcard; charset=utf-8"
};

function send(res, status, body, type = "text/plain; charset=utf-8") {
  res.writeHead(status, {
    "Content-Type": type,
    "Cache-Control": "no-store"
  });
  res.end(body);
}

function sendJson(res, status, payload) {
  send(res, status, JSON.stringify(payload), "application/json; charset=utf-8");
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 64 * 1024) {
        req.destroy();
        reject(new Error("Request too large"));
      }
    });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(error);
      }
    });
    req.on("error", reject);
  });
}

function readInquiries() {
  try {
    const data = JSON.parse(fs.readFileSync(inquiryFile, "utf8"));
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function writeInquiries(records) {
  fs.mkdirSync(dataDir, { recursive: true });
  fs.writeFileSync(inquiryFile, JSON.stringify(records.slice(0, 1000), null, 2));
}

function readVisitorData() {
  try {
    const data = JSON.parse(fs.readFileSync(visitorFile, "utf8"));
    return {
      totalViews: Number(data.totalViews) || 0,
      visitors: data.visitors && typeof data.visitors === "object" ? data.visitors : {},
      daily: data.daily && typeof data.daily === "object" ? data.daily : {}
    };
  } catch {
    return { totalViews: 0, visitors: {}, daily: {} };
  }
}

function writeVisitorData(data) {
  fs.mkdirSync(dataDir, { recursive: true });
  fs.writeFileSync(visitorFile, JSON.stringify(data, null, 2));
}

function visitorDateKey(date) {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0")
  ].join("-");
}

function visitorStats(data, now = new Date()) {
  const today = data.daily[visitorDateKey(now)] || { views: 0, visitors: {} };
  return {
    totalVisitors: Object.keys(data.visitors || {}).length,
    totalViews: Number(data.totalViews) || 0,
    todayVisitors: Object.keys(today.visitors || {}).length,
    todayViews: Number(today.views) || 0,
    updatedAt: now.toISOString()
  };
}

function cleanText(value, max = 600) {
  return String(value || "").trim().slice(0, max);
}

function normalizeInquiry(payload) {
  const now = new Date();
  return {
    id: cleanText(payload.id, 48) || `SKM-${now.getTime()}`,
    submittedAt: cleanText(payload.submittedAt, 40) || now.toISOString(),
    submittedAtText: cleanText(payload.submittedAtText, 80) || now.toLocaleString("en-IN"),
    serverReceivedAt: now.toISOString(),
    name: cleanText(payload.name, 120),
    mobile: cleanText(payload.mobile, 40),
    city: cleanText(payload.city, 120),
    product: cleanText(payload.product, 180),
    message: cleanText(payload.message || payload.requirementDetails, 1200),
    requirementDetails: cleanText(payload.requirementDetails || payload.message, 1200),
    source: cleanText(payload.source, 600),
    timezone: cleanText(payload.timezone, 80),
    device: cleanText(payload.device, 900)
  };
}

function normalizeVisitor(payload, req) {
  const now = new Date();
  const forwardedFor = String(req.headers["x-forwarded-for"] || "").split(",")[0].trim();
  return {
    visitorId: cleanText(payload.visitorId, 120) || `server-${now.getTime()}-${Math.random().toString(36).slice(2, 8)}`,
    visitedAt: cleanText(payload.visitedAt, 40) || now.toISOString(),
    source: cleanText(payload.source, 600),
    referrer: cleanText(payload.referrer, 600),
    timezone: cleanText(payload.timezone, 80),
    device: cleanText(payload.device, 900),
    ip: cleanText(forwardedFor || req.socket.remoteAddress || "", 80)
  };
}

function recordVisitor(payload, req) {
  const now = new Date();
  const visit = normalizeVisitor(payload, req);
  const data = readVisitorData();
  const dayKey = visitorDateKey(now);

  if (!data.daily[dayKey]) data.daily[dayKey] = { views: 0, visitors: {} };
  if (!data.visitors[visit.visitorId]) {
    data.visitors[visit.visitorId] = {
      firstSeenAt: now.toISOString(),
      visits: 0
    };
  }

  data.totalViews += 1;
  data.daily[dayKey].views += 1;
  data.daily[dayKey].visitors[visit.visitorId] = true;
  data.visitors[visit.visitorId] = {
    ...data.visitors[visit.visitorId],
    lastSeenAt: now.toISOString(),
    visits: Number(data.visitors[visit.visitorId].visits || 0) + 1,
    source: visit.source,
    referrer: visit.referrer,
    timezone: visit.timezone,
    device: visit.device,
    ip: visit.ip
  };

  writeVisitorData(data);
  return visitorStats(data, now);
}

function passwordFrom(req) {
  const requestUrl = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);
  return requestUrl.searchParams.get("password") || "";
}

async function handleApi(req, res, urlPath) {
  if (urlPath === "/api/health") {
    sendJson(res, 200, {
      ok: true,
      app: "shree-kali-dg-card",
      time: new Date().toISOString()
    });
    return true;
  }

  if (process.env.ENABLE_TEST_SHUTDOWN === "1" && urlPath === "/api/test-shutdown") {
    sendJson(res, 200, { ok: true });
    setTimeout(shutdown, 50);
    return true;
  }

  if (urlPath === "/api/visitors") {
    if (req.method === "POST") {
      try {
        const stats = recordVisitor(await readJsonBody(req), req);
        sendJson(res, 201, { ok: true, stats });
      } catch {
        sendJson(res, 400, { ok: false, error: "Invalid visitor data" });
      }
      return true;
    }

    if (req.method === "GET") {
      sendJson(res, 200, { ok: true, stats: visitorStats(readVisitorData()) });
      return true;
    }

    sendJson(res, 405, { ok: false, error: "Method not allowed" });
    return true;
  }

  if (urlPath !== "/api/inquiries") return false;

  if (req.method === "POST") {
    try {
      const record = normalizeInquiry(await readJsonBody(req));
      const records = readInquiries();
      records.unshift(record);
      writeInquiries(records);
      sendJson(res, 201, { ok: true, record });
    } catch {
      sendJson(res, 400, { ok: false, error: "Invalid inquiry data" });
    }
    return true;
  }

  if (req.method === "GET") {
    if (passwordFrom(req) !== ownerPassword) {
      sendJson(res, 401, { ok: false, error: "Wrong password" });
      return true;
    }
    sendJson(res, 200, { ok: true, records: readInquiries() });
    return true;
  }

  if (req.method === "DELETE") {
    if (passwordFrom(req) !== ownerPassword) {
      sendJson(res, 401, { ok: false, error: "Wrong password" });
      return true;
    }
    writeInquiries([]);
    sendJson(res, 200, { ok: true });
    return true;
  }

  sendJson(res, 405, { ok: false, error: "Method not allowed" });
  return true;
}

const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent((req.url || "/").split("?")[0]);

  handleApi(req, res, urlPath).then((handled) => {
    if (handled) return;

  const safePath = path.normalize(urlPath).replace(/^(\.\.[/\\])+/, "");
  const externalPath = externalFiles[urlPath];
  const filePath = externalPath || path.join(root, urlPath === "/" ? "index.html" : safePath);

  if (urlPath.startsWith("/data/")) {
    send(res, 403, "Forbidden");
    return;
  }

  if (!externalPath && !filePath.startsWith(root)) {
    send(res, 403, "Forbidden");
    return;
  }

  if (externalPath) {
    fs.stat(filePath, (err, stat) => {
      if (err || !stat.isFile()) {
        send(res, 404, "Not found");
        return;
      }

      const type = types[path.extname(filePath).toLowerCase()] || "application/octet-stream";
      const range = req.headers.range;
      const headers = {
        "Content-Type": type,
        "Cache-Control": "no-store",
        "Accept-Ranges": "bytes"
      };

      let start = 0;
      let end = stat.size - 1;
      let status = 200;

      if (range) {
        const match = /^bytes=(\d*)-(\d*)$/.exec(range);
        if (match) {
          start = match[1] ? Number(match[1]) : 0;
          end = match[2] ? Number(match[2]) : end;
          if (start > end || end >= stat.size) {
            res.writeHead(416, { "Content-Range": `bytes */${stat.size}` });
            res.end();
            return;
          }
          status = 206;
          headers["Content-Range"] = `bytes ${start}-${end}/${stat.size}`;
        }
      }

      headers["Content-Length"] = end - start + 1;
      res.writeHead(status, headers);
      if (req.method === "HEAD") {
        res.end();
        return;
      }
      fs.createReadStream(filePath, { start, end }).pipe(res);
    });
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      send(res, 404, "Not found");
      return;
    }

    send(res, 200, data, types[path.extname(filePath).toLowerCase()] || "application/octet-stream");
  });
  }).catch(() => sendJson(res, 500, { ok: false, error: "Server error" }));
});

server.listen(port, "0.0.0.0");

function shutdown() {
  server.close(() => process.exit(0));
}

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
