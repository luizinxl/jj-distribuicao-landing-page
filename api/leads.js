// Vercel Serverless Function: /api/leads
// No Vercel, o sistema de arquivos é somente leitura.
// Os leads são apenas logados no console (visível em Functions > Logs no Vercel Dashboard).
// Para persistência real, use um banco de dados como Vercel KV, Supabase ou similares.

module.exports = function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  // POST: Registrar lead (apenas loga, não grava em arquivo)
  if (req.method === 'POST') {
    try {
      const leadData = req.body || {};
      const clientIp = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown';
      const userAgent = req.headers['user-agent'] || '';

      const record = {
        id: 'lead_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
        timestamp: new Date().toISOString(),
        ...leadData,
        ip: clientIp,
        userAgent: userAgent
      };

      // Log visível no painel Vercel > Functions > Logs
      console.log(`[LEAD CAPTURED] Origem: ${record.origin || 'Desconhecida'} | Produto: ${record.product || 'Geral'} | IP: ${clientIp} | Data: ${record.timestamp}`);

      res.status(201).json({ success: true, lead: record });
    } catch (err) {
      res.status(400).json({ error: 'JSON inválido', details: err.message });
    }
    return;
  }

  // GET: Retorna mensagem informativa (sem persistência no Vercel)
  if (req.method === 'GET') {
    res.status(200).json({
      message: 'Leads são logados no console do Vercel. Acesse Functions > Logs no dashboard.',
      total: 0,
      leads: []
    });
    return;
  }

  res.status(405).json({ error: 'Method Not Allowed' });
};
