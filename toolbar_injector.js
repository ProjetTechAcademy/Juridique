// Ce script injecte automatiquement la barre d'outils en haut de tes pages de cours
(function() {
    // 1. Récupérer l'ID de la session depuis l'URL (ex: B0_M01_S001...)
    const fileName = window.location.pathname.split('/').pop().replace('.html', '');
    
    // --- TA BASE DE DONNÉES (Copie la même que dans index.html) ---
    const dbRessources = {
      "B0_M01_S001_La_notion_de_droit_du_travail": {
          audio: "LIEN_DRIVE_AUDIO",
          video: "LIEN_DRIVE_VIDEO",
          mindmap: "LIEN_DRIVE_CARTE",
          // ...
      }
      // ... Ajoute tes liens ici aussi
    };
    
    const resources = dbRessources[fileName] || {};

    // 2. Créer le HTML de la barre
    const toolbar = document.createElement('div');
    toolbar.style.cssText = "position:fixed; top:0; left:0; right:0; background:#fff; border-bottom:4px solid #D9A526; padding:10px 20px; display:flex; justify-content:space-between; align-items:center; z-index:10000; box-shadow:0 4px 20px rgba(0,0,0,0.1); font-family:sans-serif;";
    
    // Helper pour boutons
    const getBtn = (type, icon, title, color) => {
        const link = resources[type];
        const opacity = link ? '1' : '0.4';
        const cursor = link ? 'pointer' : 'not-allowed';
        const onclick = link ? `window.open('${link}', '_blank')` : "alert('Bientôt disponible')";
        return `<button style="background:${color}20; color:${color}; border:1px solid ${color}; width:36px; height:36px; border-radius:50%; cursor:${cursor}; opacity:${opacity}; display:flex; align-items:center; justify-content:center; font-size:14px; margin-left:8px;" title="${title}" onclick="${onclick}"><i class="fa-solid ${icon}"></i></button>`;
    };

    toolbar.innerHTML = `
        <div style="font-weight:bold; color:#0F2C48; font-size:14px;">
            <i class="fa-solid fa-graduation-cap" style="color:#D9A526; margin-right:8px;"></i>
            ${fileName.replace(/_/g, ' ')}
        </div>
        <div style="display:flex;">
            ${getBtn('audio', 'fa-headphones', 'Audio', '#8b5cf6')}
            ${getBtn('video', 'fa-video', 'Vidéo', '#ef4444')}
            ${getBtn('mindmap', 'fa-brain', 'Carte', '#d946ef')}
            ${getBtn('info', 'fa-chart-pie', 'Info', '#06b6d4')}
            <button style="background:#0F2C48; color:white; border:none; padding:8px 16px; border-radius:20px; font-size:12px; margin-left:15px; cursor:pointer;" onclick="window.close()">Fermer</button>
        </div>
    `;

    // 3. Injecter FontAwesome si pas présent
    if (!document.querySelector('link[href*="font-awesome"]')) {
        const fa = document.createElement('link');
        fa.rel = 'stylesheet';
        fa.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css';
        document.head.appendChild(fa);
    }

    document.body.style.marginTop = "70px"; // Faire de la place
    document.body.appendChild(toolbar);

})();