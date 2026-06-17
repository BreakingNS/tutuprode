document.addEventListener('DOMContentLoaded',()=>{
  const loginBox = document.getElementById('loginBox');
  const adminPass = document.getElementById('adminPass');
  const doLogin = document.getElementById('doLogin');
  const adminPanel = document.getElementById('adminPanel');
  const adminMatches = document.getElementById('adminMatches');
  const saveAll = document.getElementById('saveAll');
  const adminDaySelect = document.getElementById('adminDaySelect');

  function renderAdminDays(){
    adminDaySelect.innerHTML='';
    function formatDayDisplay(iso){ if(!iso) return ''; const [y,mo,d] = iso.split('-'); return `${d}-${mo}-${y}`; }
    DB.days.forEach(d=>{const opt=document.createElement('option');opt.value=d;opt.textContent=formatDayDisplay(d);adminDaySelect.appendChild(opt);});
  }

  function displayTeam(name){
    if(!name) return '';
    return (DB.nameMap && DB.nameMap[name]) ? DB.nameMap[name] : name;
  }

  function renderAdminMatches(day){
    adminMatches.innerHTML='';
    const matches = DB.matches.filter(m=>{
      if(!day) return true;
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
    matches.forEach(m=>{
      const box = document.createElement('div');box.className='match';
      // build HTML: result inputs + per-participant preds
      const predsHtml = DB.participants.map(p=>{
        const pr = (m.preds && m.preds[p]) || {a:'',b:''};
        return `
          <div class="predRow">
            <div class="predName"><strong>${p}</strong></div>
            <div>A: <input data-id="${m.id}" data-player="${p}" data-side="a" value="${pr.a===''? '': pr.a}" style="width:48px"></div>
            <div>B: <input data-id="${m.id}" data-player="${p}" data-side="b" value="${pr.b===''? '': pr.b}" style="width:48px"></div>
          </div>
        `;
      }).join('');

      const startLocal = m.startUtc ? (new Date(m.startUtc)).toLocaleString() : '';
      const html = `
        <div class="teams">${startLocal? startLocal : (m.date + (m.time? ' - ' + m.time: ''))} - ${displayTeam(m.teamA)} vs ${displayTeam(m.teamB)}</div>
        <div class="score">Resultado: A: <input data-id="${m.id}" data-side="A" value="${m.scoreA===null?'':m.scoreA}" style="width:48px"> B: <input data-id="${m.id}" data-side="B" value="${m.scoreB===null?'':m.scoreB}" style="width:48px"></div>
        <div class="predictionsAdmin">${predsHtml}</div>
      `;
      box.innerHTML = html;
      adminMatches.appendChild(box);
    });
  }

  doLogin.addEventListener('click',()=>{
    if(adminPass.value===DB.adminPass){
      loginBox.style.display='none';adminPanel.style.display='block';
      renderAdminDays();
      // select today's admin day by default
      const now = new Date(); const y = now.getFullYear(); const m = String(now.getMonth()+1).padStart(2,'0'); const d = String(now.getDate()).padStart(2,'0'); const todayStr = `${y}-${m}-${d}`;
      if(DB.days.includes(todayStr)) adminDaySelect.value = todayStr;
      renderAdminMatches(adminDaySelect.value);
    }else alert('Clave incorrecta');
  });

  adminDaySelect.addEventListener('change',()=> renderAdminMatches(adminDaySelect.value));

  adminMatches.addEventListener('input',e=>{
    const input = e.target;
    const id = Number(input.dataset.id);
    const side = input.dataset.side;
    const m = DB.matches.find(x=>x.id===id);
    if(!m) return;
    // If input has data-player it's a prediction field
    const player = input.dataset.player;
    const val = input.value.trim();
    if(player){
      if(!m.preds) m.preds = {};
      if(!m.preds[player]) m.preds[player] = {a:'',b:''};
      if(input.dataset.side==='a') m.preds[player].a = val===''? '': parseInt(val,10) || val;
      else m.preds[player].b = val===''? '': parseInt(val,10) || val;
      return;
    }

    if(val===''){
      if(side==='A') m.scoreA=null; else m.scoreB=null;
    }else{
      const n = parseInt(val,10);
      if(!isNaN(n)){
        if(side==='A') m.scoreA=n; else m.scoreB=n;
      }
    }
  });

  saveAll.addEventListener('click',()=>{
    saveDB();
    alert('Resultados guardados localmente.');
  });

  // Re-renderizar si la DB se actualiza desde remoto
  document.addEventListener('dbUpdated', ()=>{
    renderAdminDays();
    renderAdminMatches(adminDaySelect.value);
  });
});
