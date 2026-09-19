// Vercel Serverless Function: /api/config
const BUSINESS_CONFIG = {
  businessName: 'J&J Distribuição',
  whatsappNumber: '5511992704530',
  formattedWhatsApp: '(11) 99270-4530',
  phoneLandline: '(11) 99270-4530',
  email: 'vendas@jjdistribuicao.com.br',
  address: 'Rua Luís Gonzaga M. Camargo, Cidade Santos Dumont, Jundiaí/SP',
  mapsUrl: 'https://maps.app.goo.gl/jHMQ6cLbsB6BQ8bz8'
};

module.exports = function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  res.status(200).json(BUSINESS_CONFIG);
};
