import re

with open(r'c:\Carrera de Mente\index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update .board-grid CSS in style: gap 0.25rem on mobile, gap 0.6rem on desktop
old_bg = """.board-grid {
        display: grid;
        grid-template-columns: repeat(8, minmax(0, 1fr));
        grid-template-rows: repeat(8, minmax(0, 1fr));
        gap: 0.6rem;
      }"""

new_bg = """.board-grid {
        display: grid;
        grid-template-columns: repeat(8, minmax(0, 1fr));
        grid-template-rows: repeat(8, minmax(0, 1fr));
        gap: 0.25rem;
      }
      @media (min-width: 768px) {
        .board-grid {
          gap: 0.6rem;
        }
      }"""

if old_bg in content:
    content = content.replace(old_bg, new_bg, 1)
    print("Updated .board-grid gap")
else:
    old_bg_crlf = old_bg.replace('\n', '\r\n')
    new_bg_crlf = new_bg.replace('\n', '\r\n')
    if old_bg_crlf in content:
        content = content.replace(old_bg_crlf, new_bg_crlf, 1)
        print("Updated .board-grid gap (CRLF)")
    else:
        print(".board-grid not matched")

# 2. In each tile:
# Replace tile padding: "rounded-2xl p-2" -> "rounded-xl sm:rounded-2xl p-1 sm:p-1.5 md:p-2"
content = content.replace('rounded-2xl p-2', 'rounded-xl sm:rounded-2xl p-1 sm:p-1.5 md:p-2')

# Replace icon badge size: "w-8 h-8 sm:w-9 sm:h-9 rounded-xl" -> "w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-lg md:rounded-xl"
content = content.replace('w-8 h-8 sm:w-9 sm:h-9 rounded-xl', 'w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-lg md:rounded-xl')

# Replace SVG size: "w-5 h-5 text-white" -> "w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white"
content = content.replace('w-5 h-5 text-white', 'w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white')
content = content.replace('w-5 h-5 text-amber-200', 'w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-amber-200')

# Hide text labels on mobile: "text-[10px] sm:text-[11px] font-extrabold text-" -> "hidden md:block text-[10px] sm:text-[11px] font-extrabold text-"
content = content.replace('<span class="text-[10px] sm:text-[11px] font-extrabold text-', '<span class="hidden md:block text-[10px] sm:text-[11px] font-extrabold text-')

# 3. Compact center elements on mobile so they don't crowd the casillas
content = content.replace('p-6 text-center relative shadow-inner overflow-hidden', 'p-2 sm:p-4 md:p-6 text-center relative shadow-inner overflow-hidden')
content = content.replace('mb-6 transition-all', 'mb-2 sm:mb-4 md:mb-6 transition-all')
content = content.replace('w-28 h-28 bg-gradient-to-b from-white to-slate-100 rounded-3xl border-4', 'w-14 h-14 sm:w-16 sm:h-16 md:w-24 md:h-24 lg:w-28 lg:h-28 bg-gradient-to-b from-white to-slate-100 rounded-2xl md:rounded-3xl border-2 md:border-4')
content = content.replace('w-24 h-6 bg-slate-400/25', 'w-14 sm:w-16 md:w-24 h-3 sm:h-4 md:h-6 bg-slate-400/25')
content = content.replace('px-10 py-3.5 rounded-2xl shadow-3d-btn active:shadow-3d-btn-active active:translate-y-1 transition-all duration-100 flex items-center gap-3 tracking-wide', 'px-4 py-2 sm:px-6 sm:py-2.5 md:px-10 md:py-3.5 rounded-xl md:rounded-2xl shadow-3d-btn active:shadow-3d-btn-active active:translate-y-1 transition-all duration-100 flex items-center gap-2 md:gap-3 tracking-wide')
content = content.replace('text-lg md:text-xl px-10', 'text-xs sm:text-base md:text-xl px-10')
content = content.replace('mt-4 flex flex-col items-center', 'mt-1.5 sm:mt-2.5 md:mt-4 flex flex-col items-center')
content = content.replace('mt-6 flex items-center gap-3 text-[11px]', 'hidden sm:flex mt-3 md:mt-6 items-center gap-2 md:gap-3 text-[10px] md:text-[11px]')

with open(r'c:\Carrera de Mente\preview_mobile_fix.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("preview_mobile_fix.html generated successfully!")
