// ===== Uitloggen =====
// De voortgang staat op de server; met speler-ID en herstelcode haal je hem terug.
let uitlogStap=false;
async function uitloggen(){
  if(!uitlogStap){ uitlogStap=true; go('account'); return }
  if(serverModus()&&S&&S.id){ await sync(); if(syncStatus!=='ok'){ melding('Je voortgang is nog niet opgeslagen op de server. Zorg voor internet en probeer het opnieuw.',5000); return } }
  uitlogStap=false; S=null; try{ localStorage.removeItem(KEY); localStorage.removeItem(KEY+'-reserve') }catch(e){} go('welkom'); melding('Je bent uitgelogd.');
}
const _accountScherm = SCHERMEN.account;
SCHERMEN.account = function(a){
  const h=_accountScherm(a); if(!S) return h;
  const blok = uitlogStap
    ? `<div class="kaart" style="border:2px solid var(--fout)"><h3 style="margin-top:0">Weet je het zeker?</h3>
       <p>Schrijf eerst je gegevens op. Zonder speler-ID en herstelcode kun je je voortgang niet terughalen.</p>
       <p style="font-size:18px">Speler-ID <b>${esc(S.id||'–')}</b> · Herstelcode <b>${esc(S.code||'–')}</b></p>
       <div class="voet" style="justify-content:flex-start;gap:8px"><button class="knop" style="background:var(--fout)" onclick="uitloggen()">Ja, uitloggen</button><button class="knop zacht" onclick="uitlogStap=false;go('account')">Annuleer</button></div></div>`
    : `<div class="kaart"><p class="zacht" style="margin-top:0">Wil iemand anders dit apparaat gebruiken? Log dan uit. Je voortgang blijft op de server bewaard.</p><button class="knop zacht" onclick="uitloggen()">Uitloggen</button></div>`;
  return h.replace(/(<p class="zacht" style="font-size:13px">Versie)/, `<div class="sectie">Uitloggen</div>${blok}$1`);
};
