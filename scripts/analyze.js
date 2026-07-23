const fs = require('fs');
const vm = require('vm');

const file = fs.readFileSync('../js/data.js','utf8');
const start = file.indexOf('const DB =');
if(start===-1) throw new Error('DB not found');
let i = start + 'const DB ='.length;
// find matching closing brace for the DB object
let brace = 0;
let inString = false;
let stringChar = null;
let escaped = false;
let endIndex = -1;
for(; i<file.length; i++){
  const ch = file[i];
  if(inString){
    if(escaped){ escaped = false; continue; }
    if(ch === '\\') { escaped = true; continue; }
    if(ch === stringChar) { inString = false; stringChar = null; continue; }
    continue;
  }
  if(ch === '"' || ch === "'") { inString = true; stringChar = ch; continue; }
  if(ch === '{') { brace++; if(brace===1 && endIndex===-1) {
      // first opening
    }
  }
  if(ch === '}') { brace--; if(brace===0){ endIndex = i; break; } }
}
if(endIndex===-1) throw new Error('could not find end of DB');
const dbText = file.slice(start, endIndex+1);
// Evaluate safely to get DB
const scriptText = dbText + '\nDB';
const DB = vm.runInNewContext(scriptText, {}, {timeout:1000});

function safeNum(x){ return typeof x==='number' ? x : (x===null? null: Number(x)); }

// collect teams
const teams = new Set();
DB.matches.forEach(m=>{ if(m.teamA) teams.add(m.teamA); if(m.teamB) teams.add(m.teamB); });
const teamList = Array.from(teams);

// initialize stats
const stats = {};
teamList.forEach(t=> stats[t]={played:0, wins:0, draws:0, losses:0, goalsFor:0, goalsAgainst:0, points:0, streak:0, maxStreak:0});

// sort matches by startUtc
const matches = DB.matches.slice().sort((a,b)=> new Date(a.startUtc) - new Date(b.startUtc));

// helper to update stats for a match
function updateMatch(m){
  const a = safeNum(m.scoreA);
  const b = safeNum(m.scoreB);
  if(a===null || b===null) return; // skip not played
  const A = stats[m.teamA];
  const B = stats[m.teamB];
  A.played++; B.played++;
  A.goalsFor += a; A.goalsAgainst += b;
  B.goalsFor += b; B.goalsAgainst += a;
  if(a>b){ A.wins++; B.losses++; A.points +=3; A.streak = (A.streak||0)+1; B.streak = 0; }
  else if(a<b){ B.wins++; A.losses++; B.points +=3; B.streak = (B.streak||0)+1; A.streak = 0; }
  else { A.draws++; B.draws++; A.points +=1; B.points +=1; A.streak = 0; B.streak = 0; }
  A.maxStreak = Math.max(A.maxStreak||0, A.streak||0);
  B.maxStreak = Math.max(B.maxStreak||0, B.streak||0);
}

// Compute cumulative standings after each day in DB.days and count who is first
const days = DB.days.slice();
const firstCount = {};
teamList.forEach(t=> firstCount[t]=0);

// We'll iterate by day, process matches up to end of that day (UTC)
let processedMatches = [];
teamList.forEach(t=>{
  stats[t].played=0; stats[t].wins=0; stats[t].draws=0; stats[t].losses=0; stats[t].goalsFor=0; stats[t].goalsAgainst=0; stats[t].points=0; stats[t].streak=0; stats[t].maxStreak=0;
});

for(const day of days){
  const end = new Date(day + 'T23:59:59Z');
  const todays = matches.filter(m=> new Date(m.startUtc) <= end && !processedMatches.includes(m.id));
  todays.forEach(m=>{ updateMatch(m); processedMatches.push(m.id); });
  // determine leader: sort by points, goal diff, goals for
  const ranking = teamList.slice().sort((x,y)=>{
    const ax = stats[x].points || 0, ay = stats[y].points || 0;
    if(ax!==ay) return ay-ax;
    const gdX = (stats[x].goalsFor||0)-(stats[x].goalsAgainst||0);
    const gdY = (stats[y].goalsFor||0)-(stats[y].goalsAgainst||0);
    if(gdX!==gdY) return gdY-gdX;
    return (stats[y].goalsFor||0) - (stats[x].goalsFor||0);
  });
  const leader = ranking[0];
  if(leader) firstCount[leader] = (firstCount[leader]||0)+1;
}

// After processing all matches, compute final stats (recompute from zero)
teamList.forEach(t=>{
  stats[t]={played:0,wins:0,draws:0,losses:0,goalsFor:0,goalsAgainst:0,points:0,streak:0,maxStreak:0};
});
matches.forEach(m=> updateMatch(m));

// Winner (final id 104)
const finalMatch = DB.matches.find(mm=> mm.id===104);
let champion = null;
if(finalMatch){
  const a = safeNum(finalMatch.scoreA);
  const b = safeNum(finalMatch.scoreB);
  if(a===null || b===null) champion = null;
  else if(a>b) champion = finalMatch.teamA;
  else if(a<b) champion = finalMatch.teamB;
  else champion = null; // draw in data
}

// Remontada epica: define as matches where winner scored > loser and loser had >=2 goals (approximation)
const remontadas = matches.filter(m=>{
  const a = safeNum(m.scoreA); const b = safeNum(m.scoreB);
  if(a===null||b===null) return false;
  if(a>b && b>=2) return true;
  if(b>a && a>=2) return true;
  return false;
});

// Max goals (team)
const goalsFor = {};
teamList.forEach(t=> goalsFor[t]=0);
matches.forEach(m=>{
  const a = safeNum(m.scoreA); const b = safeNum(m.scoreB);
  if(a===null||b===null) return;
  goalsFor[m.teamA]+=a; goalsFor[m.teamB]+=b;
});
const maxGoalsTeam = Object.keys(goalsFor).reduce((p,c)=> goalsFor[c]>goalsFor[p]?c:p, Object.keys(goalsFor)[0]);

// Best defense (fewest goals conceded)
const goalsAgainst = {};
teamList.forEach(t=> goalsAgainst[t]=0);
matches.forEach(m=>{
  const a = safeNum(m.scoreA); const b = safeNum(m.scoreB);
  if(a===null||b===null) return;
  goalsAgainst[m.teamA]+=b; goalsAgainst[m.teamB]+=a;
});
const bestDefense = Object.keys(goalsAgainst).reduce((p,c)=> goalsAgainst[c]<goalsAgainst[p]?c:p, Object.keys(goalsAgainst)[0]);

// Biggest goleada (max goal diff)
let biggest = null; let maxDiff = -1;
matches.forEach(m=>{
  const a=safeNum(m.scoreA), b=safeNum(m.scoreB); if(a===null||b===null) return;
  const diff = Math.abs(a-b);
  if(diff>maxDiff){ maxDiff=diff; biggest=m; }
});

// Match with most goals (sum)
let mostGoalsMatch = null; let maxSum = -1;
matches.forEach(m=>{
  const a=safeNum(m.scoreA), b=safeNum(m.scoreB); if(a===null||b===null) return;
  const s = a+b; if(s>maxSum){ maxSum=s; mostGoalsMatch=m; }
});

// Longest win streak per team
const longestStreaks = {};
teamList.forEach(t=> longestStreaks[t]=0);
// compute sequentially
const winsSeq = {};
teamList.forEach(t=> winsSeq[t]=0);
matches.forEach(m=>{
  const a=safeNum(m.scoreA), b=safeNum(m.scoreB); if(a===null||b===null) return;
  if(a>b){ winsSeq[m.teamA]++; longestStreaks[m.teamA]=Math.max(longestStreaks[m.teamA], winsSeq[m.teamA]); winsSeq[m.teamB]=0; }
  else if(b>a){ winsSeq[m.teamB]++; longestStreaks[m.teamB]=Math.max(longestStreaks[m.teamB], winsSeq[m.teamB]); winsSeq[m.teamA]=0; }
  else { winsSeq[m.teamA]=0; winsSeq[m.teamB]=0; }
});
const bestStreakTeam = Object.keys(longestStreaks).reduce((p,c)=> longestStreaks[c]>longestStreaks[p]?c:p, Object.keys(longestStreaks)[0]);

// Best pronosticador: scoring 3 exact, 1 correct outcome
const participants = DB.participants || [];
const scores = {};
participants.forEach(p=> scores[p]=0);
matches.forEach(m=>{
  const a=safeNum(m.scoreA), b=safeNum(m.scoreB); if(a===null||b===null) return;
  participants.forEach(p=>{
    const pred = (m.preds && m.preds[p])? m.preds[p] : null;
    if(!pred) return;
    const pa = safeNum(pred.a); const pb = safeNum(pred.b);
    if(pa===a && pb===b) scores[p]+=3;
    else {
      const realOutcome = a===b?0:(a>b?1:2);
      const predOutcome = pa===pb?0:(pa>pb?1:2);
      if(realOutcome===predOutcome) scores[p]+=1;
    }
  });
});
const bestPredictor = participants.reduce((p,c)=> scores[c]>scores[p]?c:p, participants[0]);

// Partido más impredecible: sum absolute error
let unpredictableMatch = null; let maxError=-1;
matches.forEach(m=>{
  const a=safeNum(m.scoreA), b=safeNum(m.scoreB); if(a===null||b===null) return;
  let err=0; participants.forEach(p=>{
    const pred = (m.preds && m.preds[p])? m.preds[p] : null;
    if(!pred) return; const pa=safeNum(pred.a), pb=safeNum(pred.b); err += Math.abs((pa||0)-a)+Math.abs((pb||0)-b);
  });
  if(err>maxError){ maxError=err; unpredictableMatch=m; }
});

// Most draws and least draws
let mostDrawsTeam = null; let leastDrawsTeam = null; let maxDraws=-1; let minDraws=1e9;
teamList.forEach(t=>{ const d=stats[t].draws||0; if(d>maxDraws){ maxDraws=d; mostDrawsTeam=t;} if(d<minDraws){ minDraws=d; leastDrawsTeam=t; }});

// Output human readable Spanish
function teamLabel(t){ return t || '—'; }

const out = [];
out.push('Resumen de destacables:');

out.push('\n1) Ganador (campeón):');
if(champion) out.push(`- Ganador: ${champion}. Razonamiento: victoria en la final (id:104) registrada como ${finalMatch.scoreA}–${finalMatch.scoreB}.`);
else out.push('- No hay ganador registrado en los datos: la final (id:104) figura como empate  ' + (finalMatch? `${finalMatch.scoreA}–${finalMatch.scoreB}` : 'sin resultado') + ". Si el campeón se definió por penales, no está reflejado en los datos.");

out.push('\n2) El que estuvo más tiempo primero:');
const leader = Object.keys(firstCount).reduce((p,c)=> firstCount[c]>firstCount[p]?c:p, Object.keys(firstCount)[0]);
out.push(`- Equipo: ${leader}. Razonamiento: fue líder de la tabla en ${firstCount[leader]} días según los empates parciales y resultados procesados cronológicamente.`);

out.push('\n3) Remontada épica (aprox.):');
if(remontadas.length===0) out.push('- No se detectaron remontadas épicas según la heurística aplicada (ganador venció a un rival que había marcado ≥2 goles).');
else{
  remontadas.forEach(m=>{
    const a=safeNum(m.scoreA), b=safeNum(m.scoreB);
    const winner = a>b?m.teamA:m.teamB; const loser = a>b?m.teamB:m.teamA;
    out.push(`- ${m.teamA} ${a}–${b} ${m.teamB}: posible remontada a favor de ${winner}. Razonamiento: el rival anotó ${a>b?b:a} goles (≥2) y aun así perdió, lo que sugiere que hubo al menos una recuperación importante (no hay datos de minutos).`);
  });
}

out.push('\nOtros indicadores:');
out.push(`- Máximo goleador (equipo): ${maxGoalsTeam} con ${goalsFor[maxGoalsTeam]} goles. Razonamiento: suma de goles en todos los partidos registrados.`);
out.push(`- Mejor defensa: ${bestDefense} con ${goalsAgainst[bestDefense]} goles recibidos. Razonamiento: menor total de goles en contra.`);
if(biggest) out.push(`- Mayor goleada: ${biggest.teamA} ${biggest.scoreA}–${biggest.scoreB} ${biggest.teamB} (diff ${Math.abs(biggest.scoreA-biggest.scoreB)}).`);
if(mostGoalsMatch) out.push(`- Partido con más goles: ${mostGoalsMatch.teamA} ${mostGoalsMatch.scoreA}–${mostGoalsMatch.scoreB} ${mostGoalsMatch.teamB} (total ${mostGoalsMatch.scoreA+mostGoalsMatch.scoreB}).`);
out.push(`- Racha más larga: ${bestStreakTeam} con ${longestStreaks[bestStreakTeam]} victorias consecutivas. Razonamiento: conteo secuencial de victorias en orden cronológico.`);
out.push(`- Mejor pronosticador: ${bestPredictor} con ${scores[bestPredictor]} puntos (3 exactos, 1 por resultado).`);
if(unpredictableMatch) out.push(`- Partido más impredecible: ${unpredictableMatch.teamA} ${unpredictableMatch.scoreA}–${unpredictableMatch.scoreB} ${unpredictableMatch.teamB} con error agregado ${maxError} entre predicciones y resultado.`);
out.push(`- Más empates: ${mostDrawsTeam} (${maxDraws} empates). Menos empates: ${leastDrawsTeam} (${minDraws} empates).`);

console.log(out.join('\n'));
