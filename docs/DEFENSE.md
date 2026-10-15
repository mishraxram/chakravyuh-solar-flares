# DEFENSE — apna project samjho (simple Hinglish)

Is file ko judging se pehle 2 baar padho. Jawab ratne nahi hain, matlab samajhna hai.

---

## 1. Project kaise bana hai (5 points mein)
1. **Ek hi webpage poora tool hai** (`src/pages/index.astro`). Ye browser mein chalta hai.
2. **Browser khud kaam karta hai:** log padhta hai, 13 rules chalata hai, aur SHA-256 seal banata hai. Asli file computer se bahar nahi jaati.
3. **AI ke liye** browser sirf events ki lines hamare server (`/api/analyze`, Cloudflare pe) ko bhejta hai.
4. **Server** secret Gemini key lagata hai, Gemini se poochta hai, jawab check karta hai, aur wapas bhejta hai. Gemini fail ho to browser rules se khud summary bana deta hai.
5. **Evidence ka record aur audit trail** browser ke localStorage mein save hote hain. Report (HTML/PDF) bhi browser hi banata hai.

---

## 2. Kaunsi file kya karti hai
| File | Kaam |
|---|---|
| `src/lib/parse.ts` | Log ki har line ko event banata hai (time, user, role, IP, action, target, detail). 3 format padhta hai: ERP CSV, Linux auth.log, Apache/Nginx log. Time ke hisaab se sort karta hai. Jo line samajh na aaye, use "not understood" mein rakhta hai, phenkta nahi. |
| `src/lib/rules.ts` | 13 rules jo laal/amber flag lagate hain, reason ke saath (galat password ki burst, naya IP, marks jump, log delete, SQL injection...). |
| `src/lib/changes.ts` | "Changes made" list: har update/delete ka kaun, kab, IP, pehle → baad, aur status (Unauthorized / Suspicious / Blocked / Normal). |
| `src/lib/evidence.ts` | SHA-256 banata hai, evidence lock karta hai, sealed copy rakhta hai, verify karta hai, badli lines dhoondhta hai, aur hash-chained audit trail rakhta hai. |
| `src/lib/prompts.ts` | Gemini ko jaane wala prompt: kya likhna hai aur JSON ka exact format. |
| `functions/api/analyze.ts` | Server: input check, Gemini call (8 second limit, 3 backup models), galat event number wale AI points hatana, Hindi na aaye to dobara try. |
| `src/lib/report.ts` | Download/PDF wali report banata hai. Har text ko safe (escape) karta hai. |
| `src/pages/index.astro` | Page aur uske saare buttons ka code. |
| `tests/eval.ts` | 16 test cases ko asli code aur live AI pe chala ke score batata hai. |
| `public/samples/*` | 3 made-up sample logs, "Try sample" buttons ke liye. |

---

## 3. Demo ke time andar kya hota hai
1. **"ERP marks tampering" dabaya** → page sample file laata hai → `evidence.ts` uska SHA-256 banata hai aur sealed copy rakhta hai → audit trail mein entry 1.
2. **Timeline bani** → `parse.ts` 19 events banata hai → `rules.ts` flag lagata hai → `changes.ts` "Changes made" list banata hai → page laal/amber rows dikhata hai.
3. **"Analyze with AI" dabaya** → browser 200 tak events (flagged wale pehle) server ko bhejta hai.
4. **Server** prompt banata hai, Gemini se poochta hai, galat citation hatata hai, aur verdict, summary, points, "beyond the rules" aur next steps wapas bhejta hai. Fail ho to rules wala offline summary.
5. **92 ko 93 kiya, "Verify" dabaya** → naya hash bana → purane se alag → TAMPERED → sealed copy se compare karke badli line dikhayi.
6. **"Restore original"** → sealed copy wapas box mein → hash phir same → MATCH.
7. **"Tamper test"** → audit ki entry 1 chupke se badli → chain check fail → "CHAIN BROKEN at entry 1".
8. **"Save report as PDF"** → `report.ts` report banata hai → print window → Save as PDF.

---

## 4. Judges ke sabse tough sawaal (aur simple jawab)

**1. Rules pehle aur AI baad mein kyun?**
Rules tez hain, free hain, aur har flag ka reason batate hain. AI slow hai aur galat bhi ho sakta hai. Isliye rules sabut dhoondhte hain, AI unhe jod ke kahani batata hai.

**2. Galat password wala (burst) rule kaise kaam karta hai?**
Ek hi IP se 2 minute mein 5 ya zyada galat password aaye, to sab pe flag lagta hai. Uske 15 minute ke andar usi IP se sahi login ho, to us login pe "password guess ho gaya" wala flag lagta hai.

**3. AI apni taraf se event na bana de, ye kaise rokte ho?**
Prompt mein likha hai ki har point ke saath event number do. Phir server check karta hai: jo point aisa event number bataye jo log mein hai hi nahi, use hata deta hai.

**4. Hash chain kya hai?**
Audit trail ki har entry mein pichli entry ka hash hota hai, jaise zanjeer ki kadiyan. Beech ki ek entry badlo to aage ki saari kadiyan toot jaati hain, aur app batata hai kahan se toota.

**5. SHA-256 browser mein kyun, server pe kyun nahi?**
Taaki asli file computer se bahar na jaye. Browser ka Web Crypto standard hai, aur hamara hash `sha256sum` command ke hash se exact match karta hai, to koi bhi khud check kar sakta hai.

**6. Sirf 200 events AI ko kyun?**
Prompt chhota rahe, jawab jaldi aaye aur kharcha kam ho. Flagged events pehle bhejte hain, to zaroori wale kabhi nahi chhoot-te.

**7. Gemini ke itne models kyun?**
Build ke time kuch models busy the ya 5-9 second le rahe the. Isliye fast "flash-lite" models ek ke baad ek try karte hain, sab 8 second ke andar.

**8. API key kahan hai?**
Sirf Cloudflare ke secret mein aur local `.dev.vars` file mein, jo GitHub pe nahi jaati. Browser ko key kabhi nahi dikhti.

**9. Koi kharab (malicious) log daale to report safe hai?**
Haan. Report mein har text escape hota hai, aur page `textContent` use karta hai, `innerHTML` nahi. Isliye log mein chhupa code chal nahi sakta.

**10. Verdict aur confidence mein farak?**
Verdict = kya hua (incident / suspicious / normal / unsure). Confidence = AI ko apne verdict pe kitna yakeen hai. Testing mein dikha ki normal log pe "high" confusing lag raha tha, isliye dono alag kiye.

**11. "Unauthorized" kaise decide karte ho?**
Badlav pe high-risk flag ho, ya jis login se woh badlav hua (same user + same IP) uspe high-risk flag ho. Jaise login 5 galat password ke baad hua. Sirf medium flag ho to "Suspicious". Log mein "DENIED" likha ho to "Blocked attempt".

**12. Kya bata sakte ho kis insaan ne kiya?**
Hum account aur IP batate hain. Insaan ka naam nahi bolte, kyunki account chori ho sakta hai. Reasons batate hain ki account hijack kyun lag raha hai. Asli insaan tak pahunchne ke liye IT team us IP ko network logs se match karegi.

**13. Restore kaise hota hai?**
Lock karte waqt hum ek sealed copy browser mein rakhte hain. Baad mein hash alag aaye to line-by-line compare karke badli lines dikhate hain, aur ek click mein original wapas daal dete hain. Limit: ye usi browser mein chalta hai jahan lock kiya tha. Database ke asli data ke liye system ka backup chahiye.

---

## 5. Kamzoriyan (honest jawab)
Judge kamzori pooche to chhupao mat. Seedha bolo "ye limitation hai, aage hum ye karenge":

1. **Sirf 3 log format chalte hain.** "Aage Windows event logs aur firewall logs jodenge. Naya format jodna ek function ka kaam hai."
2. **Audit trail ek hi browser mein hai.** "Edit pakda jata hai, par koi poori history hi mita de to nahi. Aage har entry ka hash server pe bhi rakhenge."
3. **Rules ke numbers fixed hain** (2 minute mein 5 galat password, 6 se 23 baje working hours). "Ye hamari college story ke liye set hain. Aage har organisation apne hisaab se set kar payega."
4. **Test set chhota hai aur humne khud banaya.** "16 cases dikhate hain ki demo stable hai, ye real-world accuracy nahi hai. Aage public log datasets pe test karenge."
5. **AI ka jawab har baar thoda alag hota hai.** "Isliye har point event number se juda hai, label laga hai, temperature kam (0.2) rakha hai aur JSON check hota hai."

---

## 6. AI tools ka sach (koi pooche to seedha bolo)
"Code, rules aur test cases Claude Code ne hamare direction mein likhe. Problem, story, scope aur demo humne chuna, aur results humne check kiye. App ke andar analysis Google Gemini karta hai."

---

## 7. `node tests/eval.ts` kya hai?
Ye hamara **automatic test** hai. Isse chalane pe 16 sample logs ek-ek karke hamare asli code aur live AI pe chalte hain, aur har ek ka result PASS ya FAIL aata hai. Aakhir mein score dikhta hai, jaise `RESULT 16/16`.

**Kaise chalayein:** project folder mein terminal kholo aur likho:
```
node tests/eval.ts
```
1-2 minute lagte hain, kyunki AI wale cases live Gemini se poochte hain.

**Judge ko kya bolna:** "Humne apna tool khud test kiya. Ye command 16 cases chalata hai, aur har case pe pehle se likha hai ki sahi jawab kya hona chahiye. Score `docs/TESTSET.md` mein likha hai, fails ke saath."
