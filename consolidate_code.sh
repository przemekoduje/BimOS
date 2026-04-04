#!/bin/zsh
FILES=(
  "package.json"
  "tsconfig.json"
  "src/main.tsx"
  "src/index.css"
  "src/App.tsx"
  "src/lib/supabase.ts"
  "src/services/aiService.ts"
  "src/utils/userUtils.ts"
  "src/components/SearchHero.tsx"
  "src/components/SearchHero.css"
  "src/components/AdminPanel.tsx"
  "src/components/AdminPanel.css"
  "src/components/UserPanel.tsx"
  "src/components/UserPanel.css"
  "src/components/AuthModal.tsx"
  "src/components/AuthModal.css"
  "src/components/DiscoverDashboard.tsx"
  "src/components/DiscoverDashboard.css"
  "src/components/NewsGrid.tsx"
  "src/components/NewsDetail.tsx"
)

OUTPUT="/Users/przemyslawrakotny/Documents/przemokoduje/BimOS/BimOS_full_code.txt"

echo "=== BimOS COMPLETE SOURCE CODE FOR REVIEW ===" > "$OUTPUT"
echo "Date: $(date)" >> "$OUTPUT"
echo "============================================" >> "$OUTPUT"
echo "" >> "$OUTPUT"

for FILE in "${FILES[@]}"; do
  if [ -f "$FILE" ]; then
    echo "FILE: $FILE" >> "$OUTPUT"
    echo "--------------------------------------------" >> "$OUTPUT"
    cat "$FILE" >> "$OUTPUT"
    echo "" >> "$OUTPUT"
    echo "--------------------------------------------" >> "$OUTPUT"
    echo "" >> "$OUTPUT"
  else
    echo "WARNING: File $FILE not found."
  fi
done

echo "Update complete: $OUTPUT"
