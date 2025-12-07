// ======================================================================
// 🔧 MOTEUR DE LA BARRE D'OUTILS (MMPA🌹) - STYLE 2025 PREMIUM
// ======================================================================
(function() {
    
    // 1. IDENTIFICATION INTELLIGENTE DU COURS
    const params = new URLSearchParams(window.location.search);
    let fileName = params.get('id');

    if (!fileName) {
        fileName = window.location.pathname.split('/').pop().replace('.html', '');
    }

    // Nettoyage du titre pour affichage
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
            // Style état "Non fait"
            btn.style.background = 'rgba(255,255,255,0.8)';
            btn.style.color = '#cbd5e1';
            btn.style.borderColor = '#e2e8f0';
            btn.innerHTML = '<i class="fa-solid fa-check"></i>';
        } else {
            localStorage.setItem(key, 'true');
            // Style état "Fait"
            btn.style.background = '#10b981';
            btn.style.color = 'white';
            btn.style.borderColor = '#10b981';
            btn.innerHTML = '<i class="fa-solid fa-check-double"></i>';
        }
    };

    // 5. Création de la barre (STYLES MIS À JOUR 2025)
    const toolbar = document.createElement('div');
    // Design : Dégradé blanc subtil, bordure dorée, ombre élégante
    toolbar.style.cssText = "position:fixed; top:0; left:0; right:0; background: linear-gradient(to bottom, #ffffff, #fcfcfc); border-bottom:4px solid #D9A526; padding:8px 20px; display:flex; justify-content:space-between; align-items:center; z-index:10000; box-shadow:0 10px 25px rgba(15, 44, 72, 0.15); font-family:'Outfit', sans-serif; flex-wrap:wrap; gap:10px; min-height:60px;";
    
    // Fonction utilitaire pour créer les boutons
    const getBtn = (type, icon, title, colorBase, customAction = null) => {
        const link = resources[type];
        // Si pas de lien, opacité réduite mais visible
        const isActive = (link || customAction);
        const opacity = isActive ? "1" : "0.4";
        const cursor = isActive ? "pointer" : "default";
        
        // Action au clic
        const onclick = customAction ? customAction : (link ? `window.open('${link}', '_blank')` : `/* Inactif */`);

        // Style du bouton : Blanc avec bordure colorée, devient plein au survol
        return `
        <button 
            style="
                width:38px; height:38px; border-radius:50%; 
                background:white; color:${colorBase}; border:1px solid ${colorBase}40; 
                opacity:${opacity}; cursor:${cursor}; 
                display:flex; align-items:center; justify-content:center; 
                font-size:15px; margin-left:6px; transition:all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                box-shadow: 0 2px 5px rgba(0,0,0,0.05);
            " 
            onmouseover="if(${isActive}){ this.style.transform='translateY(-2px)'; this.style.background='${colorBase}'; this.style.color='white'; this.style.boxShadow='0 5px 12px ${colorBase}40'; }" 
            onmouseout="if(${isActive}){ this.style.transform='translateY(0)'; this.style.background='white'; this.style.color='${colorBase}'; this.style.boxShadow='0 2px 5px rgba(0,0,0,0.05)'; }"
            title="${title}" onclick="${onclick}">
            <i class="fa-solid ${icon}"></i>
        </button>`;
    };

    // État initial du bouton "Fait/Pas fait"
    const isChecked = localStorage.getItem(`status_${fileName}_done`) === 'true';
    const checkBg = isChecked ? '#10b981' : 'rgba(255,255,255,0.8)';
    const checkColor = isChecked ? 'white' : '#cbd5e1';
    const checkBorder = isChecked ? '#10b981' : '#e2e8f0';
    const checkIcon = isChecked ? 'fa-check-double' : 'fa-check';

    // Injection du HTML
    toolbar.innerHTML = `
        <div style="font-weight:700; color:#0F2C48; font-size:15px; display:flex; align-items:center; background:rgba(15, 44, 72, 0.05); padding:5px 15px; border-radius:20px;">
            <i class="fa-solid fa-graduation-cap" style="color:#D9A526; margin-right:10px;"></i>
            <span style="max-width:350px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${titleReadable}</span>
        </div>
        
        <div style="display:flex; align-items:center;">
            ${getBtn('audio', 'fa-headphones', 'Audio', '#8b5cf6')}
            ${getBtn('video', 'fa-video', 'Vidéo', '#ef4444')}
            ${getBtn('learn', 'fa-graduation-cap', 'Fiches', '#10b981')}
            ${getBtn('info', 'fa-chart-pie', 'Info', '#06b6d4')}
            
            ${getBtn('pdf', 'fa-file-pdf', 'Note PDF', '#f97316', `window.open('${resources.pdf || "#"}', '_blank')`)}
            
            <div style="width:1px; height:24px; background:#e2e8f0; margin:0 12px;"></div>

            ${getBtn('studi', 'fa-link', 'Accès Studi', '#2563eb', `window.open('${resources.studi || "https://www.studi.com/fr/connexion"}', '_blank')`)}
            
            <button style="background:#fffbeb; color:#d97706; border:1px solid #fcd34d; width:38px; height:38px; border-radius:50%; cursor:pointer; display:flex; align-items:center; justify-content:center; font-size:15px; margin-left:6px; box-shadow: 0 2px 5px rgba(0,0,0,0.05); transition:0.2s;" 
                    onmouseover="this.style.transform='scale(1.1)'; this.style.boxShadow='0 0 10px #fcd34d';" 
                    onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 2px 5px rgba(0,0,0,0.05)';"
                    title="Rappel Agenda" id="btn-alarm-toolbar">
                <i class="fa-solid fa-bell"></i>
            </button>

            <button id="btn-check-toolbar" style="background:${checkBg}; color:${checkColor}; border:1px solid ${checkBorder}; width:38px; height:38px; border-radius:10px; cursor:pointer; display:flex; align-items:center; justify-content:center; font-size:15px; margin-left:12px; transition:0.3s; box-shadow: 0 4px 10px rgba(0,0,0,0.1);" 
                    title="Valider">
                <i class="fa-solid ${checkIcon}"></i>
            </button>

            <button style="background:#0F2C48; color:white; border:none; padding:8px 18px; border-radius:20px; font-size:13px; font-weight:600; margin-left:20px; cursor:pointer; box-shadow: 0 4px 10px rgba(15, 44, 72, 0.3); transition:0.2s;" 
                    onmouseover="this.style.background='#1a3b5c'; this.style.transform='translateY(-1px)';" 
                    onmouseout="this.style.background='#0F2C48'; this.style.transform='translateY(0)';"
                    onclick="window.close()">
                Fermer
            </button>
        </div>
    `;

    // Chargement FontAwesome si absent
    if (!document.querySelector('link[href*="font-awesome"]')) {
        const fa = document.createElement('link');
        fa.rel = 'stylesheet';
        fa.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css';
        document.head.appendChild(fa);
    }

    document.body.appendChild(toolbar);

    // Events
    document.getElementById('btn-alarm-toolbar').addEventListener('click', addToCalendar);
    document.getElementById('btn-check-toolbar').addEventListener('click', function() { toggleCheck(this); });

})();