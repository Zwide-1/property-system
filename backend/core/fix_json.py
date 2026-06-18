from pathlib import Path

raw = Path("stands_data.json").read_bytes()

for enc in ["utf-8-sig", "utf-16", "utf-16-le", "utf-16-be", "latin-1"]:
    try:
        text = raw.decode(enc)
        print("Decoded with:", enc)
        break
    except:
        pass

Path("stands_data_clean.json").write_text(text, encoding="utf-8")

print("Clean file created successfully")