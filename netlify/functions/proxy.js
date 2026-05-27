exports.handler = async (event) => {
  const CANVAS_BASE = 'https://mcpsmd.instructure.com';
  const path = event.path.replace('/.netlify/functions/proxy', '');
  const canvasUrl = CANVAS_BASE + path + (event.rawQuery ? '?' + event.rawQuery : '');
  const auth = event.headers['authorization'];

  if (!auth) return { statusCode: 401, body: 'Unauthorized' };

  const response = await fetch(canvasUrl, {
    headers: { 'Authorization': auth, 'Content-Type': 'application/json' }
  });

  const body = await response.text();
  return {
    statusCode: response.status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Link': response.headers.get('Link') || ''
    },
    body
  };
};
