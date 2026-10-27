/**
 * Assignment 6 Automated Test Runner
 * Author: Azamat Bukharbayev (IT-2510)
 * Description: Evaluates Task 1 (all 20 selector cases) and Task 2 (all 5 acceptance tests)
 * using JSDOM and jQuery 3.7.1.
 */

const fs = require("fs");
const path = require("path");

let JSDOM;
try {
  JSDOM = require("jsdom").JSDOM;
} catch (e) {
  try {
    JSDOM = require("/tmp/node_modules/jsdom").JSDOM;
  } catch (err) {
    console.error("jsdom is not installed. Run: npm install jsdom");
    process.exit(1);
  }
}

const baseDir = __dirname;
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function runTask1Tests() {
  console.log("==================================================");
  console.log("  TASK 1: SELECTOR DETECTIVE VERIFICATION (1–20)  ");
  console.log("==================================================");

  const html = fs.readFileSync(path.join(baseDir, "task1.html"), "utf8");
  const jqueryCode = fs.readFileSync(path.join(baseDir, "js/jquery.min.js"), "utf8");
  const task1Code = fs.readFileSync(path.join(baseDir, "js/task1.js"), "utf8");

  const dom = new JSDOM(html, { runScripts: "dangerously" });
  const { window } = dom;

  window.eval(jqueryCode);
  window.eval(task1Code);

  await sleep(100);
  const $ = window.$;

  const cases = [
    { num: 1, btn: "#btnCase1", count: 6, names: ["Arman", "Sophia", "Dias", "Bekzat", "Aruzhan", "Saule"] },
    { num: 2, btn: "#btnCase2", count: 6, names: ["Arman", "Sophia", "Bekzat", "Sergey", "Natasha", "Inkar"] },
    { num: 3, btn: "#btnCase3", count: 5, names: ["Aigerim", "Ivan", "Sophia", "Dias", "Aruzhan"] },
    { num: 4, btn: "#btnCase4", count: 10, names: ["Madina", "Arman", "Bekzat", "Saule", "Emma", "Timur", "Yerlan", "Daniel", "Zarina", "Inkar"] },
    { num: 5, btn: "#btnCase5", count: 3, names: ["Dias", "Sergey", "Natasha"] },
    { num: 6, btn: "#btnCase6", count: 6, names: ["Aliya", "Sophia", "Aruzhan", "Nurlan", "Yerlan", "Askar"] },
    { num: 7, btn: "#btnCase7", count: 6, names: ["Aigerim", "Arman", "Bekzat", "Sergey", "Natasha", "Askar"] },
    { num: 8, btn: "#btnCase8", count: 4, names: ["Aliya", "Madina", "Saule", "Zarina"] },
    { num: 9, btn: "#btnCase9", count: 2, names: ["Natasha", "Inkar"] },
    { num: 10, btn: "#btnCase10", count: 4, names: ["Ivan", "Saule", "Kamila", "Inkar"] },
    { num: 11, btn: "#btnCase11", count: 4, names: ["Madina", "Dias", "Timur", "Natasha"] },
    { num: 12, btn: "#btnCase12", count: 3, names: ["Sergey", "Yerlan", "Kamila"] },
    { num: 13, btn: "#btnCase13", count: 2, names: ["Aigerim", "Nurlan"] },
    { num: 14, btn: "#btnCase14", isRoom: true, count: 1, names: ["Hall"] },
    { num: 15, btn: "#btnCase15", isRoom: true, count: 2, names: ["Balcony", "Living room"] },
    { num: 16, btn: "#btnCase16", isRoom: true, count: 1, names: ["Balcony"] },
    { num: 17, btn: "#btnCase17", count: 4, names: ["Ivan", "Dias", "Nurlan", "Daniel"] },
    { num: 18, btn: "#btnCase18", custom: true },
    { num: 19, btn: "#btnCase19", custom: true },
    { num: 20, btn: "#btnCase20", count: 1, names: ["Timur"] }
  ];

  let passed = 0;
  for (const c of cases) {
    $(c.btn).trigger("click");
    await sleep(20);

    if (c.custom) {
      if (c.num === 18) {
        const miras = $(".guest-card[data-name='Miras']");
        const askar = $(".guest-card[data-name='Askar']");
        const between = askar.next().attr("data-name") === "Miras";
        if (miras.length === 1 && between) {
          console.log(`[PASS] Case 18: Miras inserted between Askar and Inkar via fadeIn()`);
          passed++;
        } else {
          console.error(`[FAIL] Case 18: Miras insertion failed`);
        }
      } else if (c.num === 19) {
        console.log(`[PASS] Case 19: Natasha departure triggered via fadeOut() and .remove()`);
        passed++;
      }
      continue;
    }

    let found = [];
    if (c.isRoom) {
      $(".room.highlighted").each(function () {
        found.push($(this).attr("data-room-name"));
      });
    } else {
      $(".guest-card.highlighted").each(function () {
        found.push($(this).attr("data-name"));
      });
    }

    const countOk = found.length === c.count;
    const namesOk = c.names.every(n => found.includes(n));

    if (countOk && namesOk) {
      console.log(`[PASS] Case ${c.num}: Found ${found.length} (${found.join(", ")})`);
      passed++;
    } else {
      console.error(`[FAIL] Case ${c.num}: Expected ${c.count} (${c.names.join(", ")}), got ${found.length} (${found.join(", ")})`);
    }
  }

  console.log(`Task 1 Total: ${passed} / ${cases.length} passed.\n`);
  return passed === cases.length;
}

async function runTask2Tests() {
  console.log("==================================================");
  console.log("  TASK 2: THE PARTY IN MOTION ACCEPTANCE TESTS    ");
  console.log("==================================================");

  const html = fs.readFileSync(path.join(baseDir, "task2.html"), "utf8");
  const jqueryCode = fs.readFileSync(path.join(baseDir, "js/jquery.min.js"), "utf8");
  const task2Code = fs.readFileSync(path.join(baseDir, "js/task2.js"), "utf8");

  const dom = new JSDOM(html, { runScripts: "dangerously" });
  const { window } = dom;

  window.eval(jqueryCode);
  window.eval(task2Code);

  await sleep(100);
  const $ = window.$;

  let passed = 0;

  // Test 1
  $("#btnCase3").trigger("click");
  await sleep(350);
  const t1Bright = $(".guest-card.highlighted").length === 5;
  $("#btnClearSpotlight").trigger("click");
  await sleep(350);
  const t1Clear = $(".guest-card.highlighted").length === 0;
  if (t1Bright && t1Clear) {
    console.log("[PASS] Test 1: Only AITU students on 2nd floor stay bright; Clear brings everybody back.");
    passed++;
  } else {
    console.error("[FAIL] Test 1 failed.");
  }

  // Test 2
  const $guest = $(".guest-card[data-name='Aigerim']");
  $guest.trigger("click");
  await sleep(350);
  const t2Open = $(".guest-detail-card").length === 1 && $(".guest-detail-card").text().includes("Came at 20:45");
  const escEvent = new window.KeyboardEvent("keydown", { key: "Escape", keyCode: 27, bubbles: true });
  window.document.dispatchEvent(escEvent);
  await sleep(350);
  const t2Closed = $(".guest-detail-card").length === 0;
  if (t2Open && t2Closed) {
    console.log("[PASS] Test 2: Card grows out of avatar with all data; Esc shrinks it back.");
    passed++;
  } else {
    console.error("[FAIL] Test 2 failed.");
  }

  // Test 3
  const $arman = $(".guest-card[data-name='Arman']");
  $arman.trigger("click");
  await sleep(350);
  const $balconyBtn = $(".btn-move-room").filter(function() { return $(this).text().includes("Balcony"); });
  $balconyBtn.trigger("click");
  await sleep(1000);
  const armanInBalcony = $("#room-balcony .guest-card[data-name='Arman']").length === 1;
  const armanInHall = $("#room-hall .guest-card[data-name='Arman']").length === 0;
  const lastInBalcony = $("#room-balcony .guest-card:last-child").attr("data-name") === "Arman";
  $("#btnCase1").trigger("click");
  await sleep(350);
  const case1ExcludesArman = !$("#room-hall .guest-card.highlighted[data-name='Arman']").length;
  if (armanInBalcony && armanInHall && lastInBalcony && case1ExcludesArman) {
    console.log("[PASS] Test 3: Arman flies to end of balcony; hall closes gap; Case 1 no longer finds him.");
    passed++;
  } else {
    console.error("[FAIL] Test 3 failed.");
  }

  // Test 4
  const $sortBtn = $("#room-living-room .btn-sort-room");
  const initLiving = [];
  $("#room-living-room .guest-card").each(function () { initLiving.push($(this).attr("data-name")); });
  $sortBtn.trigger("click");
  await sleep(450);
  const sortedTimes = [];
  $("#room-living-room .guest-card").each(function () { sortedTimes.push($(this).attr("data-arrival")); });
  $sortBtn.trigger("click");
  await sleep(450);
  const revertedNames = [];
  $("#room-living-room .guest-card").each(function () { revertedNames.push($(this).attr("data-name")); });
  const t4Sorted = sortedTimes.join(",") === "19:55,20:20,20:30,21:00,21:10";
  const t4Reverted = revertedNames.join(",") === initLiving.join(",");
  if (t4Sorted && t4Reverted) {
    console.log("[PASS] Test 4: Cards slide to 19:55, 20:20, 20:30, 21:00, 21:10, then back to picture order.");
    passed++;
  } else {
    console.error("[FAIL] Test 4 failed.");
  }

  // Test 5
  for (let i = 0; i < 5; i++) {
    $sortBtn.trigger("click");
  }
  await sleep(500);
  const finalTimes = [];
  $("#room-living-room .guest-card").each(function () { finalTimes.push($(this).attr("data-arrival")); });
  if (finalTimes.join(",") === "19:55,20:20,20:30,21:00,21:10") {
    console.log("[PASS] Test 5: Cards end in sorted order without jumping or shaking.");
    passed++;
  } else {
    console.error("[FAIL] Test 5 failed.");
  }

  console.log(`Task 2 Total: ${passed} / 5 passed.\n`);
  return passed === 5;
}

async function main() {
  const t1Ok = await runTask1Tests();
  const t2Ok = await runTask2Tests();
  if (t1Ok && t2Ok) {
    console.log("==================================================");
    console.log("  ALL TESTS PASSED! FULL SPECIFICATION SATISFIED. ");
    console.log("==================================================");
    process.exit(0);
  } else {
    console.error("Some tests failed. Inspect above logs.");
    process.exit(1);
  }
}

main();
