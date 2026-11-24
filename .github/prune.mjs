// 期限切れのパスワード（鍵スロット）を slots.json から取り除く。GitHub Actions で毎日実行。
import fs from "node:fs";
const p = "slots.json";
const S = JSON.parse(fs.readFileSync(p, "utf8"));
const today = new Date(Date.now() + 9 * 3600e3).toISOString().slice(0, 10); // 日本時間
const before = S.slots.length;
S.slots = S.slots.filter((s) => s.exp >= today);
if (S.slots.length !== before) {
  fs.writeFileSync(p, JSON.stringify(S, null, 1));
  console.log(`removed ${before - S.slots.length} expired slot(s)`);
} else console.log("nothing to remove");
