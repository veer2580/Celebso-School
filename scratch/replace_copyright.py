import os
import glob

search_target = "© 2026 Celebso Startup School. All rights reserved."
replacement = '© 2026 <a href="https://antellay.in/" target="_blank" rel="noopener noreferrer" class="antellay-link" style="color: #3B82F6; font-weight: 700; text-decoration: none;">ANTELLAY Labs</a>. All Rights Reserved. A Celebso Group Company.'

html_files = glob.glob("**/*.html", recursive=True)

count = 0
for filepath in html_files:
    if "scratch" in filepath or ".git" in filepath:
        continue
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    
    if search_target in content:
        new_content = content.replace(search_target, replacement)
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(new_content)
        count += 1
        print(f"Replaced in: {filepath}")

print(f"\nTotal files updated: {count}")
