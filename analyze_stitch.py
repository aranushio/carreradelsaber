import re

with open(r'c:\Users\gpy20\Downloads\stitch_redise_o_de_interfaz (2)\code.html', 'r', encoding='utf-8') as f:
    stitch = f.read()

# Find all tile-X
tiles = re.findall(r'id=["\']tile-(\d+)["\']', stitch)
print("Found tiles in Stitch:", len(tiles), tiles)

# Check classes on board grid
board_grid = re.findall(r'<div class="[^"]*board-grid[^"]*"', stitch)
print("Board grid element:", board_grid)

# Check sidebar
sidebar = re.findall(r'<aside[^>]*>', stitch)
print("Sidebar:", sidebar)
