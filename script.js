// ===== Switch de langue (FR / EN) =====
function getSavedLang() {
    try {
        return localStorage.getItem('jaabari-lang');
    } catch (e) {
        return null;
    }
}

function saveLang(lang) {
    try {
        localStorage.setItem('jaabari-lang', lang);
    } catch (e) {
        // localStorage indisponible (ex: fichier ouvert en local) — on ignore simplement
    }
}

let currentLang = getSavedLang() || 'fr';

const railLabelsByLang = {
    fr: { home: 'Accueil', about: 'Compétences', portfolio: 'Portfolio', services: 'Services', contact: 'Contact' },
    en: { home: 'Home', about: 'Skills', portfolio: 'Portfolio', services: 'Services', contact: 'Contact' }
};

function setLanguage(lang) {
    currentLang = lang;
    saveLang(lang);

    document.querySelectorAll('[data-fr]').forEach((el) => {
        const text = lang === 'fr' ? el.getAttribute('data-fr') : el.getAttribute('data-en');
        if (text !== null) el.textContent = text;
    });

    document.documentElement.lang = lang;

    const langBtn = document.getElementById('langBtn');
    if (langBtn) langBtn.textContent = lang === 'fr' ? '🌐 Français ▾' : '🌐 English ▾';

    updateRail();
}

// ===== Barre latérale dynamique (label + point actif selon le scroll) =====
const railSectionIds = ['home', 'about', 'portfolio', 'services', 'contact'];
const railLabelEl = document.getElementById('railLabel');
const railDots = document.querySelectorAll('#railDots .dot');

function updateRail() {
    const labels = railLabelsByLang[currentLang];
    let currentIndex = 0;

    railSectionIds.forEach((id, i) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 150) {
            currentIndex = i;
        }
    });

    if (railLabelEl) railLabelEl.textContent = labels[railSectionIds[currentIndex]];

    railDots.forEach((dot, i) => {
        dot.classList.toggle('big', i === currentIndex);
    });
}

window.addEventListener('scroll', updateRail);
window.addEventListener('load', () => {
    setLanguage(currentLang);
});