// ======================================================================
// 🔧 MOTEUR DE LA BARRE D'OUTILS (MMPA🌹) - VERSION CORRIGÉE (NO GAP)
// ======================================================================
(function() {
    
    // 1. IDENTIFICATION INTELLIGENTE DU COURS
    const params = new URLSearchParams(window.location.search);
    let fileName = params.get('id');

    if (!fileName) {
        fileName = window.location.pathname.split('/').pop().replace('.html', '');
    }

    const titleReadable = fileName ? fileName.replace(/_/g, ' ') : "Cours sans titre";
    
    // 2. CONNEXION BASE DE DONNÉES
    const globalDB = window.dbRessources || {};
    const resources = globalDB[fileName] || {};

    // 3. Fonction Calendrier
    const addToCalendar = () => {
        const baseUrl = "https://calendar.google.com/calendar/render";
        const action = "TEMPLATE";
        const text = encodeURIComponent("Relecture : " + titleReadable);
        const details = encodeURIComponent("Lien vers le cours : " + window.location.href);
        const calendarLink = `${baseUrl}?action=${action}&text=${text}&details=${details}`;
        window.open(calendarLink, '_blank');
    };

    // 4. Fonction Validation
    const toggleCheck = (btn) => {
        const key = `status_${fileName}_done`;
        const isDone = localStorage.getItem(key) === 'true';
        
        if (isDone) {
            localStorage.removeItem(key);
            btn.style.backgroundColor = 'white';
            btn.style.color = '#cbd5e1';
            btn.style.borderColor = '#e2e8f0';
        } else {
            localStorage.setItem(key, 'true');
            btn.style.backgroundColor = '#10b981';
            btn.style.color = 'white';
            btn.style.borderColor = '#10b981';
        }
    };

    // 5. Création de la barre
    const toolbar = document.createElement('div');
    // Note : Hauteur calculée environ 60px (10+10 padding + 36 icon + 4 border)
    toolbar.style.cssText = "position:fixed; top:0; left:0; right:0; background:#fff; border-bottom:4px solid #D9A526; padding:10px 20px; display:flex; justify-content:space-between; align-items:center; z-index:10000; box-shadow:0 4px 20px rgba(0,0,0,0.1); font-family:sans-serif; flex-wrap:wrap; gap:10px;";
    
    const getBtn = (type, icon, title, color, customAction = null) => {
        const link = resources[type];
        const onclick = customAction ? customAction : (link ? `window.open('${link}', '_blank')` : `alert('Ressource ${title} non disponible.')`);
        const opacity = (link || customAction) ? "1" : "0.5";

        return `<button style="background:${color}20; color:${color}; border:1px solid ${color}; opacity:${opacity}; width:36px; height:36px; border-radius:50%; cursor:pointer; display:flex; align-items:center; justify-content:center; font-size:14px; margin-left:5px; transition:0.2s;" 
                onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'"
                title="${title}" onclick="${onclick}">
                <i class="fa-solid ${icon}"></i>
                </button>`;
    };

    const isChecked = localStorage.getItem(`status_${fileName}_done`) === 'true';
    const checkBg = isChecked ? '#10b981' : 'white';
    const checkColor = isChecked ? 'white' : '#cbd5e1';
    const checkBorder = isChecked ? '#10b981' : '#e2e8f0';

    toolbar.innerHTML = `
        <div style="font-weight:bold; color:#0F2C48; font-size:14px; display:flex; align-items:center;">
            <i class="fa-solid fa-graduation-cap" style="color:#D9A526; margin-right:8px;"></i>
            <span style="max-width:300px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${titleReadable}</span>
        </div>
        <div style="display:flex; align-items:center;">
            ${getBtn('audio', 'fa-headphones', 'Audio', '#8b5cf6')}
            ${getBtn('video', 'fa-video', 'Vidéo', '#ef4444')}
            ${getBtn('learn', 'fa-graduation-cap', 'Fiches', '#10b981')}
            ${getBtn('info', 'fa-chart-pie', 'Info', '#06b6d4')}
            
            ${getBtn('pdf', 'fa-file-pdf', 'Note PDF', '#f97316', `window.open('${resources.pdf || "#"}', '_blank')`)}
            
            <div style="width:1px; height:20px; background:#e2e8f0; margin:0 10px;"></div>

            ${getBtn('studi', 'fa-link', 'Accès Studi', '#2563eb', `window.open('${resources.studi || "https://www.studi.com/fr/connexion"}', '_blank')`)}
            
            <button style="background:#fefce8; color:#eab308; border:1px solid #fef08a; width:36px; height:36px; border-radius:50%; cursor:pointer; display:flex; align-items:center; justify-content:center; font-size:14px; margin-left:5px;" 
                    title="Rappel Agenda" id="btn-alarm-toolbar">
                <i class="fa-solid fa-bell"></i>
            </button>

            <button id="btn-check-toolbar" style="background:${checkBg}; color:${checkColor}; border:1px solid ${checkBorder}; width:36px; height:36px; border-radius:12px; cursor:pointer; display:flex; align-items:center; justify-content:center; font-size:14px; margin-left:5px;" 
                    title="Valider">
                <i class="fa-solid fa-check"></i>
            </button>

            <button style="background:#0F2C48; color:white; border:none; padding:8px 16px; border-radius:20px; font-size:12px; margin-left:15px; cursor:pointer;" onclick="window.close()">Fermer</button>
        </div>
    `;

    if (!document.querySelector('link[href*="font-awesome"]')) {
        const fa = document.createElement('link');
        fa.rel = 'stylesheet';
        fa.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css';
        document.head.appendChild(fa);
    }

    // ON A SUPPRIMÉ LE MARGIN-TOP DU BODY ICI POUR ÉVITER LE DOUBLE ESPACE
    document.body.appendChild(toolbar);

    document.getElementById('btn-alarm-toolbar').addEventListener('click', addToCalendar);
    document.getElementById('btn-check-toolbar').addEventListener('click', function() { toggleCheck(this); });

})();