// ======================================================================
// 🔧 MOTEUR DE LA BARRE D'OUTILS (MMPA🌹) - COMPTALIA VERSION
// ======================================================================
(function() {
    
    // 1. IDENTIFICATION INTELLIGENTE DU COURS
    const params = new URLSearchParams(window.location.search);
    const urlId = params.get('id');
    const fileName = urlId ? urlId : window.location.pathname.split('/').pop().replace('.html', '');
    const titleReadable = fileName.replace(/_/g, ' '); 
    
    // --- CONNEXION INTELLIGENTE ---
    const globalDB = window.dbRessources || {};
    const resources = globalDB[fileName] || {};

    // 2. Fonction Calendrier (Google Agenda)
    const addToCalendar = () => {
        const baseUrl = "https://calendar.google.com/calendar/render";
        const action = "TEMPLATE";
        const text = encodeURIComponent("Relecture : " + titleReadable);
        const details = encodeURIComponent("Lien vers le cours : " + window.location.href);
        const calendarLink = `${baseUrl}?action=${action}&text=${text}&details=${details}`;
        window.open(calendarLink, '_blank');
    };
    window.addToCalendar = addToCalendar;

    // 3. Fonction Validation (Check)
    const toggleCheck = (btn) => {
        const key = `status_${fileName}_done`;
        const isDone = localStorage.getItem(key) === 'true';
        
        if (isDone) {
            localStorage.removeItem(key);
            btn.style.backgroundColor = 'white';
            btn.style.color = '#cbd5e1';
            btn.title = 'Marquer comme Complété';
        } else {
            localStorage.setItem(key, 'true');
            btn.style.backgroundColor = '#10B981'; 
            btn.style.color = 'white';
            btn.title = 'Démarquer';
        }
    };
    
    const initCheckState = () => {
        const btn = document.getElementById('btn-check-toolbar');
        if (!btn) return;
        
        const key = `status_${fileName}_done`;
        const isDone = localStorage.getItem(key) === 'true';
        
        if (isDone) {
            btn.style.backgroundColor = '#10B981';
            btn.style.color = 'white';
            btn.title = 'Démarquer';
        } else {
            btn.style.backgroundColor = 'white';
            btn.style.color = '#cbd5e1';
            btn.title = 'Marquer comme Complété';
        }
        
        btn.onclick = () => toggleCheck(btn);
    };

    // --- Variables de style ---
    const brandBlue = '#0F2C48';
    const brandGold = '#D9A526';
    const checkBg = localStorage.getItem(`status_${fileName}_done`) === 'true' ? '#10B981' : 'white';
    const checkColor = localStorage.getItem(`status_${fileName}_done`) === 'true' ? 'white' : '#cbd5e1';
    const checkBorder = localStorage.getItem(`status_${fileName}_done`) === 'true' ? '#10B981' : '#e2e8f0';


    // 4. Création de l'élément Toolbar
    const toolbar = document.createElement('div');
    toolbar.id = 'course-toolbar';
    toolbar.style.cssText = "position:fixed; top:0; left:0; right:0; background:#fff; z-index:10000; box-shadow:0 2px 10px rgba(0,0,0,0.05); padding:10px 20px;";

    // La barre d'outils HTML interne
    toolbar.innerHTML = `
        <div style="max-width: 900px; margin: 0 auto; display:flex; align-items:center; justify-content:space-between;">
            <span style="font-size:16px; font-weight:600; color:${brandBlue};">${titleReadable}</span>

            <div style="display:flex; align-items:center;">
                <a href="index.html" style="background:${brandBlue}; color:white; border:none; padding:8px 16px; border-radius:20px; font-size:12px; margin-right:15px; cursor:pointer; text-decoration: none; display: flex; align-items: center;">
                    <i class="fa-solid fa-home mr-2"></i> Tableau de bord
                </a>

                <button onclick="addToCalendar()" style="background:white; color:${brandGold}; border:1px solid #e2e8f0; width:36px; height:36px; border-radius:12px; cursor:pointer; display:flex; align-items:center; justify-content:center; font-size:14px;" 
                    title="Ajouter une Relecture à Google Agenda" id="btn-agenda-toolbar">
                    <i class="fa-solid fa-calendar-alt"></i>
                </button>

                <button id="btn-check-toolbar" style="background:${checkBg}; color:${checkColor}; border:1px solid ${checkBorder}; width:36px; height:36px; border-radius:12px; cursor:pointer; display:flex; align-items:center; justify-content:center; font-size:14px; margin-left:15px;" 
                        title="Valider">
                    <i class="fa-solid fa-check"></i>
                </button>
            </div>
        </div>
    `;

    // 5. Injecter FontAwesome (s'assurer qu'il est là)
    if (!document.querySelector('link[href*="font-awesome"]')) {
        const fa = document.createElement('link');
        fa.rel = 'stylesheet';
        fa.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css';
        document.head.appendChild(fa);
    }

    // CORRECTION : Utiliser paddingTop pour décaler le contenu sous la barre fixe
    document.body.style.paddingTop = "80px"; 
    document.body.appendChild(toolbar);

    // Initialiser l'état du bouton Check
    initCheckState();
})();