// Wellness Assistant — Mira (CAHE-RUC integration prototype)

const { useState, useEffect, useRef, useMemo, useCallback } = React;

const D = window.WA_DATA;

// ── Icons ────────────────────────────────────────────────────────────────
const Icon = {
  Send: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l14-7-5 16-3-7-6-2z" /></svg>),
  Doc: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5" /></svg>),
  Plus: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>),
  Refresh: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 0 1 15-6.7L21 8" /><path d="M21 3v5h-5" /><path d="M21 12a9 9 0 0 1-15 6.7L3 16" /><path d="M3 21v-5h5" /></svg>),
  Bookmark: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></svg>),
  Phone: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>),
  Chat: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>),
  Pin: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>),
};

// ── i18n helper ──────────────────────────────────────────────────────────
const useI18n = (lang) => useMemo(() => D.i18n[lang] || D.i18n.en, [lang]);

// ── CAHE-RUC site chrome (wraps chat when context = "caheruc") ───────────
function CaheRucChrome({ children, lang }) {
  const navItems = lang === 'es'
    ? ['Inicio', 'Programas', 'Pacientes', 'Investigación', 'Para socios']
    : ['Home', 'Programs', 'Patients', 'Research', 'For Partners'];
  const here = lang === 'es' ? 'Asistente de Bienestar' : 'Wellness Assistant';
  const programs = lang === 'es' ? 'Programas' : 'Programs';
  const youthHealth = lang === 'es' ? 'Salud Juvenil' : 'Youth Health';
  const railItems = lang === 'es'
    ? ['Visión general', 'Programa RYC', 'Asistente de Bienestar', 'Recursos para padres', 'Telesalud']
    : ['Overview', 'RYC Program', 'Wellness Assistant', 'Parent Resources', 'Telehealth'];
  return (
    <div className="caheruc-site">
      <nav className="cr-topnav">
        <div className="cr-logo">
          <span className="cr-logo-mark" aria-hidden />
          <span>CAHE-RUC</span>
        </div>
        <div className="cr-nav">
          {navItems.map((n, i) => (
            <a key={n} href="#" className={i === 1 ? 'active' : ''}>{n}</a>
          ))}
        </div>
        <div className="cr-search">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <span>{lang === 'es' ? 'Buscar recursos…' : 'Search resources…'}</span>
        </div>
        <div className="cr-nav-cta">
          <a href="#" style={{textDecoration:'none', color:'inherit'}}>{lang === 'es' ? 'Donar' : 'Donate'}</a>
          <span style={{padding:'5px 10px', borderRadius:7, background:'oklch(0.32 0.06 240)', color:'#fff', fontWeight:500}}>{lang === 'es' ? 'Iniciar sesión' : 'Member sign-in'}</span>
        </div>
      </nav>
      <div className="cr-breadcrumb">
        <a href="#" style={{color:'inherit', textDecoration:'none'}}>{navItems[1]}</a>
        <span className="sep">›</span>
        <a href="#" style={{color:'inherit', textDecoration:'none'}}>{youthHealth}</a>
        <span className="sep">›</span>
        <span className="here">{here}</span>
      </div>
      <div className="cr-page">
        <aside className="cr-rail">
          <h4>{programs}</h4>
          {railItems.map((r, i) => (
            <a key={r} href="#" className={i === 2 ? 'active' : ''}>{r}</a>
          ))}
        </aside>
        <div className="cr-chat-host">{children}</div>
      </div>
    </div>
  );
}

// ── FQHC portal chrome ──────────────────────────────────────────────────
function FqhcChrome({ children, lang }) {
  const tabs = lang === 'es'
    ? ['Panel', 'Citas', 'Mensajes', 'Asistente Mira', 'Registros']
    : ['Dashboard', 'Appointments', 'Messages', 'Mira Assistant', 'Records'];
  return (
    <div className="fqhc-portal">
      <div className="fqhc-topbar">
        <div className="fqhc-logo">
          <span className="fqhc-logo-mark">B</span>
          <span>Bonner County Health Partners</span>
        </div>
        <div className="fqhc-tabs">
          {tabs.map((t, i) => <a key={t} href="#" className={i === 3 ? 'active' : ''}>{t}</a>)}
        </div>
        <div className="fqhc-member">
          <span>{D.member.name}</span>
          <span className="fqhc-avatar">{D.member.initials}</span>
        </div>
      </div>
      {children}
    </div>
  );
}

// ── Member identity strip ───────────────────────────────────────────────
function IdentityStrip({ lang, onLang, ctx }) {
  const i18n = D.i18n[lang];
  return (
    <div className="id-strip">
      <span className="id-avatar">{D.member.initials}</span>
      <div>
        <div><span className="name">{D.member.name}</span> <span className="meta">· {D.member.role} · {D.member.school}</span></div>
        <div className="meta" style={{fontSize: 11, marginTop: 1}}>
          {i18n.member_signed} {ctx === 'fqhc' ? D.member.fqhc : D.org.name}
        </div>
      </div>
      <span className="secure">{lang === 'es' ? 'Sesión segura · HIPAA' : 'Secure session · HIPAA'}</span>
      <div className="id-lang" role="group" aria-label="Language">
        <button className={lang === 'en' ? 'on' : ''} onClick={() => onLang('en')}>EN</button>
        <button className={lang === 'es' ? 'on' : ''} onClick={() => onLang('es')}>ES</button>
      </div>
    </div>
  );
}

// ── Crisis strip + Disclaimer + Trust line ──────────────────────────────
function CrisisStrip({ lang }) {
  const i = D.i18n[lang];
  return (
    <div className="crisis-strip" role="region" aria-label="Crisis support">
      <span className="crisis-dot" />
      <span><strong>{i.crisis_strong}</strong> {i.crisis_body}</span>
      <span className="crisis-spacer" />
      <a href="tel:988">{i.crisis_988}</a>
      <span style={{ color: 'oklch(0.7 0.04 25)' }}>·</span>
      <a href="sms:741741">{i.crisis_text}</a>
    </div>
  );
}

function Disclaimer({ lang }) {
  const i = D.i18n[lang];
  return (
    <div className="disclaimer" role="note">
      <span className="disclaimer-icon" aria-hidden>i</span>
      <span><em>{i.disclaimer_em}</em> {i.disclaimer_body}</span>
    </div>
  );
}

function TrustLine({ lang }) {
  const i = D.i18n[lang];
  return (
    <div className="trust-line">
      <span><strong>{D.org.pdfCount}</strong> {i.sources}</span>
      <span className="dot" />
      <span>{i.reviewed} {D.org.lastReview}</span>
      <span className="dot" />
      <span>{D.org.clinicalReviewer}</span>
      <span className="dot" />
      <span>{D.org.qprVersion}</span>
    </div>
  );
}

// ── Sidebar ──────────────────────────────────────────────────────────────
function Sidebar({ activeTopic, onPickTopic, onNewChat, lang }) {
  const i = D.i18n[lang];
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-orb" aria-hidden />
        <div>
          <div className="brand-name">Mira</div>
          <div className="brand-tag">{lang === 'es' ? 'Compañera de bienestar' : 'Wellness companion'}</div>
        </div>
      </div>
      <button
        className="topic"
        style={{ margin: '0 12px 6px', padding: '10px 12px', gridTemplateColumns: '22px 1fr', background: 'oklch(1 0 0 / 0.6)', border: '1px solid var(--line)' }}
        onClick={onNewChat}
      >
        <span style={{ display: 'grid', placeItems: 'center', color: 'var(--ink-2)' }}><Icon.Plus /></span>
        <span className="topic-label">{i.newchat}</span>
      </button>
      <div className="side-section">{i.topics}</div>
      <div className="topics" role="list">
        {D.topics.map(t => (
          <button key={t.id} className={'topic' + (activeTopic === t.id ? ' active' : '')} onClick={() => onPickTopic(t.id)}>
            <span className="topic-dot" style={{ background: `oklch(0.78 0.08 ${t.hue})` }} aria-hidden />
            <span>
              <span className="topic-label">{t.label}</span>
              <span className="topic-blurb">{t.blurb}</span>
            </span>
            <span className="topic-count">{t.count}</span>
          </button>
        ))}
      </div>
      <div className="side-foot">
        <span>{D.org.pdfCount} {lang === 'es' ? 'fuentes · act. 28 abr' : 'sources · last refresh Apr 28'}</span>
        <span className="pill">{lang === 'es' ? 'RAG activo' : 'RAG live'}</span>
      </div>
    </aside>
  );
}

// ── Welcome ──────────────────────────────────────────────────────────────
function Welcome({ onPick, lang, ruralCues }) {
  const i = D.i18n[lang];
  return (
    <div className="welcome">
      <div className="welcome-inner">
        <div className="welcome-orb" aria-hidden />
        <h1>{i.welcome_h1_a} <em>{i.welcome_h1_b}</em></h1>
        <p>{i.welcome_p}{ruralCues ? ' ' + i.welcome_p_rural : ''}</p>
        <div className="starters">
          {D.starters.map(s => {
            const topic = D.topics.find(t => t.id === s.topic);
            return (
              <button key={s.id} className="starter" onClick={() => onPick(s)}>
                <span className="starter-title">{s.title}</span>
                <span className="starter-sub">{s.sub}</span>
                <span className="starter-tag" style={{ color: `oklch(0.55 0.08 ${topic.hue})` }}>{topic.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Citations ────────────────────────────────────────────────────────────
function Citation({ c, idx, onToggle, expanded }) {
  return (
    <button className="cite" onClick={onToggle} aria-expanded={expanded}>
      <span className="cite-num">{idx + 1}</span>
      <span className="cite-title">{c.doc}</span>
    </button>
  );
}
function CitePanel({ c, idx }) {
  return (
    <div className="cite-panel">
      <div className="cite-panel-head">
        <span className="doc"><Icon.Doc /> [{idx + 1}] {c.doc}</span>
        <span className="page">page {c.page}</span>
      </div>
      <blockquote className="cite-panel-body">“{c.snippet}”</blockquote>
    </div>
  );
}

// ── QPR card (Question / Persuade / Refer) ──────────────────────────────
function QprCard({ step, onAnswer, lang }) {
  const q = D.qpr;
  const i = D.i18n[lang];
  if (step === 'question') {
    return (
      <div className="qpr-card">
        <span className="qpr-step">QPR · Step 1 · Question</span>
        <h3>{q.question.headline}</h3>
        <p>{q.question.body}</p>
        <div className="qpr-options">
          {q.question.options.map(opt => (
            <button key={opt.id} className={'qpr-opt ' + (opt.tone === 'crisis' ? 'crisis' : '')} onClick={() => onAnswer(opt.id)}>
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    );
  }
  if (step === 'persuade') {
    return (
      <div className="qpr-card">
        <span className="qpr-step">QPR · Step 2 · Persuade</span>
        <h3>{q.persuade.headline}</h3>
        <p>{q.persuade.body}</p>
        <div className="qpr-actions">
          <button className="qpr-btn primary" onClick={() => onAnswer('refer')}>{lang === 'es' ? 'Conéctame con alguien' : 'Connect me with someone'}</button>
          <button className="qpr-btn" onClick={() => onAnswer('continue')}>{i.continue}</button>
        </div>
      </div>
    );
  }
  // refer
  return (
    <div className="qpr-card">
      <span className="qpr-step">QPR · Step 3 · Refer</span>
      <h3>{q.refer.headline}</h3>
      <div className="qpr-refer">
        {q.refer.lines.map((ln, idx) => {
          const inner = (
            <>
              <span className="ic">
                {ln.kind === 'phone' ? <Icon.Phone /> : ln.kind === 'sms' ? <Icon.Chat /> : <Icon.Pin />}
              </span>
              <span>
                <span className="lbl">{ln.label}</span><br />
                <span className="val">{ln.value}</span>
              </span>
              <span className="arrow">→</span>
            </>
          );
          return ln.href ? (
            <a key={idx} className="qpr-line" href={ln.href}>{inner}</a>
          ) : (
            <div key={idx} className="qpr-line">{inner}</div>
          );
        })}
      </div>
      <div className="qpr-actions">
        <button className="qpr-btn primary" onClick={() => onAnswer('callback')}>{i.callback}</button>
        <button className="qpr-btn" onClick={() => onAnswer('continue')}>{i.continue}</button>
      </div>
      <p className="qpr-note">{q.refer.note}</p>
    </div>
  );
}

// ── Message ──────────────────────────────────────────────────────────────
function Message({ msg, onQpr, lang }) {
  const [expanded, setExpanded] = useState(new Set());
  const toggle = (idx) => setExpanded(p => {
    const n = new Set(p); if (n.has(idx)) n.delete(idx); else n.add(idx); return n;
  });

  if (msg.role === 'user') {
    return (
      <div className="msg user">
        <div className="msg-user-mark">{D.member.initials}</div>
        <div className="bubble">{msg.text}</div>
      </div>
    );
  }
  if (msg.role === 'qpr') {
    return (
      <div className="msg bot">
        <div className="msg-orb" aria-hidden />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="meta"><span className="meta-name">Mira</span></div>
          <QprCard step={msg.step} onAnswer={(a) => onQpr(msg.id, a)} lang={lang} />
        </div>
      </div>
    );
  }
  // bot text
  const isStreaming = msg.streaming;
  const hasContent = msg.text && msg.text.length > 0;
  return (
    <div className="msg bot">
      <div className="msg-orb" aria-hidden />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="meta">
          <span className="meta-name">Mira</span>
          {!isStreaming && <span>· {lang === 'es' ? 'ahora' : 'just now'}</span>}
        </div>
        {!hasContent && isStreaming ? (
          <div className="bubble" style={{ padding: 0 }}><div className="typing"><span /><span /><span /></div></div>
        ) : (
          <>
            <div className="bubble">{msg.text}{isStreaming && <span className="caret" />}</div>
            {!isStreaming && msg.citations && msg.citations.length > 0 && (
              <>
                <div className="citations">
                  {msg.citations.map((c, idx) => (
                    <Citation key={idx} c={c} idx={idx} expanded={expanded.has(idx)} onToggle={() => toggle(idx)} />
                  ))}
                </div>
                {[...expanded].sort((a,b)=>a-b).map(idx => (
                  <CitePanel key={idx} c={msg.citations[idx]} idx={idx} />
                ))}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// ── Composer ─────────────────────────────────────────────────────────────
function Composer({ onSend, disabled, lang }) {
  const [v, setV] = useState('');
  const ref = useRef(null);
  const i = D.i18n[lang];
  useEffect(() => {
    const el = ref.current; if (!el) return;
    el.style.height = 'auto';
    el.style.height = Math.min(180, el.scrollHeight) + 'px';
  }, [v]);
  const submit = () => {
    const t = v.trim(); if (!t || disabled) return;
    onSend(t); setV('');
  };
  const onKey = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submit(); } };
  return (
    <div className="composer-wrap">
      <div className="composer">
        <textarea ref={ref} rows={1} value={v} onChange={e => setV(e.target.value)} onKeyDown={onKey} placeholder={i.placeholder} />
        <button className="send" onClick={submit} disabled={!v.trim() || disabled} aria-label={i.send}><Icon.Send /></button>
      </div>
      <div className="composer-foot">
        <span>{i.composer_foot}</span>
        <span><kbd>↵</kbd> {lang === 'es' ? 'enviar' : 'send'} · <kbd>⇧↵</kbd> {lang === 'es' ? 'línea' : 'newline'}</span>
      </div>
    </div>
  );
}

// ── Routing ──────────────────────────────────────────────────────────────
function isCrisis(text) {
  const q = text.toLowerCase();
  return D.crisisKeywords.some(k => q.includes(k));
}
function pickReply(query) {
  const q = query.toLowerCase();
  let best = null, bestScore = 0;
  for (const r of D.replies) {
    let score = 0;
    for (const m of r.match) if (q.includes(m)) score += 1;
    if (score > bestScore) { bestScore = score; best = r; }
  }
  return best || D.defaultReply;
}

// ── Chat container (the actual chat UI inside any chrome) ───────────────
function ChatApp({ context, lang, onLang, ruralCues, showTrust, showIdentity }) {
  const [messages, setMessages] = useState([]);
  const [streaming, setStreaming] = useState(false);
  const [activeTopic, setActiveTopic] = useState(null);
  const threadRef = useRef(null);

  useEffect(() => {
    const el = threadRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  const streamReply = (botId, full, citations) => {
    const chunks = [];
    let i = 0;
    while (i < full.length) {
      const step = 2 + Math.floor(Math.random() * 4);
      chunks.push(full.slice(i, i + step));
      i += step;
    }
    let acc = '', idx = 0;
    const tick = () => {
      if (idx >= chunks.length) {
        setMessages(m => m.map(msg => msg.id === botId
          ? { ...msg, text: full, streaming: false, citations: citations || [] } : msg));
        setStreaming(false);
        return;
      }
      acc += chunks[idx++];
      setMessages(m => m.map(msg => msg.id === botId ? { ...msg, text: acc } : msg));
      setTimeout(tick, 14 + Math.random() * 26);
    };
    tick();
  };

  const sendMessage = useCallback((text) => {
    setMessages(m => [...m, { role: 'user', text, id: Date.now() + Math.random() }]);

    // Crisis path → QPR
    if (isCrisis(text)) {
      setStreaming(true);
      const qprId = Date.now() + Math.random() + 1;
      setTimeout(() => {
        setMessages(m => [...m, { role: 'qpr', step: 'question', id: qprId }]);
        setStreaming(false);
      }, 600);
      return;
    }

    setStreaming(true);
    const botId = Date.now() + Math.random() + 1;
    setMessages(m => [...m, { role: 'bot', text: '', streaming: true, id: botId }]);
    const reply = pickReply(text);
    setTimeout(() => streamReply(botId, reply.text, reply.citations), 700 + Math.random() * 500);
  }, []);

  const handleQpr = useCallback((msgId, answer) => {
    if (answer === 'yes' || answer === 'maybe') {
      setMessages(m => [...m, { role: 'qpr', step: 'persuade', id: Date.now() + Math.random() }]);
    } else if (answer === 'no') {
      // Soft handoff back to normal RAG flow with a supportive reply
      setMessages(m => [...m, {
        role: 'bot', text: 'Thank you for sharing that. I’m glad you’re still here. Tell me a bit more about what’s feeling heaviest, and I’ll do my best to help.',
        streaming: false, citations: [], id: Date.now() + Math.random()
      }]);
    } else if (answer === 'refer') {
      setMessages(m => [...m, { role: 'qpr', step: 'refer', id: Date.now() + Math.random() }]);
    } else if (answer === 'callback') {
      setMessages(m => [...m, {
        role: 'bot',
        text: lang === 'es'
          ? 'Listo. Un consejero del FQHC te llamará dentro de 30 minutos al número en tu archivo. Mientras tanto, sigamos respirando juntos.'
          : 'Done — a counselor from your FQHC will call you back within 30 minutes at the number on file. While we wait, let’s keep breathing together.',
        streaming: false, citations: [], id: Date.now() + Math.random()
      }]);
    } else if (answer === 'continue') {
      setMessages(m => [...m, {
        role: 'bot',
        text: lang === 'es' ? 'Estoy aquí. ¿Qué te ayudaría escuchar ahora mismo?' : 'I’m here. What would help to hear right now?',
        streaming: false, citations: [], id: Date.now() + Math.random()
      }]);
    }
  }, [lang]);

  const handleStarter = (s) => sendMessage(s.title);
  const handleTopic = (id) => {
    setActiveTopic(id);
    const topic = D.topics.find(tt => tt.id === id);
    if (topic) sendMessage(`Tell me about ${topic.label.toLowerCase()}.`);
  };
  const newChat = () => { setMessages([]); setActiveTopic(null); };

  const empty = messages.length === 0;
  const i = D.i18n[lang];

  return (
    <>
      <div className="app-bg" />
      <div className="app">
        <CrisisStrip lang={lang} />
        <Disclaimer lang={lang} />

        <Sidebar activeTopic={activeTopic} onPickTopic={handleTopic} onNewChat={newChat} lang={lang} />

        <main className="main">
          {showIdentity && <IdentityStrip lang={lang} onLang={onLang} ctx={context} />}
          <div className="chat-head">
            <div className="chat-head-l">
              <div className="brand-orb" style={{ width: 22, height: 22 }} aria-hidden />
              <div>
                <div className="chat-head-title">Mira</div>
                <div className="chat-head-sub">{lang === 'es' ? 'Solo de la biblioteca curada de salud mental' : 'Trained only on a curated mental-health library'}</div>
              </div>
            </div>
            <div className="chat-head-actions">
              <button className="iconbtn" title="Saved" aria-label="Saved"><Icon.Bookmark /></button>
              <button className="iconbtn" title="New" aria-label="New" onClick={newChat}><Icon.Refresh /></button>
            </div>
          </div>
          {showTrust && <TrustLine lang={lang} />}

          {empty ? (
            <Welcome onPick={handleStarter} lang={lang} ruralCues={ruralCues} />
          ) : (
            <div className="thread" ref={threadRef}>
              <div className="thread-inner">
                {messages.map(m => <Message key={m.id} msg={m} onQpr={handleQpr} lang={lang} />)}
              </div>
            </div>
          )}

          <Composer onSend={sendMessage} disabled={streaming} lang={lang} />
        </main>
      </div>
    </>
  );
}

// ── Mobile RYC frame ─────────────────────────────────────────────────────
function MobileFrame({ children }) {
  return (
    <div className="mobile-host">
      <IOSDevice width={402} height={874} title="Mira">
        <div style={{ position: 'absolute', inset: 0, background: 'var(--bg)' }}>
          {children}
        </div>
      </IOSDevice>
    </div>
  );
}

// ── App ──────────────────────────────────────────────────────────────────
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "calm",
  "context": "caheruc",
  "language": "en",
  "ruralCues": true,
  "showTrust": true
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useEffect(() => { document.documentElement.dataset.theme = t.theme; }, [t.theme]);

  const onLang = (l) => setTweak('language', l);

  const chat = (
    <ChatApp
      context={t.context}
      lang={t.language}
      onLang={onLang}
      ruralCues={t.ruralCues}
      showTrust={t.showTrust}
      showIdentity={t.context !== 'standalone'}
    />
  );

  let body;
  if (t.context === 'caheruc') {
    body = <div className="deploy-bg"><CaheRucChrome lang={t.language}>{chat}</CaheRucChrome></div>;
  } else if (t.context === 'fqhc') {
    body = <div className="deploy-bg"><FqhcChrome lang={t.language}>{chat}</FqhcChrome></div>;
  } else if (t.context === 'mobile') {
    body = <div className="deploy-bg"><MobileFrame>{chat}</MobileFrame></div>;
  } else {
    body = chat;
  }

  return (
    <>
      <div className={t.context === 'mobile' ? 'mobile-host-root' : ''}>{body}</div>
      <TweaksPanel title="Tweaks">
        <TweakSection label="Deployment context" />
        <TweakSelect
          label="Where it lives"
          value={t.context}
          options={[
            { value: 'caheruc', label: 'Embedded on CAHE-RUC site' },
            { value: 'fqhc', label: 'FQHC partner portal' },
            { value: 'mobile', label: 'RYC mobile (high schooler)' },
            { value: 'standalone', label: 'Standalone (generic)' },
          ]}
          onChange={v => setTweak('context', v)}
        />
        <TweakSection label="Language & cues" />
        <TweakRadio
          label="Language"
          value={t.language}
          options={[{ value: 'en', label: 'EN' }, { value: 'es', label: 'ES' }]}
          onChange={v => setTweak('language', v)}
        />
        <TweakToggle label="Rural-context cues" value={t.ruralCues} onChange={v => setTweak('ruralCues', v)} />
        <TweakToggle label="Show trust line" value={t.showTrust} onChange={v => setTweak('showTrust', v)} />

        <TweakSection label="Theme" />
        <TweakRadio
          label="Color tone"
          value={t.theme}
          options={[{ value: 'calm', label: 'Calm' }, { value: 'warm', label: 'Warm' }, { value: 'mono', label: 'Mono' }]}
          onChange={v => setTweak('theme', v)}
        />

        <div style={{ fontSize: 11, color: 'rgba(41,38,27,.55)', lineHeight: 1.5, paddingTop: 4 }}>
          Try: type “I want to hurt myself” to trigger the QPR safety flow.
        </div>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
