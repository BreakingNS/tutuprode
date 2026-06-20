/* Lógica principal para la vista pública */
document.addEventListener('DOMContentLoaded',()=>{
  const participantsList = document.getElementById('participantsList');
  const daySelect = document.getElementById('daySelect');
  const matchesList = document.getElementById('matchesList');
  const summary = document.getElementById('summary');

  function renderParticipants(){
    participantsList.innerHTML = DB.participants.map(p=>`<div>${p}</div>`).join('');
  }

  function displayTeam(name){
    if(!name) return '';
    return (DB.nameMap && DB.nameMap[name]) ? DB.nameMap[name] : name;
  }

  function formatDayDisplay(iso){
    if(!iso) return '';
    // Mostrar en formato: "Miércoles 17/06" (sin año)
    try{
      // Crear la fecha en horario local a partir de la cadena YYYY-MM-DD
      const parts = iso.split('-');
      const y = parseInt(parts[0],10);
      const mo = parseInt(parts[1],10);
      const da = parseInt(parts[2],10);
      const dt = new Date(y, mo-1, da);
      // obtener nombre del día en español
      const weekday = dt.toLocaleDateString('es-ES', { weekday: 'long' });
      const day = String(dt.getDate()).padStart(2,'0');
      const month = String(dt.getMonth()+1).padStart(2,'0');
      // Capitalizar la primera letra del weekday
      const weekdayCap = weekday.charAt(0).toUpperCase() + weekday.slice(1);
      return `${weekdayCap} ${day}/${month}`;
    }catch(e){
      const [y,mo,d] = iso.split('-');
      return `${d}-${mo}`;
    }
  }

  // llenar selector de días
  function renderDays(){
    daySelect.innerHTML='';
    DB.days.forEach(d=>{
      const opt=document.createElement('option');opt.value=d;opt.textContent=formatDayDisplay(d);daySelect.appendChild(opt);
    });
    // Seleccionar por defecto la fecha correspondiente al día actual.
    // Regla: si la hora es exactamente 00:00, avanzar al día siguiente.
    const now = new Date();
    let today = new Date(now);
    if(now.getHours()===0 && now.getMinutes()===0) {
      today = new Date(now.getTime() + 24*60*60*1000);
    }
    const y = today.getFullYear();
    const m = String(today.getMonth()+1).padStart(2,'0');
    const d = String(today.getDate()).padStart(2,'0');
    const todayStr = `${y}-${m}-${d}`;

    // Si hoy está en la lista, seleccionar; si no, seleccionar la primera fecha >= hoy; si ninguna, seleccionar la última
    if(DB.days.includes(todayStr)){
      daySelect.value = todayStr;
    } else {
      const future = DB.days.find(dt => dt >= todayStr);
      if(future) daySelect.value = future; else daySelect.value = DB.days[DB.days.length-1];
    }
    // Renderizar partidos para la fecha seleccionada
    renderMatches(daySelect.value);
  }

  function getMatchesByDay(day){
    return DB.matches.filter(m=>{
      if(m.startUtc){
        const local = new Date(m.startUtc);
        const y = local.getFullYear();
        const mo = String(local.getMonth()+1).padStart(2,'0');
        const da = String(local.getDate()).padStart(2,'0');
        return `${y}-${mo}-${da}` === day;
      }
      if(m.date) return m.date === day;
      return false;
    });
  }

  // puntuación: 3 exacto, 1 por resultado (ganador/empate)
  function scorePrediction(pred, actual){
    if(actual.scoreA===null || actual.scoreB===null) return 0;
    const a = actual.scoreA, b = actual.scoreB;
    if(pred.a===a && pred.b===b) return 3;
    const sign = (x,y)=> x>y?1:(x<y?-1:0);
    return sign(pred.a,pred.b)===sign(a,b)?1:0;
  }

  function computeSummary(){
    // para cada participante, calcular: resultados exactos y aciertos de ganador/empate
    // y derivar puntos con la fórmula: puntos = outcomeCount + exactCount*2
    const res = DB.participants.map(name=>({name, points:0, exactCount:0, outcomeCount:0}));
    DB.matches.forEach(m=>{
      DB.participants.forEach((p,i)=>{
        const pred = (m.preds && m.preds[p]) || null;
        if(!pred) return;
        const actualA = m.scoreA;
        const actualB = m.scoreB;
        if(actualA===null || actualB===null) return;

        // detectar exacto (usar comparación laxa para tolerar strings/números)
        if(pred.a == actualA && pred.b == actualB) res[i].exactCount += 1;

        const sign = (x,y)=> x>y?1:(x<y?-1:0);
        if(sign(pred.a,pred.b) === sign(actualA, actualB)) res[i].outcomeCount += 1;
      });
    });

    // derivar puntos a partir de los conteos: cada acierto de signo vale 1, y cada exacto suma 2 adicionales (total 3)
    res.forEach(r=>{ r.points = r.outcomeCount + (r.exactCount * 2); });
    return res.sort((a,b)=>b.points-a.points);
  }

  function renderSummary(){
    const s = computeSummary();
    const table = document.createElement('table');table.className='summaryTable';
    const thead = document.createElement('thead');
    thead.innerHTML = '<tr><th>Participante</th><th>Resultados correctos</th><th>Ganador/Empate correctos</th><th>Puntos</th></tr>';
    table.appendChild(thead);
    const tbody = document.createElement('tbody');
    s.forEach(r=>{
      const tr=document.createElement('tr');
      tr.innerHTML = `<td>${r.name}</td><td>${r.exactCount}</td><td>${r.outcomeCount}</td><td class="points">${r.points}</td>`;
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    summary.innerHTML='';summary.appendChild(table);
  }

  function renderMatches(day){
    matchesList.innerHTML='';
    const matches = getMatchesByDay(day);
    matches.forEach(m=>{
      // render match

      const div=document.createElement('div');div.className='match';
      // Header: teams and time
      const header = document.createElement('div'); header.className='teams';
      header.innerHTML = `<div class="team">${displayTeam(m.teamA)}</div><div style="margin:0 12px;font-weight:700;">vs</div><div class="team">${displayTeam(m.teamB)}</div>`;
      div.appendChild(header);

      // mostrar hora local si startUtc existe
      if(m.startUtc){
        const local = new Date(m.startUtc);
        const hh = String(local.getHours()).padStart(2,'0');
        const mm = String(local.getMinutes()).padStart(2,'0');
        const tm = document.createElement('div'); tm.className='matchTime'; tm.textContent = `${hh}:${mm}hs`;
        div.appendChild(tm);
      } else if(m.time){
        const tm = document.createElement('div'); tm.className='matchTime'; tm.textContent = `${m.time}hs`;
        div.appendChild(tm);
      }

      // resultado
      const res = document.createElement('div'); res.className='score'; res.style.marginTop='8px';
      res.innerHTML = `<strong>Resultado:</strong> ${m.scoreA===null?'- - -':`${m.scoreA} - ${m.scoreB}`}`;
      div.appendChild(res);

      // predictions block centered
      const predsWrap = document.createElement('div'); predsWrap.className='predictions';
      DB.participants.forEach(p=>{
        const pr = document.createElement('div'); pr.className='pred';
        const pred = (m.preds && m.preds[p]) || {a:'',b:''};
        const a = (pred.a===''||pred.a==null)?'-':pred.a;
        const b = (pred.b===''||pred.b==null)?'-':pred.b;
        const nameDiv = document.createElement('div'); nameDiv.className='predName'; nameDiv.textContent = p;
        const scoreDiv = document.createElement('div'); scoreDiv.className='predScore'; scoreDiv.textContent = `${a} - ${b}`;

        const badge = document.createElement('div'); badge.className='scoreBadge scoreZero';
        if(m.scoreA!==null && m.scoreB!==null && pred && pred.a!=='' && pred.b!==''){
          const sc = scorePrediction({a:pred.a,b:pred.b}, {scoreA:m.scoreA, scoreB:m.scoreB});
          if(sc===3) badge.className='scoreBadge scoreThree', badge.textContent='+3';
          else if(sc===1) badge.className='scoreBadge scoreOne', badge.textContent='+1';
          else badge.className='scoreBadge scoreZero', badge.textContent='0';
        } else { badge.textContent=''; }

        pr.appendChild(nameDiv); pr.appendChild(scoreDiv); pr.appendChild(badge);
        predsWrap.appendChild(pr);
      });
      div.appendChild(predsWrap);
      matchesList.appendChild(div);
    });
  }

  function render(){
    renderParticipants();
    renderDays();
    renderSummary();
  }

  // (Se eliminó la sección de grupos por preferencia del usuario)

  daySelect.addEventListener('change',e=>renderMatches(e.target.value));

  render();

  // Si la DB se actualiza desde remoto, re-renderizar
  document.addEventListener('dbUpdated', ()=>{
    render();
  });
});
