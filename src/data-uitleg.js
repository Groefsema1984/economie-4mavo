// ===== Korte uitleg voor elk level =====
// Voordat je een level voor het eerst speelt, zie je de begrippen van dat level met hun betekenis (uit de begrippenlijst
// van het hoofdstuk). Een level kan ook eigen uitleg hebben: zet dan l.uitleg = [{t:'kopje', x:'tekst'}] in data-hX.js.
for(const w in LEVELS){ const B=LEVELS[w].begrippen||{};
  LEVELS[w].forEach(l=>{ if(l.uitleg||l.id.endsWith('.r')) return;
    const bg=[...new Set(l.vragen.map(v=>v.b).filter(b=>b&&B[b]))];
    if(bg.length>=2) l.uitleg=bg.slice(0,10).map(b=>({t:b,x:B[b]})) }) }
