import asyncio
import json
import os
import sys
import edge_tts

VOICE = "th-TH-PremwadeeNeural"
ALT_VOICE = "th-TH-NiwatNeural"
RATE = "-10%"
OUTPUT_DIR = "/Users/samir/Teach Thai/thai-sprint/public/audio"
TARGETS_FILE = "/Users/samir/Teach Thai/thai-sprint/scripts/audio_targets.json"
MANIFEST_FILE = "/Users/samir/Teach Thai/thai-sprint/src/data/audioManifest.ts"

os.makedirs(OUTPUT_DIR, exist_ok=True)

with open(TARGETS_FILE, "r", encoding="utf-8") as f:
    targets = json.load(f)

print(f"Loaded {len(targets)} targets from {TARGETS_FILE}")

sem = asyncio.Semaphore(6)

async def generate_item(target, idx, total):
    item_id = target["id"]
    text = target["text"]
    file_path = os.path.join(OUTPUT_DIR, f"{item_id}.mp3")

    # If already generated and valid, skip
    if os.path.exists(file_path) and os.path.getsize(file_path) > 500:
        return "skipped"

    async with sem:
        # Try with rate
        try:
            comm = edge_tts.Communicate(text, VOICE, rate=RATE)
            await comm.save(file_path)
            if os.path.exists(file_path) and os.path.getsize(file_path) > 500:
                print(f"[{idx}/{total}] OK: {item_id} -> {text}")
                await asyncio.sleep(0.08)
                return "ok"
        except Exception:
            pass

        # Try without rate
        try:
            comm = edge_tts.Communicate(text, VOICE)
            await comm.save(file_path)
            if os.path.exists(file_path) and os.path.getsize(file_path) > 500:
                print(f"[{idx}/{total}] OK (default rate): {item_id} -> {text}")
                await asyncio.sleep(0.08)
                return "ok"
        except Exception:
            pass

        # Try male voice
        try:
            comm = edge_tts.Communicate(text, ALT_VOICE)
            await comm.save(file_path)
            if os.path.exists(file_path) and os.path.getsize(file_path) > 500:
                print(f"[{idx}/{total}] OK (male voice): {item_id} -> {text}")
                await asyncio.sleep(0.08)
                return "ok"
        except Exception as e:
            print(f"[{idx}/{total}] FAIL: {item_id} -> {text}: {e}")
            return "fail"

async def main():
    total = len(targets)
    tasks = []
    for idx, t in enumerate(targets, 1):
        tasks.append(generate_item(t, idx, total))

    results = await asyncio.gather(*tasks)
    
    ok_count = results.count("ok")
    skip_count = results.count("skipped")
    fail_count = results.count("fail")

    print(f"\n==========================================")
    print(f"Generation Complete!")
    print(f"Newly Generated: {ok_count}")
    print(f"Already Existed: {skip_count}")
    print(f"Failed: {fail_count}")
    print(f"Total Targets: {total}")
    print(f"==========================================")

    # Now generate the audioManifest.ts
    print("Generating audioManifest.ts...")
    by_id = {}
    by_text = {}

    for t in targets:
        item_id = t["id"]
        text = t["text"]
        mp3_name = f"{item_id}.mp3"
        full_path = os.path.join(OUTPUT_DIR, mp3_name)
        if os.path.exists(full_path) and os.path.getsize(full_path) > 500:
            rel_url = f"/audio/{mp3_name}"
            by_id[item_id] = rel_url
            if text not in by_text:
                by_text[text] = rel_url

    ts_content = f"""// AUTO-GENERATED FILE — DO NOT EDIT DIRECTLY
// Studio-Quality Neural Edge TTS Audio Manifest

export const AUDIO_BY_ID: Record<string, string> = {json.dumps(by_id, ensure_ascii=False, indent=2)};

export const AUDIO_BY_TEXT: Record<string, string> = {json.dumps(by_text, ensure_ascii=False, indent=2)};

/**
 * Resolves high quality studio audio URL for an ID or Thai text.
 */
export function resolveAudioUrl(phraseOrWordId?: string, thaiText?: string): string | null {{
  if (phraseOrWordId && AUDIO_BY_ID[phraseOrWordId]) {{
    return AUDIO_BY_ID[phraseOrWordId]!;
  }}
  if (thaiText) {{
    const clean = thaiText.trim();
    if (AUDIO_BY_TEXT[clean]) {{
      return AUDIO_BY_TEXT[clean]!;
    }}
  }}
  return null;
}}
"""
    with open(MANIFEST_FILE, "w", encoding="utf-8") as f:
        f.write(ts_content)

    print(f"Successfully generated {MANIFEST_FILE}")
    print(f"Indexed {len(by_id)} IDs and {len(by_text)} unique Thai phrases/words.")

if __name__ == "__main__":
    asyncio.run(main())
