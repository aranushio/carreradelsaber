with open(r'c:\Users\gpy20\Downloads\stitch_redise_o_de_interfaz (2)\code.html', 'r', encoding='utf-8') as f:
    stitch = f.read()

import re

# Tile 1
t1 = re.search(r'(<!-- Tile 1:.*?</div>\s*</div>)', stitch, re.DOTALL)
if t1:
    print("=== TILE 1 ===")
    print(t1.group(1)[:400])

# Tile 3
t3 = re.search(r'(<!-- Tile 3:.*?</div>\s*</div>)', stitch, re.DOTALL)
if t3:
    print("=== TILE 3 ===")
    print(t3.group(1)[:400])

# Center arena
center = re.search(r'(<!-- ================= BOARD CENTER.*?<!-- END: BOARD CENTER -->)', stitch, re.DOTALL)
if center:
    print("=== CENTER ARENA ===")
    print(center.group(1)[:500])
