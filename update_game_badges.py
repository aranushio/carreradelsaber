with open(r'c:\Carrera de Mente\game.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Update SUBJECT_THEME
old_theme = """const SUBJECT_THEME = {
    matematica: {
        headerBg: '#2563eb',
        name: 'Matemática',
        short: 'Mat',
        icon: '📐',
        activeRing: 'bg-blue-100 ring-2 ring-blue-400 text-blue-600'
    },
    lengua: {
        headerBg: '#dc2626',
        name: 'Lengua',
        short: 'Len',
        icon: '📖',
        activeRing: 'bg-red-100 ring-2 ring-red-400 text-red-600'
    },
    naturales: {
        headerBg: '#16a34a',
        name: 'Ciencias Naturales',
        short: 'Nat',
        icon: '🌿',
        activeRing: 'bg-green-100 ring-2 ring-emerald-500 text-emerald-700'
    },
    sociales: {
        headerBg: '#ea580c',
        name: 'Ciencias Sociales',
        short: 'Soc',
        icon: '🌍',
        activeRing: 'bg-orange-100 ring-2 ring-orange-400 text-orange-600'
    },
    ingenio: {
        headerBg: '#9333ea',
        name: 'Ingenio y Cultura',
        short: 'Ing',
        icon: '💡',
        activeRing: 'bg-purple-100 ring-2 ring-purple-400 text-purple-600'
    }
};"""

new_theme = """const SUBJECT_THEME = {
    matematica: {
        headerBg: '#2563eb',
        name: 'Matemática',
        short: 'Mat',
        icon: `<svg class="w-5 h-5 drop-shadow-xs" fill="none" viewBox="0 0 32 32"><path d="M4 27 L28 27 L4 3 Z" fill="url(#metal-bezel)" stroke="#1d4ed8" stroke-width="1.2"></path><path d="M8 24 L21 24 L8 11 Z" fill="#ffffff" fill-opacity="0.75" stroke="#3b82f6" stroke-width="0.8"></path></svg>`,
        activeRing: 'bg-gradient-to-b from-blue-50 to-blue-100/70 border border-blue-200 text-blue-700 shadow-2xs'
    },
    lengua: {
        headerBg: '#dc2626',
        name: 'Lengua',
        short: 'Len',
        icon: `<svg class="w-5 h-5 drop-shadow-xs" fill="none" viewBox="0 0 32 32"><path d="M3 24 C8 21 13 23 16 26 C19 23 24 21 29 24 L29 8 C24 5 19 7 16 10 C13 7 8 5 3 8 Z" fill="url(#book-leather)" stroke="#7f1d1d" stroke-width="1"></path></svg>`,
        activeRing: 'bg-gradient-to-b from-red-50 to-red-100 ring-1.5 ring-red-400 text-red-600 font-black shadow-2xs'
    },
    naturales: {
        headerBg: '#16a34a',
        name: 'Ciencias Naturales',
        short: 'Nat',
        icon: `<svg class="w-5 h-5 drop-shadow-xs" fill="none" viewBox="0 0 32 32"><path d="M16 28 C16 19 16 11 16 6 C16 6 22 7 24 13 C25.5 17.5 22 22 16 23" fill="url(#plant-leaf-3d)" stroke="#14532d" stroke-width="0.8"></path></svg>`,
        activeRing: 'bg-gradient-to-b from-emerald-50 to-emerald-100 ring-1.5 ring-emerald-500 text-emerald-700 font-black shadow-2xs'
    },
    sociales: {
        headerBg: '#ea580c',
        name: 'Ciencias Sociales',
        short: 'Soc',
        icon: `<svg class="w-5 h-5 drop-shadow-xs" fill="none" viewBox="0 0 32 32"><circle cx="16" cy="14" fill="url(#globe-sphere-3d)" r="10" stroke="#9a3412" stroke-width="1"></circle></svg>`,
        activeRing: 'bg-gradient-to-b from-orange-50 to-orange-100 ring-1.5 ring-orange-400 text-orange-600 font-black shadow-2xs'
    },
    ingenio: {
        headerBg: '#9333ea',
        name: 'Ingenio y Cultura',
        short: 'Ing',
        icon: `<svg class="w-5 h-5 drop-shadow-xs" fill="none" viewBox="0 0 32 32"><path d="M11 14 C11 8 21 8 21 14 C21 17.5 18 19 18 22 L14 22 C14 19 11 17.5 11 14 Z" fill="url(#bulb-glow)" stroke="#a855f7" stroke-width="1.3"></path></svg>`,
        activeRing: 'bg-gradient-to-b from-purple-50 to-purple-100 ring-1.5 ring-purple-400 text-purple-700 font-black shadow-2xs'
    }
};"""

if old_theme in js:
    js = js.replace(old_theme, new_theme, 1)
    print("Updated SUBJECT_THEME with Stitch SVGs")
else:
    # Try CRLF
    old_crlf = old_theme.replace('\n', '\r\n')
    new_crlf = new_theme.replace('\n', '\r\n')
    if old_crlf in js:
        js = js.replace(old_crlf, new_crlf, 1)
        print("Updated SUBJECT_THEME with Stitch SVGs (CRLF)")
    else:
        print("old_theme not matched in game.js")

# In renderScoreboard desktop badges:
# Replace <span class="text-xs drop-shadow-xs">${meta.icon}</span> with ${meta.icon}
js = js.replace('<span class="text-xs drop-shadow-xs">${meta.icon}</span>', '${meta.icon}')
js = js.replace('<span class="text-xs">${meta.icon}</span>', '${meta.icon}')

with open(r'c:\Carrera de Mente\game.js', 'w', encoding='utf-8') as f:
    f.write(js)

print("game.js updated successfully")
