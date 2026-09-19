const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3000;
const LEADS_FILE = path.join(__dirname, 'leads.json');

// Configurações do negócio e WhatsApp
const BUSINESS_CONFIG = {
  businessName: 'J&J Distribuição',
  whatsappNumber: '5511992704530',
  formattedWhatsApp: '(11) 99270-4530',
  phoneLandline: '(11) 99270-4530',
  email: 'vendas@jjdistribuicao.com.br',
  address: 'Rua Luís Gonzaga M. Camargo, Cidade Santos Dumont, Jundiaí/SP',
  mapsUrl: 'https://maps.app.goo.gl/jHMQ6cLbsB6BQ8bz8'
};

// Inicializa arquivo de leads se não existir
if (!fs.existsSync(LEADS_FILE)) {
  fs.writeFileSync(LEADS_FILE, JSON.stringify([], null, 2), 'utf-8');
}

// Helpers para leitura e escrita de leads
function getLeads() {
  try {
    const data = fs.readFileSync(LEADS_FILE, 'utf-8');
    return JSON.parse(data || '[]');
  } catch (err) {
    console.error('Erro ao ler leads:', err);
    return [];
  }
}

function saveLead(leadData) {
  const leads = getLeads();
  const newLead = {
    id: 'lead_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
    timestamp: new Date().toISOString(),
    ...leadData
  };
  leads.unshift(newLead);
  fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf-8');
  return newLead;
}

// Mapeamento MIME types
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // Habilita CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // API: Health check
  if (pathname === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'online', time: new Date().toISOString() }));
    return;
  }

  // API: Obter configurações
  if (pathname === '/api/config' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(BUSINESS_CONFIG));
    return;
  }

  // API: Registrar lead / clique no WhatsApp
  if (pathname === '/api/leads' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        const leadData = JSON.parse(body || '{}');
        const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        const userAgent = req.headers['user-agent'] || '';

        const record = saveLead({
          ...leadData,
          ip: clientIp,
          userAgent: userAgent
        });

        console.log(`[LEAD CAPTURED] Origem: ${record.origin || 'Desconhecida'} | Produto: ${record.product || 'Geral'} | Data: ${record.timestamp}`);

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, lead: record }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'JSON inválido', details: err.message }));
      }
    });
    return;
  }

  // API: Listar leads
  if (pathname === '/api/leads' && req.method === 'GET') {
    const leads = getLeads();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ total: leads.length, leads }));
    return;
  }

  // Servir arquivos estáticos
  let safePath = path.normalize(decodeURIComponent(pathname)).replace(/^(\.\.[\/\\])+/, '');
  if (safePath === '/' || safePath === '\\') {
    safePath = '/index.html';
  }

  const filePath = path.join(__dirname, safePath);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Fallback para index.html se não for arquivo
      const indexPath = path.join(__dirname, 'index.html');
      fs.readFile(indexPath, (readErr, content) => {
        if (readErr) {
          res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
          res.end('404 Not Found');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(content);
        }
      });
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Erro interno do servidor');
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
      }
    });
  });
});

server.listen(PORT, () => {
  console.log(`===================================================`);
  console.log(`🚀 Servidor J&J Distribuição rodando com sucesso!`);
  console.log(`📡 URL Local: http://localhost:${PORT}`);
  console.log(`📊 API Leads: http://localhost:${PORT}/api/leads`);
  console.log(`⚙️ API Config: http://localhost:${PORT}/api/config`);
  console.log(`===================================================`);
});
