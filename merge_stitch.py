import re

with open(r'c:\Users\gpy20\Downloads\stitch_redise_o_de_interfaz (2)\code.html', 'r', encoding='utf-8') as f:
    stitch = f.read()

with open(r'c:\Carrera de Mente\index.html', 'r', encoding='utf-8') as f:
    current = f.read()

# 1. Extract CSS from Stitch
css_match = re.search(r'(<style data-purpose="custom-decorations">.*?</style>)', stitch, re.DOTALL)
stitch_css = css_match.group(1) if css_match else ""

# Ensure .screen-hidden and responsive adjustments are present in stitch_css
custom_css = stitch_css.replace('</style>', """
    /* Visibility utility */
    .screen-hidden {
      display: none !important;
    }

    #confetti-canvas {
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 9999;
    }
    ::-webkit-scrollbar { display: none; }
  </style>""")

# 2. Extract SVG defs from Stitch
svg_defs_match = re.search(r'(<!-- SVG Filter Definitions.*?<!-- BEGIN: TopHeader -->)', stitch, re.DOTALL)
svg_defs = svg_defs_match.group(1).replace('<!-- BEGIN: TopHeader -->', '').strip() if svg_defs_match else ""

# 3. Extract Sidebar subject legend from Stitch
legend_match = re.search(r'(<!-- Subject Color Reference Legend.*?<!-- END: LeftSidebar -->)', stitch, re.DOTALL)
stitch_legend = legend_match.group(1).replace('<!-- END: LeftSidebar -->', '').strip() if legend_match else ""

# 4. Extract Board Canvas & 28 Tiles from Stitch
board_match = re.search(r'(<!-- BEGIN: MainGameBoardArea.*?<!-- END: MainGameBoardArea -->)', stitch, re.DOTALL)
stitch_board = board_match.group(1) if board_match else ""

# Inject pawns-tile-X slots and remove hardcoded tokens
for i in range(1, 29):
    # If hardcoded token exists in tile 20 or 24, remove it
    # And add <div class="tile-pawns-container absolute -bottom-1 -right-1 flex gap-0.5 z-10" id="pawns-tile-i"></div>
    # Find closing tag of tile-i: each tile ends with </div>\n</div> or similar
    pawn_slot = f'<div class="tile-pawns-container absolute -bottom-1 -right-1 flex gap-0.5 z-10" id="pawns-tile-{i}"></div>'
    
    # We find `<div class="[^"]*" id="tile-{i}">` and inject pawn_slot right before the tile's final closing `</div>`
    tile_pattern = rf'(id=["\']tile-{i}["\'].*?)(</div>\s*</div>)'
    
    def repl(m):
        inner = m.group(1)
        # Remove hardcoded token if present
        inner = re.sub(r'<!-- Token:.*?</div>\s*</div>', '', inner, flags=re.DOTALL)
        return inner + '\n' + pawn_slot + '\n</div>\n</div>'
    
    # Actually, let's do a more robust regex per tile
    # Let's clean static tokens first:
stitch_board = re.sub(r'<!-- Token: Cami -->.*?🐬\s*</div>', '', stitch_board, flags=re.DOTALL)
stitch_board = re.sub(r'<!-- Token: Ger -->.*?🐻\s*</div>', '', stitch_board, flags=re.DOTALL)

# Now inject pawns slot before the closing </div> of each tile-i
# In Stitch, each tile is:
# <div ... id="tile-X">
#   <div ... leading-none"><span>X</span></div>
#   <div class="flex flex-col items-center justify-center my-auto">
#     ...
#   </div>
# </div>
# So the closing of tile-X is the final </div> of that block.
for i in range(1, 29):
    pattern = rf'(<div [^>]*id=["\']tile-{i}["\'].*?)(</div>\s*(?:<!-- Tile|\n<!-- =|\n<!-- END|\n<div class="col-span-8))'
    m = re.search(pattern, stitch_board, re.DOTALL)
    if m:
        tile_body = m.group(1)
        next_part = m.group(2)
        pawn_slot = f'<div class="tile-pawns-container absolute -bottom-1 -right-1 flex gap-0.5 z-10" id="pawns-tile-{i}"></div>'
        if f'id="pawns-tile-{i}"' not in tile_body:
            new_tile_body = tile_body.rstrip() + f'\n{pawn_slot}\n'
            stitch_board = stitch_board.replace(tile_body + next_part, new_tile_body + next_part)

print("Injected pawn slots into all 28 tiles")

# Check center arena in stitch_board
# Ensure center arena has correct IDs and is compact:
# diceCubeFace, rollDiceBtn, actionHelperText, lastRollLog, lastRollStatus, etc. are already in Stitch!

# 5. Extract setup screen, modals, and questions script from current index.html
setup_match = re.search(r'(<!-- ========================================================================= -->\s*<!-- PANTALLA 1: SETUP / LOBBY.*?<!-- ========================================================================= -->)', current, re.DOTALL)
current_setup = setup_match.group(1) if setup_match else ""

modals_match = re.search(r'(<!-- ========================================================================= -->\s*<!-- MODAL DE PREGUNTAS.*?<script src="questions\.js"></script>)', current, re.DOTALL)
current_modals = modals_match.group(1) if modals_match else ""

# Build the complete index.html
full_html = f"""<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8"/>
    <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
    <title>Carrera del Saber - 6.° Grado</title>
    <!-- Google Fonts: Nunito -->
    <link href="https://fonts.googleapis.com" rel="preconnect"/>
    <link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&amp;display=swap" rel="stylesheet"/>
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
    <script>
    tailwind.config = {{
      theme: {{
        extend: {{
          fontFamily: {{
            sans: ['Nunito', 'sans-serif'],
          }},
          colors: {{
            math: {{
              light: '#EBF4FF',
              border: '#BFDBFE',
              accent: '#3B82F6',
              text: '#1D4ED8'
            }},
            lengua: {{
              light: '#FEE2E2',
              border: '#FECACA',
              accent: '#EF4444',
              text: '#B91C1C'
            }},
            sociales: {{
              light: '#FFEDD5',
              border: '#FED7AA',
              accent: '#F97316',
              text: '#C2410C'
            }},
            naturales: {{
              light: '#DCFCE7',
              border: '#BBF7D0',
              accent: '#22C55E',
              text: '#15803D'
            }},
            ingenio: {{
              light: '#F3E8FF',
              border: '#E9D5FF',
              accent: '#A855F7',
              text: '#7E22CE'
            }},
            boardBg: '#F8FAFD'
          }},
          boxShadow: {{
            'game-card': '0 8px 24px -4px rgba(50, 80, 150, 0.08), 0 4px 8px -4px rgba(50, 80, 150, 0.04)',
            'token': '0 8px 16px -2px rgba(0, 0, 0, 0.3)',
            '3d-btn': '0 5px 0px #1E40AF, 0 8px 14px rgba(30, 64, 175, 0.35)',
            '3d-btn-active': '0 2px 0px #1E40AF, 0 4px 6px rgba(30, 64, 175, 0.35)',
            'glow-star': '0 0 16px rgba(245, 158, 11, 0.65)'
          }}
        }}
      }}
    }}
    </script>
    {custom_css}
</head>
<body class="bg-gradient-to-br from-amber-50/60 via-sky-50 to-indigo-100/50 min-h-screen lg:h-screen lg:max-h-screen lg:overflow-hidden font-sans text-slate-800 flex flex-col p-2 md:p-3 select-none antialiased justify-between overflow-x-hidden">

{svg_defs}

    <!-- BEGIN: TopHeader -->
    <header class="w-full mx-auto mb-2 bg-white/95 backdrop-blur-md rounded-2xl px-4 py-2 shadow-xs border border-slate-200/80 flex items-center justify-between shrink-0" data-purpose="top-navigation">
        <div class="flex items-center space-x-3">
            <a href="#" id="header-brand-link" class="flex items-center space-x-2.5 cursor-pointer group">
                <div class="w-9 h-9 bg-gradient-to-tr from-amber-400 to-yellow-300 rounded-xl flex items-center justify-center shadow-sm text-xl group-hover:scale-105 transition-transform">
                    🎓
                </div>
                <div>
                    <h1 class="text-base md:text-lg font-black text-slate-800 tracking-tight flex items-center gap-2 leading-tight">
                        Carrera del Saber
                        <span id="header-grade-pill" class="text-[11px] bg-indigo-100 text-indigo-700 font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">6.° Grado</span>
                    </h1>
                    <p class="text-[11px] text-slate-500 font-semibold leading-tight">Desafío interactivo de preguntas y respuestas</p>
                </div>
            </a>
        </div>
        <!-- Match Stats -->
        <div class="flex items-center gap-3 md:gap-4">
            <div class="hidden md:flex items-center bg-slate-100 px-3 py-1 rounded-xl border border-slate-200/80 gap-2">
                <span class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Ronda</span>
                <span id="round-indicator" class="text-xs font-extrabold text-indigo-600 bg-white px-2 py-0.5 rounded-md shadow-xs">1 / 10</span>
            </div>
            <div class="hidden sm:flex items-center gap-2 bg-emerald-50 text-emerald-700 font-bold text-xs px-2.5 py-1 rounded-xl border border-emerald-200">
                <span class="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                Partida en Vivo
            </div>
            <!-- Action buttons -->
            <div class="flex items-center gap-1.5">
                <button id="soundToggleBtn" aria-label="Sonido activado" class="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors text-sm font-bold cursor-pointer" title="Alternar Sonido">
                    🔊
                </button>
                <button id="rulesToggleBtn" aria-label="Reglas del juego" class="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-extrabold text-sm flex items-center justify-center transition-colors cursor-pointer" title="Reglas y ayuda">
                    ❓
                </button>
                <button id="btn-restart-setup" aria-label="Cambiar configuración" class="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold flex items-center justify-center transition-colors text-sm cursor-pointer" title="Cambiar grado o participantes">
                    🔄
                </button>
            </div>
        </div>
    </header>
    <!-- END: TopHeader -->

    {current_setup}

    <!-- ========================================================================= -->
    <!-- PANTALLA 2: ARENA DE JUEGO (FORMATO STITCH 10x6 PANORÁMICO) -->
    <!-- ========================================================================= -->
    <main id="game-screen" style="display: none;" class="screen-hidden w-full mx-auto flex-1 grid grid-cols-1 lg:grid-cols-12 gap-3 items-stretch min-h-0 overflow-hidden" data-purpose="game-main-content">
        
        <!-- MOBILE TOP PLAYERS STRIP (< lg) -->
        <section class="lg:hidden w-full max-w-md mx-auto grid gap-2 shrink-0" id="mobile-players-hud">
            <!-- Dynamic Mobile Player Cards rendered by game.js -->
        </section>

        <!-- BEGIN: LeftSidebar (Rankings & Legend) -->
        <aside class="hidden lg:flex lg:col-span-3 flex-col gap-2.5 justify-between min-h-0 overflow-y-auto pr-0.5" data-purpose="leaderboard-sidebar">
            <!-- Player Scores & Badges Card -->
            <section class="bg-white rounded-2xl p-3.5 shadow-game-card border border-slate-200/80 flex flex-col justify-between" data-purpose="player-rankings">
                <div class="flex items-center justify-between border-b border-slate-100 pb-2 mb-2.5">
                    <div class="flex items-center gap-1.5">
                        <span class="text-lg">🏆</span>
                        <h2 class="text-sm font-extrabold text-slate-800 tracking-tight">Posiciones y Medallas</h2>
                    </div>
                    <span id="sidebar-players-count" class="text-[10px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">2 Jugadores</span>
                </div>
                <div class="space-y-2.5 overflow-y-auto max-h-[300px]" id="scoreboard-list">
                    <!-- Dynamic player cards rendered by game.js -->
                </div>
            </section>

            {stitch_legend}
        </aside>
        <!-- END: LeftSidebar -->

        {stitch_board}
    </main>
    <!-- END: GameAreaContainer -->

    <!-- BEGIN: BottomStatusBar -->
    <footer class="w-full mx-auto mt-1 px-3 py-1 flex items-center justify-between text-[11px] text-slate-400 font-semibold shrink-0" data-purpose="footer-status-bar">
        <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Servidor sincronizado: <strong>carreradelsaber.netlify.app</strong></span>
        </div>
        <div class="flex items-center gap-4">
            <span id="footer-fullscreen" class="hover:text-slate-600 transition-colors cursor-pointer">Pantalla Completa ⛶</span>
            <span id="footer-restart" class="hover:text-slate-600 transition-colors cursor-pointer">Reiniciar Partida 🔄</span>
            <span class="bg-slate-900 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded flex items-center gap-1">
                Powered by Netlify
            </span>
        </div>
    </footer>
    <!-- END: BottomStatusBar -->

    {current_modals}
    <script src="game.js"></script>
</body>
</html>
"""

with open(r'c:\Carrera de Mente\index.html', 'w', encoding='utf-8') as f:
    f.write(full_html)

print("Successfully merged Stitch design into index.html!")
