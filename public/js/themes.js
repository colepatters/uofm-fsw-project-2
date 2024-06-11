const htmlEl = document.querySelector('html')

const preferredMatchTheme = () => {
    if (!window.matchMedia) return 'light'
    
    if (window.matchMedia("(prefers-color-scheme: light)").matches) return 'light'
    else if (window.matchMedia("(prefers-color-scheme: dark)").matches) return 'dark'
    else return 'light'
}

function applyTheme(theme = null) {
    // GIVE ME TYPESCRIPT
    if (theme && (theme === 'light' || theme === 'dark' || theme ==='match')) {
        localStorage.setItem('theme', theme)
    }

    let storedTheme = localStorage.getItem('theme')

    if (!storedTheme) {
        storedTheme = 'match';
        localStorage.setItem('theme', 'match')
    }

    function applyDark() {
        htmlEl.setAttribute("data-bs-theme", "dark")
    }
    
    function applyLight() {
        htmlEl.setAttribute("data-bs-theme", "light")
    }

    switch (storedTheme) {
        case "light":
            applyLight()
            break;

        case "dark":
            applyDark()
            break;

        case "match":
            if (preferredMatchTheme() === 'light') applyLight()
            if (preferredMatchTheme() === 'dark') applyDark()
            break;
    }
}

document.querySelector('#theme-select-light').addEventListener('click', applyTheme('light'))
document.querySelector('#theme-select-dark').addEventListener('click', applyTheme('dark'))
document.querySelector('#theme-select-match').addEventListener('click', applyTheme('match'))



applyTheme()