import fs from 'fs/promises';
import path from 'path';
import mammoth from 'mammoth';

function extractEmail(text) {
  const match = text.match(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/);
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
      const looksLikeName = words.length <= 5 && words.every(w => /[A-Za-z-]/.test(w));
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

function normalizeSkillsTokens(rawTokens) {
  const tokens = [];
  for (let token of rawTokens) {
    token = token.replace(/^[-–•]+\s*/, '');
    token = token.replace(/^([A-Za-z ]+):\s*/, ''); // drop category labels like "Languages & Tools:"
    token = token.replace(/[()]/g, ' ');
    token = token.replace(/\s{2,}/g, ' ').trim();
    if (!token) continue;
    // split further by commas or slashes
    for (const sub of token.split(/[,\/]/)) {
      const t = sub.trim();
      if (t && t.length < 40) tokens.push(t);
    }
  }
  return [...new Set(tokens)];
}

function extractSkills(text) {
  const lines = section(text, /skills|technical skills/i).filter(Boolean);
  const joined = lines.join(', ');
  const raw = joined.split(/[•·\|]/).map(s => s.trim()).filter(Boolean);
  return normalizeSkillsTokens(raw).slice(0, 50);
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

async function main() {
  const docxPath = path.join(process.cwd(), 'MohammedJalilResume.docx');
  const buffer = await fs.readFile(docxPath);
  const { value } = await mammoth.extractRawText({ buffer });
  const text = value || '';
  const email = extractEmail(text);
  const name = extractName(text);
  const { socials } = extractUrls(text);
  const skills = extractSkills(text);
  const experiences = extractExperience(text);
  const out = { name, email, socials, skills, experiences };
  const outPath = path.join(process.cwd(), 'resume.parsed.json');
  await fs.writeFile(outPath, JSON.stringify(out, null, 2), 'utf8');
  console.log(JSON.stringify(out, null, 2));
}

main().catch(err => { console.error(err); process.exit(1); });
