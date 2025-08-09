import fs from 'fs';
import path from 'path';
import PDFParser from 'pdf2json';

function extractEmail(text) {
  const match = text.match(/[\w.+-]+@[\w-]+\.[\w.-]+/);
  return match ? match[0] : '';
}

function extractUrls(text) {
  const urlRegex = /https?:\/\/[\w.-]+\.[\w.-]+\S*/g;
  const urls = [...new Set((text.match(urlRegex) || []).map(u => u.replace(/[),.;]+$/, '')))]
  const socials = { github: '', linkedin: '', twitter: '' };
  for (const u of urls) {
    if (!socials.github && /github\.com\//i.test(u)) socials.github = u;
    if (!socials.linkedin && /linkedin\.com\//i.test(u)) socials.linkedin = u;
    if (!socials.twitter && /(x\.com|twitter\.com)\//i.test(u)) socials.twitter = u;
  }
  return { socials, urls };
}

function extractName(text) {
  const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  for (const line of lines.slice(0, 10)) {
    if (line.length < 60 && !/@|resume|curriculum|objective|profile|summary/i.test(line)) {
      const words = line.split(/\s+/);
      const looksLikeName = words.length <= 5 && words.every(w => /[A-Za-z]/.test(w));
      if (looksLikeName) return line;
    }
  }
  return '';
}

function section(text, titleRegex) {
  const lines = text.split(/\r?\n/);
  const idx = lines.findIndex(l => titleRegex.test(l));
  if (idx === -1) return [];
  const rest = lines.slice(idx + 1);
  const stop = rest.findIndex(l => /^\s*[A-Z][A-Za-z ]+\s*$/.test(l) && !titleRegex.test(l));
  return (stop === -1 ? rest : rest.slice(0, stop)).map(s => s.trim());
}

function extractSkills(text) {
  const lines = section(text, /skills|technical skills/i).filter(Boolean);
  const joined = lines.join(', ');
  const raw = joined.split(/[,•·\|\/]/).map(s => s.trim()).filter(s => s.length > 1 && s.length < 40);
  const unique = [...new Set(raw)];
  return unique.map(s => s.replace(/^[-–•]+\s*/, '')).slice(0, 40);
}

function extractExperience(text) {
  const lines = section(text, /experience|work experience|professional experience/i);
  if (!lines.length) return [];
  const items = [];
  let current = null;
  const dateRe = /(\b\w{3,9}\.?\s?\d{4}|\b\d{4})\s*[-–]\s*(Present|\b\w{3,9}\.?\s?\d{4}|\b\d{4})/i;
  for (const line of lines) {
    if (!line) continue;
    if (dateRe.test(line) || (/ at | · | \u00b7 /.test(line))) {
      if (current) items.push(current);
      const m = line.match(dateRe);
      const dates = m ? m[0] : '';
      const clean = line.replace(dateRe, '').replace(/[•·\-]+/g, ' ').trim();
      current = { company: clean, role: '', start: dates.split(/[-–]/)[0]?.trim() || '', end: dates.split(/[-–]/)[1]?.trim() || '', highlights: [] };
    } else if (/\b(engineer|developer|manager|lead|intern|analyst|architect)\b/i.test(line)) {
      if (!current) current = { company: '', role: '', start: '', end: '', highlights: [] };
      if (!current.role) current.role = line;
      else current.highlights.push(line);
    } else if (/^[•\-–]/.test(line)) {
      if (!current) current = { company: '', role: '', start: '', end: '', highlights: [] };
      current.highlights.push(line.replace(/^[•\-–]\s*/, ''));
    } else {
      if (!current) current = { company: '', role: '', start: '', end: '', highlights: [] };
      current.highlights.push(line);
    }
  }
  if (current) items.push(current);
  return items.map(it => ({
    company: it.company || 'Company',
    role: it.role || 'Role',
    start: it.start || '',
    end: it.end || '',
    highlights: [...new Set(it.highlights.filter(Boolean))].slice(0, 5),
  })).slice(0, 6);
}

function pdfToText(filePath) {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser();
    pdfParser.on('pdfParser_dataError', err => reject(err.parserError || err));
    pdfParser.on('pdfParser_dataReady', pdfData => {
      const pages = pdfData?.formImage?.Pages || [];
      const lines = [];
      for (const p of pages) {
        const texts = p.Texts || [];
        for (const t of texts) {
          const str = decodeURIComponent(t.R?.[0]?.T || '').trim();
          if (str) lines.push(str);
        }
        lines.push('\n');
      }
      resolve(lines.join('\n'));
    });
    pdfParser.loadPDF(filePath);
  });
}

async function main() {
  const pdfPath = path.join(process.cwd(), 'public', 'resume.pdf');
  const text = await pdfToText(pdfPath);
  const email = extractEmail(text);
  const name = extractName(text);
  const { socials } = extractUrls(text);
  const skills = extractSkills(text);
  const experiences = extractExperience(text);
  const out = { name, email, socials, skills, experiences };
  const outPath = path.join(process.cwd(), 'resume.parsed.json');
  fs.writeFileSync(outPath, JSON.stringify(out, null, 2), 'utf8');
  console.log(JSON.stringify(out, null, 2));
}

main().catch(err => { console.error(err); process.exit(1); });
