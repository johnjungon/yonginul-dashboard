export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  
  const { query } = req.query;
  if (!query) return res.status(400).json({ error: 'query required' });

  try {
    const encodedQuery = query.split('|').map(encodeURIComponent).join('|');
    const response = await fetch(
      `https://openapi.naver.com/v1/search/news.json?query=${encodedQuery}&display=3&sort=date`,
      {
        headers: {
          'X-Naver-Client-Id': 'sYGHReGeluNWaVjSPPvb',
          'X-Naver-Client-Secret': 'TWMKawrxM0',
        }
      }
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
}