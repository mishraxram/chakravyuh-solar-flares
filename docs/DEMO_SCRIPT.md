# DEMO SCRIPT (3 minute) — simple Hinglish

**App ka link:** https://loglens-solarflares.pages.dev
**Slides ka link:** https://claude.ai/artifact/C3p7eQ1CCxardURKkz7Mu3

Judges English pasand karein to English lines `docs/PITCH.md` mein hain. Neeche **"Bolo"** wali lines ko apne shabdon mein bolo, ratna nahi hai.

---

## Shuru karne se 5 minute pehle
1. App ka link kholo.
2. Left side neeche **"New case"** dabao, taaki sab saaf ho jaye.
3. Ek baar **"ERP marks tampering"** dabao, phir **"Analyze with AI"** dabao. Isse AI "jaag" jata hai aur demo mein slow nahi hoga.
4. Phir se **"New case"** dabao.
5. Browser zoom 110-125% rakho, taaki judges padh sakein.

---

## Step 1: Problem batao (0:00 - 0:30)
**Screen:** Slide 1, 2, 3 aur 4 (cover, problem, "Today vs with LogLens", 3 steps).

**Bolo:**
"Result week hai. Ek subah student ke DBMS marks 42 se 92 ho gaye. Professor bolte hain: maine raat ko login hi nahi kiya. IT team ke paas hazaron log lines hain. Sawaal ye hai: kisne kiya, aur kya hum in logs pe bharosa kar sakte hain?"

"Isliye humne LogLens banaya. Rules gadbad dhoondhte hain, AI samjhata hai, aur SHA-256 prove karta hai ki log ke saath chhed-chhaad hui ya nahi."

---

## Step 2: Sample kholo (0:30 - 0:55)
**Screen:** Slide 5 (Live demo, QR wala) pe aao, phir app wale tab pe jao.

**Karo:** left side **"ERP marks tampering"** dabao.

**Kya dikhega:**
- Upar bada **laal box: "High risk"**.
- Neeche **Timeline** mein events ki list. Laal wale gadbad wale events hain.

**Bolo:**
"Ek click mein log ki timeline ban gayi. Laal lines gadbad hain: raat 2 baje 5 baar galat password, phir naye IP se login, phir marks 42 se 92, phir audit log delete. Har laal line ke saath reason likha hai. Ye rules ka kaam hai, AI ka nahi."

---

## Step 3: Kisne kya badla (0:55 - 1:15)
**Karo:** **"Changes made"** box dikhao. Likha hoga "6 changes, 3 unauthorized".

**Ek laal "Unauthorized" card pe ungli rakho aur bolo:**
"Yahan har badlav ki list hai: kisne, kab, kis IP se, pehle kya tha aur baad mein kya hua. Raat 2:09 baje prof.verma ke account se, IP 49.36.112.7 se, marks 42 se 92. Ye Unauthorized hai, kyunki login 5 galat password ke baad naye IP se hua tha. Matlab account chori hua tha."

---

## Step 4: AI se poochho (1:15 - 1:45)
**Karo:** **"What happened"** box mein **"Analyze with AI"** dabao, 5-10 second ruko.

**Kya dikhega:**
- **"Verdict: incident"**, aur thoda text ki kya hua.
- Har point ke saath **#14, #15** jaise number.
- Dotted box: **"AI found beyond the rules"**.

**Bolo:**
"AI ne poori kahani bata di. Har point ke saath event number hai, to hum khud check kar sakte hain ki AI sahi bol raha hai. Is dotted box mein woh baatein hain jo rules ne nahi pakdi, sirf AI ne jodi."

**Optional:** **हिंदी** dabao aur phir "Analyze with AI". Bolo: "Committee ke liye Hindi mein bhi."

**Agar grey "Offline summary" box aaye:** ghabrao mat. Bolo "AI abhi slow hai, ye rules wala backup hai", aur ek baar phir dabao.

---

## Step 5: Chhed-chhaad pakdo aur wapas lao (1:45 - 2:30)
**Karo:**
1. Left side **"Log text"** box mein `42->92` dhoondho.
2. `92` ko `93` kar do. Bas ek number.
3. Left side **"Verify integrity"** dabao.

**Kya dikhega:** laal **"TAMPERED: hash mismatch"**, aur neeche **"1 line changed after locking"**, jisme **Before** aur **After** dono dikhenge.

**Bolo:**
"Maine sirf ek number badla, aur poora hash badal gaya. App ne turant pakad liya, aur bata bhi diya kaunsi line badli."

4. **"Restore original"** dabao. Hara **MATCH** aayega.

**Bolo:**
"Aur ek click mein original wapas aa gaya, kyunki lock karte waqt humne ek sealed copy rakhi thi."

**Optional (time ho to):** "Audit trail" kholo aur **"Tamper test"** dabao. **"CHAIN BROKEN"** aayega. Bolo: "Hamari apni history bhi koi chupke se edit kare, to woh bhi pakda jata hai."

---

## Step 6: PDF report (2:30 - 2:45)
**Karo:** left side **"Save report as PDF"** dabao. Print window khulegi, wahan **"Save as PDF"** chuno.

**Bolo:**
"Poori report PDF mein: kisne kya badla, pehle aur baad, hash, AI summary aur history. Ye committee ko de sakte hain."

---

## Step 7: Khatam karo (2:45 - 3:00)
**Screen:** wapas slides pe jao: slide 6 (kisne kya badla), 7 (kaise kaam karta hai), 8 (testing), 9 (thank you).

**Bolo:**
"Humne 16 test cases banaye. 3 baar chalaye: 16, 16 aur 15 sahi aaye. Ek baar Hindi jawab slow tha, tab backup ne kaam kiya. Ye sirf college ke liye nahi hai: kisi bhi office, server ya website ka log chalega. QR scan karo aur apna log daal ke try karo. Thank you!"

---

## Agar kuch galat ho jaye
| Problem | Kya karo |
|---|---|
| Internet nahi chal raha | Phone ka hotspot on karo. Na chale to recorded video chalao. |
| AI ka grey "Offline summary" aaya | "AI slow hai, ye backup hai" bolo, ek baar phir dabao. |
| PDF window nahi khuli | "Download report (HTML)" dabao aur woh file kholo. |
| Page ajeeb dikh raha hai | "New case" dabao, phir sample dobara dabao. |

**Yaad rakhne wali ek line:** "Rules dhundhte hain, AI samjhata hai, SHA-256 prove karta hai."

**Note:** demo ke saare logs made-up sample data hain. Judge pooche to seedha yahi bolo.
