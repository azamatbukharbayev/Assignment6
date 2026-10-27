# Assignment #6 — jQuery: Selectors, Effects, and Animations

**Course:** Web Technologies 1 (Front End)  
**Student:** Azamat Bukharbayev  
**Group:** IT-2510, Astana IT University (AITU)  
**GitHub Repository:** [https://github.com/azamatbukharbayev/Assignment6.git](https://github.com/azamatbukharbayev/Assignment6.git)  

---

## 1. Project Overview

This repository contains the complete implementation, automated regression testing suite, and formal academic documentation for **Assignment #6: jQuery (Selectors, Effects, Animations)**.

The assignment simulates a birthday party house scenario where AITU students gathered between 19:30 and 22:30. At 21:30, the birthday cake mysteriously disappeared from the kitchen. The system is split into two independent, production-grade web applications:

1. **Task 1 — Selector Detective (`task1.html`):**
   - Reconstructs the 2-floor, 4-room house and 21 party guests strictly from the authoritative reference illustration (`task1party`).
   - Implements 20 interactive detective case buttons that query the rendered DOM tree using explicit jQuery selector and traversal chains.
   - Found elements are highlighted and trigger a one-time vertical jump animation via jQuery `.animate()`.
   - Results are reported dynamically in an accessible status banner displaying count, names, and executed code.
   - Cases 18 and 19 execute dynamic DOM mutations: adding Miras via `insertAfter()` and `.fadeIn(600)`, and removing Natasha via `.fadeOut(600)` and `.remove()`.
   - Case 20 evaluates a 4-clue logical conjunction, uniquely unmasking Timur as the cake thief.

2. **Task 2 — The Party in Motion (`task2.html`):**
   - An independent, fully mutable copy of the party house that preserves changes across user interactions.
   - **Effect 1 (Spotlight & Clear):** Clicking any case spotlights matches at full brightness (`opacity: 1`) while dimming non-matches to 20% opacity over 300ms using `fadeTo(300, 0.2)`. The "Clear Spotlight" button restores all cards via `fadeTo(300, 1.0)`.
   - **Effect 2 (Expanding Guest Detail Card):** Clicking any guest card animates a modal growing smoothly outward from the avatar coordinates to a centered viewport card. Displays guest details in clear English sentences and closes by shrinking back into the avatar upon pressing Escape or clicking outside.
   - **Effect 3 (Cross-House Room Transfer):** Clicking a destination room button causes the guest card to visibly fly across the house (`.animate()`), while the old room's gap closes and the new room's space opens. Synchronizes the live DOM and underlying JavaScript arrays.
   - **Effect 4 (Chronological Positional Sorting):** Clicking "Sort by time" in any room header reorders cards by arrival time using a jQuery FLIP animation technique. Clicking again restores the original picture order.
   - **Effect 5 (Fast Clicks & Queue Hygiene):** Employs `.stop(true, false)` and odd-parity tracking so that 5 rapid clicks reliably settle in sorted order without shaking, jumping, or leaving residual animation queues.

---

## 2. Strict Technical Constraints Checklist

- [x] **jQuery Sole Library:** jQuery v3.7.1 is the only JavaScript library used (no Bootstrap, React, Vue, GSAP, Anime.js).
- [x] **No Inline Event Handlers:** Zero `onclick`, `onmouseover`, or inline handler attributes exist in any HTML file.
- [x] **Zero CSS Transitions:** Neither `task1.css` nor `task2.css` contains any `transition: ...` declarations.
- [x] **Zero CSS Animations / Keyframes:** No `@keyframes` rules or CSS animation properties exist in any stylesheet.
- [x] **DOM-Based Selection:** All 20 cases search the live HTML DOM using jQuery selector chains and traversal methods, never searching JavaScript arrays directly.
- [x] **Independent Codebases:** Task 1 and Task 2 maintain separate HTML, CSS, and JS files.

---

## 3. Project Directory Structure

```text
Assignment6/
├── index.html                   # Project landing hub & documentation overview
├── task1.html                   # Task 1: Selector Detective web application
├── task2.html                   # Task 2: The Party in Motion web application
├── css/
│   ├── task1.css                # Task 1 styling (100% free of CSS transitions/keyframes)
│   └── task2.css                # Task 2 styling & modal overlay rules
├── js/
│   ├── jquery.min.js            # Offline local jQuery 3.7.1 dependency (85 KB)
│   ├── task1.js                 # Task 1 data model, DOM renderer, 20 selector cases
│   └── task2.js                 # Task 2 mutable state, animated effects, FLIP sorting
├── test_runner.js               # Headless automated verification suite (Node.js + jsdom)
├── generate_report.py           # Academic report generator (python-docx + Apple Pages/ReportLab)
├── README.md                    # System documentation and execution manual
├── Assignment6_AzamatBukharbayev.docx # Editable academic report (51 KB)
└── Assignment6_AzamatBukharbayev.pdf  # Final rendered academic PDF report (14 pages, 440 KB)
```

---

## 4. How to Launch and Test

### 4.1. Opening in a Browser
Simply double-click or open any of the following HTML files in Google Chrome, Safari, Firefox, or Microsoft Edge:
- `index.html`: Project landing hub.
- `task1.html`: Task 1 application.
- `task2.html`: Task 2 application.

Because `js/jquery.min.js` is bundled locally and SVG avatars use resilient offline fallbacks, the applications run 100% offline without requiring internet access or a local web server.

### 4.2. Running the Headless Automated Test Suite
An automated headless test suite (`test_runner.js`) is included to verify all 20 Task 1 selector queries and all 5 Task 2 acceptance tests in Node.js via JSDOM:

```bash
node test_runner.js
```

**Expected output:**
```text
==================================================
  TASK 1: SELECTOR DETECTIVE VERIFICATION (1–20)  
==================================================
[PASS] Case 1: Found 6 (Arman, Sophia, Dias, Bekzat, Aruzhan, Saule)
...
[PASS] Case 20: Found 1 (Timur)
Task 1 Total: 20 / 20 passed.

==================================================
  TASK 2: THE PARTY IN MOTION ACCEPTANCE TESTS    
==================================================
[PASS] Test 1: Only AITU students on 2nd floor stay bright; Clear brings everybody back.
[PASS] Test 2: Card grows out of avatar with all data; Esc shrinks it back.
[PASS] Test 3: Arman flies to end of balcony; hall closes gap; Case 1 no longer finds him.
[PASS] Test 4: Cards slide to 19:55, 20:20, 20:30, 21:00, 21:10, then back to picture order.
[PASS] Test 5: Cards end in sorted order without jumping or shaking.
Task 2 Total: 5 / 5 passed.

==================================================
  ALL TESTS PASSED! FULL SPECIFICATION SATISFIED. 
==================================================
```

### 4.3. Re-Generating the Academic Report
To regenerate `Assignment6_AzamatBukharbayev.docx` and `Assignment6_AzamatBukharbayev.pdf`:

```bash
python3 generate_report.py
```

---

## 5. Authoritative Party Dataset (21 Guests)

| Floor | Room | Name | Ring Color | Arrival | AITU? | Things Associated | Initial Order |
|:---:|:---:|:---|:---:|:---:|:---:|:---|:---:|
| 2 | Balcony | **Aigerim** | Green | 20:45 | Yes | Cup, Cake crumbs | 0 |
| 2 | Balcony | **Aliya** | Black | 21:15 | No | Phone, Cup | 1 |
| 2 | Balcony | **Madina** | Green | 22:10 | No | Phone, Bag, Cake crumbs | 2 |
| 2 | Balcony | **Ivan** | Blue | 20:10 | Yes | Cup | 3 |
| 2 | Hall | **Arman** | Yellow | 20:35 | No | Bag, Glasses | 0 |
| 2 | Hall | **Sophia** | Purple | 21:20 | Yes | Phone | 1 |
| 2 | Hall | **Dias** | Green | 19:45 | Yes | None (empty) | 2 |
| 2 | Hall | **Bekzat** | Purple | 20:55 | No | Bag, Cup, Cake crumbs | 3 |
| 2 | Hall | **Aruzhan** | Blue | 21:50 | Yes | Phone | 4 |
| 2 | Hall | **Saule** | Green | 21:25 | No | Glasses | 5 |
| 1 | Kitchen | **Nurlan** | Red | 19:40 | Yes | Phone, Cup | 0 |
| 1 | Kitchen | **Emma** | Black | 20:15 | Yes | Bag | 1 |
| 1 | Kitchen | **Timur** | Green | 21:05 | Yes | Phone, Bag, Cake crumbs | 2 |
| 1 | Kitchen | **Sergey** | Yellow | 20:50 | No | None (empty) | 3 |
| 1 | Kitchen | **Yerlan** | Red | 21:40 | Yes | Glasses, Phone | 4 |
| 1 | Kitchen | **Kamila** | Green | 20:05 | No | Cup | 5 |
| 1 | Living room | **Daniel** | Blue | 19:55 | Yes | Glasses | 0 |
| 1 | Living room | **Zarina** | Green | 21:10 | No | Bag, Cup, Cake crumbs | 1 |
| 1 | Living room | **Natasha** | Yellow | 20:30 | Yes | None (empty) | 2 |
| 1 | Living room | **Askar** | Blue | 21:00 | Yes | Phone | 3 |
| 1 | Living room | **Inkar** | Purple | 20:20 | No | Bag | 4 |

---

## 6. Summary of Task 1 Selector Chains

| Case | Query | Actual jQuery Chain | Result Count & Names |
|:---:|:---|:---|:---|
| 1 | Who is in the hall? | `$("#room-hall .guest-card")` | 6 guests (Arman, Sophia, Dias, Bekzat, Aruzhan, Saule) |
| 2 | Dressed in yellow or purple? | `$(".guest-card.yellow, .guest-card.purple")` | 6 guests (Arman, Sophia, Bekzat, Sergey, Natasha, Inkar) |
| 3 | AITU students upstairs? | `$(".floor-section[data-floor='2'] .guest-card.aitu")` | 5 guests (Aigerim, Ivan, Sophia, Dias, Aruzhan) |
| 4 | Has glasses or a bag? | `$(".guest-card:has(.item-glasses), .guest-card:has(.item-bag)")` | 10 guests (Madina, Arman, Bekzat, Saule, Emma, Timur, Yerlan, Daniel, Zarina, Inkar) |
| 5 | Came with nothing at all? | `$(".guest-card:not(:has(.item-icon))")` | 3 guests (Dias, Sergey, Natasha) |
| 6 | Has a phone but no bag? | `$(".guest-card:has(.item-phone):not(:has(.item-bag))")` | 6 guests (Aliya, Sophia, Aruzhan, Nurlan, Yerlan, Askar) |
| 7 | Arrived 20:30–21:00 (inc.)? | `$(".guest-card").filter(function() { const t = $(this).attr("data-arrival"); return t >= "20:30" && t <= "21:00"; })` | 6 guests (Aigerim, Arman, Bekzat, Sergey, Natasha, Askar) |
| 8 | Arrived > 21:00 & not AITU? | `$(".guest-card:not(.aitu)").filter(function() { return $(this).attr("data-arrival") > "21:00"; })` | 4 guests (Aliya, Madina, Saule, Zarina) |
| 9 | Right next to Askar? | `$(".guest-card[data-name='Askar']").prev(".guest-card").add($(".guest-card[data-name='Askar']").next(".guest-card"))` | 2 guests (Natasha, Inkar) |
| 10 | Stands last in each room? | `$(".room .guest-card:last-child")` | 4 guests (Ivan, Saule, Kamila, Inkar) |
| 11 | Stands third in each room? | `$(".room .guest-card:nth-child(3)")` | 4 guests (Madina, Dias, Timur, Natasha) |
| 12 | Stands after Timur? | `$(".guest-card[data-name='Timur']").nextAll(".guest-card")` | 3 guests (Sergey, Yerlan, Kamila) |
| 13 | Right before someone in black? | `$(".guest-card.black").prev(".guest-card")` | 2 guests (Aigerim, Nurlan) |
| 14 | In which room is Aruzhan? | `$(".guest-card[data-name='Aruzhan']").closest(".room")` | 1 room (Hall, Floor 2) |
| 15 | Rooms with < 6 guests? | `$(".room").filter(function() { return $(this).find(".guest-card").length < 6; })` | 2 rooms (Balcony, Living room) |
| 16 | Cup present, no glasses? | `$(".room:has(.item-cup):not(:has(.item-glasses))")` | 1 room (Balcony) |
| 17 | Came first to each room? | `$(".room").map(function() { ... min time search ... })` | 4 guests (Ivan, Dias, Nurlan, Daniel) |
| 18 | Miras joins Askar & Inkar | `mirasCard.insertAfter($(".guest-card[data-name='Askar']")).fadeIn(600)` | 1 guest added (Miras, 21:20, Blue, Phone, AITU) |
| 19 | Natasha leaves party | `natasha.fadeOut(600, function() { $(this).remove(); })` | 1 guest departed (Natasha card removed from DOM) |
| 20 | Who took the cake? | `$(".floor-section[data-floor='1'] .guest-card").filter(":has(.item-crumbs):not(:has(.item-cup))").filter(... 21:00 < t < 21:30 ...).filter(... .prev('.aitu') || .next('.aitu') ...)` | 1 thief identified (**Timur**) |

---

## 7. Task 2 Acceptance Test Results

| Check | Procedure | Expected Result | Actual Verified Result | Status |
|:---|:---|:---|:---|:---:|
| **Case 3, then Clear** | Click Case 3, wait 350ms, then click Clear Spotlight. | Only AITU students on 2nd floor stay bright; Clear brings everybody back. | Verified: Exactly 5 upstairs AITU students stayed at opacity 1.0; all others faded to 0.2 over 300ms. Clear restored all 21 cards to full opacity. | **Pass** |
| **Click a guest, then Esc** | Click Aigerim, observe outward growth, press Escape. | Card grows out of avatar with all data; Esc shrinks it back into avatar. | Verified: Modal expanded from avatar offset (300ms) with full descriptive sentences; Esc triggered 240ms shrink animation back into avatar. | **Pass** |
| **Move Arman to balcony** | Open Arman, click 'Move to Balcony', then run Case 1. | Arman flies to end of balcony; hall closes gap; Case 1 no longer finds him. | Verified: Arman flew across house (500ms), Hall gap closed, Balcony opened space. Live DOM and array updated; Case 1 excludes him. | **Pass** |
| **Sort living room twice** | Click 'Sort by time' in Living room header, then click again. | Cards slide to 19:55, 20:20, 20:30, 21:00, 21:10, then back to picture order. | Verified: Cards smoothly slid into chronological order (19:55 → 20:20 → 20:30 → 21:00 → 21:10); second click restored initial order. | **Pass** |
| **Sort 5 times fast** | Click 'Sort by time' in Living room 5 times rapidly. | Cards end in sorted order without jumping or shaking. | Verified: Odd-parity (5 toggles) resolved cleanly. Ended in chronological sorted order with zero duplicate cards or lingering queues. | **Pass** |

---

## 8. Git Commit & Repository Information

- **Remote URL:** `https://github.com/azamatbukharbayev/Assignment6.git`
- **Branch:** `main`
- All assignment deliverables are staged and committed directly within the project workspace.
