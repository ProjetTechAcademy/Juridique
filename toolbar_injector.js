// Ce script injecte automatiquement la barre d'outils en haut de tes pages de cours
(function() {
    // 1. Récupérer l'ID de la session depuis l'URL
    const fileName = window.location.pathname.split('/').pop().replace('.html', '');
    const titleReadable = fileName.replace(/_/g, ' '); // Titre propre pour l'agenda
    
    // --- TA BASE DE DONNÉES ---
    // (Même structure que dans index.html)
    const dbRessources = {
      "B0_M01_S001_La_notion_de_droit_du_travail": {
          audio: "LIEN_DRIVE_AUDIO",
          video: "LIEN_DRIVE_VIDEO",
          mindmap: "LIEN_DRIVE_CARTE",
          // ...
      }
    };
    
    const resources = dbRessources[fileName] || {};

    // 2. Fonction Calendrier (Google Agenda)
    const addToCalendar = () => {
        const baseUrl = "https://calendar.google.com/calendar/render";
        const action = "TEMPLATE";
        const text = encodeURIComponent("Relecture : " + titleReadable);
        const details = encodeURIComponent("Lien vers le cours : " + window.location.href);
        // On laisse l'utilisateur choisir la date dans Google Agenda
        const calendarLink = `${baseUrl}?action=${action}&text=${text}&details=${details}`;
        window.open(calendarLink, '_blank');
    };

    // 3. Fonction Validation (Check) - Sauvegarde dans le navigateur
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

    // 4. Créer le HTML de la barre
    const toolbar = document.createElement('div');
    toolbar.style.cssText = "position:fixed; top:0; left:0; right:0; background:#fff; border-bottom:4px solid #D9A526; padding:10px 20px; display:flex; justify-content:space-between; align-items:center; z-index:10000; box-shadow:0 4px 20px rgba(0,0,0,0.1); font-family:sans-serif; flex-wrap:wrap; gap:10px;";
    
    // Helper pour boutons (TOUJOURS ACTIFS)
    const getBtn = (type, icon, title, color, customAction = null) => {
        const link = resources[type];
        // Si pas de lien, on alerte juste, mais le bouton reste beau et cliquable
        const onclick = customAction ? customAction : (link ? `window.open('${link}', '_blank')` : `alert('${title} : Lien à venir')`);
        
        return `<button style="background:${color}20; color:${color}; border:1px solid ${color}; width:36px; height:36px; border-radius:50%; cursor:pointer; display:flex; align-items:center; justify-content:center; font-size:14px; margin-left:5px; transition:0.2s;" 
                onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'"
                title="${title}" onclick="${onclick}">
                <i class="fa-solid ${icon}"></i>
                </button>`;
    };

    // État initial du bouton check
    const isChecked = localStorage.getItem(`status_${fileName}_done`) === 'true';
    const checkBg = isChecked ? '#10b981' : 'white';
    const checkColor = isChecked ? 'white' : '#cbd5e1';
    const checkBorder = isChecked ? '#10b981' : '#e2e8f0';

    toolbar.innerHTML = `
        <div style="font-weight:bold; color:#0F2C48; font-size:14px; display:flex; align-items:center;">
            <i class="fa-solid fa-graduation-cap" style="color:#D9A526; margin-right:8px;"></i>
            ${titleReadable}
        </div>
        <div style="display:flex; align-items:center;">
            ${getBtn('audio', 'fa-headphones', 'Audio', '#8b5cf6')}
            ${getBtn('video', 'fa-video', 'Vidéo', '#ef4444')}
            ${getBtn('mindmap', 'fa-brain', 'Carte Mentale', '#d946ef')}
            ${getBtn('report', 'fa-file-lines', 'Rapports', '#64748b')}
            ${getBtn('learn', 'fa-graduation-cap', 'Fiches', '#10b981')}
            ${getBtn('quiz', 'fa-circle-question', 'Quiz', '#f59e0b')}
            ${getBtn('info', 'fa-chart-pie', 'Info', '#06b6d4')}
            
            <!-- PDF (Local ou DB) -->
            ${getBtn('pdf', 'fa-file-pdf', 'Note PDF', '#f97316', `window.open('${resources.pdf || fileName + ".pdf"}', '_blank')`)}
            
            <div style="width:1px; height:20px; background:#e2e8f0; margin:0 10px;"></div>

            <!-- Lien Studi -->
            ${getBtn('link', 'fa-link', 'Accès Studi', '#2563eb', "window.open('https://www.studi.com/fr/connexion', '_blank')")}
            
            <!-- Alarme (Fonctionnelle !) -->
            <button style="background:#fefce8; color:#eab308; border:1px solid #fef08a; width:36px; height:36px; border-radius:50%; cursor:pointer; display:flex; align-items:center; justify-content:center; font-size:14px; margin-left:5px;" 
                    title="Rappel Agenda" id="btn-alarm-toolbar">
                <i class="fa-solid fa-bell"></i>
            </button>

            <!-- Valider -->
            <button id="btn-check-toolbar" style="background:${checkBg}; color:${checkColor}; border:1px solid ${checkBorder}; width:36px; height:36px; border-radius:12px; cursor:pointer; display:flex; align-items:center; justify-content:center; font-size:14px; margin-left:5px;" 
                    title="Valider">
                <i class="fa-solid fa-check"></i>
            </button>

            <button style="background:#0F2C48; color:white; border:none; padding:8px 16px; border-radius:20px; font-size:12px; margin-left:15px; cursor:pointer;" onclick="window.close()">Fermer</button>
        </div>
    `;

    // 5. Injecter FontAwesome
    if (!document.querySelector('link[href*="font-awesome"]')) {
        const fa = document.createElement('link');
        fa.rel = 'stylesheet';
        fa.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css';
        document.head.appendChild(fa);
    }

    document.body.style.marginTop = "80px"; 
    document.body.appendChild(toolbar);

    // 6. Attacher les événements (Alarme & Check)
    // On le fait après l'injection HTML pour être sûr que les éléments existent
    document.getElementById('btn-alarm-toolbar').addEventListener('click', addToCalendar);
    document.getElementById('btn-check-toolbar').addEventListener('click', function() { toggleCheck(this); });

})();
