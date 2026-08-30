// Vercel Serverless function to receive contact form submissions.
// Customize to forward emails using an email provider (SendGrid/Mailgun) with environment variables.

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({error: 'Method not allowed'});
  // Vercel usually provides parsed body, but handle raw JSON as fallback
  let body = req.body;
  if(!body || Object.keys(body).length === 0){
    try{
      const raw = await new Promise((resolve, reject) => {
        let data = '';
        req.on('data', chunk => data += chunk);
        req.on('end', () => resolve(data));
        req.on('error', reject);
      });
      body = raw ? JSON.parse(raw) : {};
    }catch(e){ body = {} }
  }
  const {name, email, message} = body || {};
  if(!name || !email || !message) return res.status(400).json({error:'Missing fields'});

  // TODO: integrate with SendGrid / Mailgun using process.env.SENDGRID_API_KEY etc.
  // Example response (simulate success)
  return res.status(200).json({status:'ok',message:'Received. Configure provider to send email.'});
}