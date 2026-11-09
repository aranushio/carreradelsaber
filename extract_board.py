import re

with open(r'c:\Users\gpy20\Downloads\stitch_redise_o_de_interfaz (2)\code.html', 'r', encoding='utf-8') as f:
    stitch = f.read()

# Extract board-grid-10x6
board_match = re.search(r'(<div class="board-grid-10x6 select-none">.*?<!-- END: BOARD CENTER -->\s*</div>)', stitch, re.DOTALL)
if board_match:
    board_html = board_match.group(1)
    print("Found board-grid-10x6, length:", len(board_html))
    
    # Check that it has all 28 tiles
    for i in range(1, 29):
        if f'id="tile-{i}"' not in board_html:
            print(f"MISSING tile-{i}!")
        if f'id="pawns-tile-{i}"' not in board_html:
            # Let's add pawns-tile slot to tile-i if missing!
            print(f"pawns-tile-{i} not present, will need to inject")
else:
    print("board_match NOT found")
