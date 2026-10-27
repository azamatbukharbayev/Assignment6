/**
 * Assignment 6: Task 1 - Selector Detective
 * Author: Azamat Bukharbayev (IT-2510)
 * Description: DOM construction from data, and 20 jQuery selector detective cases.
 * STRICT RULES: jQuery is the ONLY JavaScript library. No CSS transitions/animations.
 */

$(document).ready(function () {
  "use strict";

  // =========================================================================
  // 1. RECONSTRUCTED PARTY DATA MODEL (Authoritative Initial State)
  // =========================================================================
  const INITIAL_PARTY = [
    {
      id: "balcony",
      name: "Balcony",
      floor: 2,
      originalOrder: 0,
      guests: [
        {
          id: "guest-aigerim",
          name: "Aigerim",
          clothingColor: "green",
          arrivalTime: "20:45",
          aituStudent: true,
          things: ["cup", "crumbs"],
          originalOrder: 0
        },
        {
          id: "guest-aliya",
          name: "Aliya",
          clothingColor: "black",
          arrivalTime: "21:15",
          aituStudent: false,
          things: ["phone", "cup"],
          originalOrder: 1
        },
        {
          id: "guest-madina",
          name: "Madina",
          clothingColor: "green",
          arrivalTime: "22:10",
          aituStudent: false,
          things: ["phone", "bag", "crumbs"],
          originalOrder: 2
        },
        {
          id: "guest-ivan",
          name: "Ivan",
          clothingColor: "blue",
          arrivalTime: "20:10",
          aituStudent: true,
          things: ["cup"],
          originalOrder: 3
        }
      ]
    },
    {
      id: "hall",
      name: "Hall",
      floor: 2,
      originalOrder: 1,
      guests: [
        {
          id: "guest-arman",
          name: "Arman",
          clothingColor: "yellow",
          arrivalTime: "20:35",
          aituStudent: false,
          things: ["bag", "glasses"],
          originalOrder: 0
        },
        {
          id: "guest-sophia",
          name: "Sophia",
          clothingColor: "purple",
          arrivalTime: "21:20",
          aituStudent: true,
          things: ["phone"],
          originalOrder: 1
        },
        {
          id: "guest-dias",
          name: "Dias",
          clothingColor: "green",
          arrivalTime: "19:45",
          aituStudent: true,
          things: [],
          originalOrder: 2
        },
        {
          id: "guest-bekzat",
          name: "Bekzat",
          clothingColor: "purple",
          arrivalTime: "20:55",
          aituStudent: false,
          things: ["bag", "cup", "crumbs"],
          originalOrder: 3
        },
        {
          id: "guest-aruzhan",
          name: "Aruzhan",
          clothingColor: "blue",
          arrivalTime: "21:50",
          aituStudent: true,
          things: ["phone"],
          originalOrder: 4
        },
        {
          id: "guest-saule",
          name: "Saule",
          clothingColor: "green",
          arrivalTime: "21:25",
          aituStudent: false,
          things: ["glasses"],
          originalOrder: 5
        }
      ]
    },
    {
      id: "kitchen",
      name: "Kitchen",
      floor: 1,
      originalOrder: 2,
      guests: [
        {
          id: "guest-nurlan",
          name: "Nurlan",
          clothingColor: "red",
          arrivalTime: "19:40",
          aituStudent: true,
          things: ["phone", "cup"],
          originalOrder: 0
        },
        {
          id: "guest-emma",
          name: "Emma",
          clothingColor: "black",
          arrivalTime: "20:15",
          aituStudent: true, // AITU student neighbour in kitchen
          things: ["bag"],
          originalOrder: 1
        },
        {
          id: "guest-timur",
          name: "Timur",
          clothingColor: "green",
          arrivalTime: "21:05",
          aituStudent: true,
          things: ["phone", "bag", "crumbs"],
          originalOrder: 2
        },
        {
          id: "guest-sergey",
          name: "Sergey",
          clothingColor: "yellow",
          arrivalTime: "20:50",
          aituStudent: false,
          things: [],
          originalOrder: 3
        },
        {
          id: "guest-yerlan",
          name: "Yerlan",
          clothingColor: "red",
          arrivalTime: "21:40",
          aituStudent: true,
          things: ["glasses", "phone"],
          originalOrder: 4
        },
        {
          id: "guest-kamila",
          name: "Kamila",
          clothingColor: "green",
          arrivalTime: "20:05",
          aituStudent: false,
          things: ["cup"],
          originalOrder: 5
        }
      ]
    },
    {
      id: "living-room",
      name: "Living room",
      floor: 1,
      originalOrder: 3,
      guests: [
        {
          id: "guest-daniel",
          name: "Daniel",
          clothingColor: "blue",
          arrivalTime: "19:55",
          aituStudent: true,
          things: ["glasses"],
          originalOrder: 0
        },
        {
          id: "guest-zarina",
          name: "Zarina",
          clothingColor: "green",
          arrivalTime: "21:10",
          aituStudent: false,
          things: ["bag", "cup", "crumbs"],
          originalOrder: 1
        },
        {
          id: "guest-natasha",
          name: "Natasha",
          clothingColor: "yellow",
          arrivalTime: "20:30",
          aituStudent: true,
          things: [],
          originalOrder: 2
        },
        {
          id: "guest-askar",
          name: "Askar",
          clothingColor: "blue",
          arrivalTime: "21:00",
          aituStudent: true,
          things: ["phone"],
          originalOrder: 3
        },
        {
          id: "guest-inkar",
          name: "Inkar",
          clothingColor: "purple",
          arrivalTime: "20:20",
          aituStudent: false,
          things: ["bag"],
          originalOrder: 4
        }
      ]
    }
  ];

  // Working party array for Task 1
  let currentParty = JSON.parse(JSON.stringify(INITIAL_PARTY));

  // Item icon mapping
  const ITEM_ICONS = {
    phone: { icon: "📱", label: "Phone", className: "item-phone" },
    glasses: { icon: "👓", label: "Glasses", className: "item-glasses" },
    bag: { icon: "👜", label: "Bag", className: "item-bag" },
    cup: { icon: "☕", label: "Cup", className: "item-cup" },
    crumbs: { icon: "🍰", label: "Cake crumbs", className: "item-crumbs" }
  };

  // =========================================================================
  // 2. DOM CONSTRUCTION HELPER FUNCTIONS
  // =========================================================================
  function getAvatarUrl(name) {
    return "https://api.dicebear.com/9.x/open-peeps/svg?seed=" + encodeURIComponent(name);
  }

  function createGuestCard(guest, roomId, floorNum) {
    const $card = $("<div></div>")
      .addClass("guest-card")
      .addClass(guest.clothingColor)
      .attr({
        "id": guest.id,
        "data-id": guest.id,
        "data-name": guest.name,
        "data-color": guest.clothingColor,
        "data-arrival": guest.arrivalTime,
        "data-aitu": guest.aituStudent ? "true" : "false",
        "data-room": roomId,
        "data-floor": floorNum,
        "data-things": guest.things.join(","),
        "data-original-order": guest.originalOrder,
        "tabindex": "0",
        "role": "article",
        "aria-label": guest.name + " (" + guest.clothingColor + ")"
      });

    if (guest.aituStudent) {
      $card.addClass("aitu");
    }

    if (guest.things && guest.things.length > 0) {
      guest.things.forEach(function (thing) {
        $card.addClass("item-" + thing);
      });
    } else {
      $card.addClass("has-no-items");
    }

    // Avatar Wrapper & Ring
    const $avatarWrap = $("<div></div>")
      .addClass("avatar-wrapper")
      .addClass("ring-" + guest.clothingColor);

    const $avatarImg = $("<img>")
      .addClass("avatar-img")
      .attr({
        "src": getAvatarUrl(guest.name),
        "alt": "Avatar of " + guest.name,
        "loading": "lazy"
      })
      .on("error", function () {
        // Fallback if network avatar fails
        $(this).replaceWith(
          $("<div class='avatar-img fallback-avatar' style='display:flex;align-items:center;justify-content:center;font-size:18px;'>👤</div>")
        );
      });

    $avatarWrap.append($avatarImg);

    if (guest.aituStudent) {
      const $badge = $("<span></span>")
        .addClass("aitu-badge")
        .attr({
          "title": "AITU Student",
          "aria-label": "AITU Student"
        })
        .text("🎓");
      $avatarWrap.append($badge);
    }

    // Name
    const $name = $("<div></div>")
      .addClass("guest-name")
      .text(guest.name);

    // Arrival Time
    const $time = $("<div></div>")
      .addClass("guest-time")
      .attr("title", "Arrival time")
      .html("⏱️ " + guest.arrivalTime);

    // Items Container
    const $items = $("<div></div>").addClass("guest-items");
    if (guest.things && guest.things.length > 0) {
      guest.things.forEach(function (thing) {
        const itemDef = ITEM_ICONS[thing];
        if (itemDef) {
          const $icon = $("<span></span>")
            .addClass("item-icon")
            .addClass(itemDef.className)
            .attr({
              "title": itemDef.label,
              "aria-label": itemDef.label
            })
            .text(itemDef.icon);
          $items.append($icon);
        }
      });
    } else {
      const $empty = $("<span></span>")
        .addClass("no-items-placeholder")
        .attr("title", "Came with no items")
        .text("—");
      $items.append($empty);
    }

    $card.append($avatarWrap, $name, $time, $items);
    return $card;
  }

  function renderParty(partyData) {
    partyData.forEach(function (room) {
      const $roomElem = $("#room-" + room.id);
      const $list = $roomElem.find(".guests-list");
      $list.empty();
      $roomElem.find(".room-count-badge").text(room.guests.length + " guests");

      room.guests.forEach(function (guest) {
        const $card = createGuestCard(guest, room.id, room.floor);
        $list.append($card);
      });
    });
  }

  function resetToInitial() {
    currentParty = JSON.parse(JSON.stringify(INITIAL_PARTY));
    $(".highlighted").removeClass("highlighted");
    $(".case-btn").removeClass("active");
    renderParty(currentParty);
  }

  // Initial build on page load
  renderParty(currentParty);

  // =========================================================================
  // 3. SELECTION HIGHLIGHT & JUMP ANIMATION HELPERS
  // =========================================================================
  function clearHighlights() {
    $(".highlighted").removeClass("highlighted");
    $(".room").removeClass("highlighted");
    $(".guest-card").stop(true, true).css("top", "0px");
  }

  function animateJump($cards) {
    if (!$cards || $cards.length === 0) return;
    $cards.each(function () {
      const $card = $(this);
      $card.stop(true, true)
        .animate({ top: "-14px" }, 160)
        .animate({ top: "0px" }, 160);
    });
  }

  function displayResult(caseNum, question, chainCode, $resultElements, isRoomQuery, customOutcome) {
    const $banner = $("#resultBanner");
    $banner.addClass("has-result");

    $("#resultCaseNum").text("Case #" + caseNum);
    $("#resultQuestion").text(question);
    $("#resultChainCode").text(chainCode);

    if (customOutcome) {
      $("#resultCount").text(customOutcome.countText || "");
      $("#resultNames").html(customOutcome.detailsHtml || "");
      return;
    }

    if (isRoomQuery) {
      const count = $resultElements.length;
      $("#resultCount").text(count + " room" + (count === 1 ? "" : "s"));
      const roomNames = [];
      $resultElements.each(function () {
        roomNames.push($(this).attr("data-room-name") || $(this).find(".room-title").text());
      });
      $("#resultNames").html("<strong>Rooms found:</strong> " + (roomNames.length > 0 ? roomNames.join(", ") : "None"));
    } else {
      const count = $resultElements.length;
      $("#resultCount").text(count + " guest" + (count === 1 ? "" : "s"));
      const names = [];
      $resultElements.each(function () {
        names.push($(this).attr("data-name"));
      });
      $("#resultNames").html("<strong>Guests found:</strong> " + (names.length > 0 ? names.join(", ") : "None"));
    }
  }

  // =========================================================================
  // 4. THE 20 DETECTIVE CASES (Executed Against the Rendered DOM)
  // =========================================================================

  // Case 1: Who is in the hall?
  $("#btnCase1").on("click", function () {
    resetToInitial();
    clearHighlights();
    $(this).addClass("active");

    const chain = '$("#room-hall .guest-card")';
    const $matches = $("#room-hall .guest-card");

    $matches.addClass("highlighted");
    animateJump($matches);
    displayResult(1, "Who is in the hall?", chain, $matches, false);
  });

  // Case 2: Who is dressed in yellow or purple?
  $("#btnCase2").on("click", function () {
    resetToInitial();
    clearHighlights();
    $(this).addClass("active");

    const chain = '$(".guest-card.yellow, .guest-card.purple")';
    const $matches = $(".guest-card.yellow, .guest-card.purple");

    $matches.addClass("highlighted");
    animateJump($matches);
    displayResult(2, "Who is dressed in yellow or purple?", chain, $matches, false);
  });

  // Case 3: Which AITU students are upstairs?
  $("#btnCase3").on("click", function () {
    resetToInitial();
    clearHighlights();
    $(this).addClass("active");

    const chain = '$(".floor-section[data-floor=\'2\'] .guest-card.aitu")';
    const $matches = $(".floor-section[data-floor='2'] .guest-card.aitu");

    $matches.addClass("highlighted");
    animateJump($matches);
    displayResult(3, "Which AITU students are upstairs?", chain, $matches, false);
  });

  // Case 4: Who has glasses or a bag?
  $("#btnCase4").on("click", function () {
    resetToInitial();
    clearHighlights();
    $(this).addClass("active");

    const chain = '$(".guest-card:has(.item-glasses), .guest-card:has(.item-bag)")';
    const $matches = $(".guest-card:has(.item-glasses), .guest-card:has(.item-bag)");

    $matches.addClass("highlighted");
    animateJump($matches);
    displayResult(4, "Who has glasses or a bag?", chain, $matches, false);
  });

  // Case 5: Who came with nothing at all?
  $("#btnCase5").on("click", function () {
    resetToInitial();
    clearHighlights();
    $(this).addClass("active");

    const chain = '$(".guest-card:not(:has(.item-icon))")';
    const $matches = $(".guest-card:not(:has(.item-icon))");

    $matches.addClass("highlighted");
    animateJump($matches);
    displayResult(5, "Who came with nothing at all?", chain, $matches, false);
  });

  // Case 6: Who has a phone but no bag?
  $("#btnCase6").on("click", function () {
    resetToInitial();
    clearHighlights();
    $(this).addClass("active");

    const chain = '$(".guest-card:has(.item-phone):not(:has(.item-bag))")';
    const $matches = $(".guest-card:has(.item-phone):not(:has(.item-bag))");

    $matches.addClass("highlighted");
    animateJump($matches);
    displayResult(6, "Who has a phone but no bag?", chain, $matches, false);
  });

  // Case 7: Who arrived between 20:30 and 21:00, both times included?
  $("#btnCase7").on("click", function () {
    resetToInitial();
    clearHighlights();
    $(this).addClass("active");

    const chain = '$(".guest-card").filter(function() { const t = $(this).attr("data-arrival"); return t >= "20:30" && t <= "21:00"; })';
    const $matches = $(".guest-card").filter(function () {
      const t = $(this).attr("data-arrival");
      return t >= "20:30" && t <= "21:00";
    });

    $matches.addClass("highlighted");
    animateJump($matches);
    displayResult(7, "Who arrived between 20:30 and 21:00, both times included?", chain, $matches, false);
  });

  // Case 8: Who arrived after 21:00 and is not an AITU student?
  $("#btnCase8").on("click", function () {
    resetToInitial();
    clearHighlights();
    $(this).addClass("active");

    const chain = '$(".guest-card:not(.aitu)").filter(function() { return $(this).attr("data-arrival") > "21:00"; })';
    const $matches = $(".guest-card:not(.aitu)").filter(function () {
      return $(this).attr("data-arrival") > "21:00";
    });

    $matches.addClass("highlighted");
    animateJump($matches);
    displayResult(8, "Who arrived after 21:00 and is not an AITU student?", chain, $matches, false);
  });

  // Case 9: Who stands right next to Askar?
  $("#btnCase9").on("click", function () {
    resetToInitial();
    clearHighlights();
    $(this).addClass("active");

    const chain = '$(".guest-card[data-name=\'Askar\']").prev(".guest-card").add($(".guest-card[data-name=\'Askar\']").next(".guest-card"))';
    const $askar = $(".guest-card[data-name='Askar']");
    const $matches = $askar.prev(".guest-card").add($askar.next(".guest-card"));

    $matches.addClass("highlighted");
    animateJump($matches);
    displayResult(9, "Who stands right next to Askar?", chain, $matches, false);
  });

  // Case 10: Who stands last in each room?
  $("#btnCase10").on("click", function () {
    resetToInitial();
    clearHighlights();
    $(this).addClass("active");

    const chain = '$(".room .guest-card:last-child")';
    const $matches = $(".room .guest-card:last-child");

    $matches.addClass("highlighted");
    animateJump($matches);
    displayResult(10, "Who stands last in each room?", chain, $matches, false);
  });

  // Case 11: Who stands third in each room?
  $("#btnCase11").on("click", function () {
    resetToInitial();
    clearHighlights();
    $(this).addClass("active");

    const chain = '$(".room .guest-card:nth-child(3)")';
    const $matches = $(".room .guest-card:nth-child(3)");

    $matches.addClass("highlighted");
    animateJump($matches);
    displayResult(11, "Who stands third in each room?", chain, $matches, false);
  });

  // Case 12: Who stands after Timur in his room?
  $("#btnCase12").on("click", function () {
    resetToInitial();
    clearHighlights();
    $(this).addClass("active");

    const chain = '$(".guest-card[data-name=\'Timur\']").nextAll(".guest-card")';
    const $matches = $(".guest-card[data-name='Timur']").nextAll(".guest-card");

    $matches.addClass("highlighted");
    animateJump($matches);
    displayResult(12, "Who stands after Timur in his room?", chain, $matches, false);
  });

  // Case 13: Who stands right before someone in black?
  $("#btnCase13").on("click", function () {
    resetToInitial();
    clearHighlights();
    $(this).addClass("active");

    const chain = '$(".guest-card.black").prev(".guest-card")';
    const $matches = $(".guest-card.black").prev(".guest-card");

    $matches.addClass("highlighted");
    animateJump($matches);
    displayResult(13, "Who stands right before someone in black?", chain, $matches, false);
  });

  // Case 14: In which room is Aruzhan?
  $("#btnCase14").on("click", function () {
    resetToInitial();
    clearHighlights();
    $(this).addClass("active");

    const chain = '$(".guest-card[data-name=\'Aruzhan\']").closest(".room")';
    const $room = $(".guest-card[data-name='Aruzhan']").closest(".room");

    $room.addClass("highlighted");
    animateJump($room.find(".guest-card"));
    displayResult(14, "In which room is Aruzhan?", chain, $room, true);
  });

  // Case 15: Which rooms have fewer than 6 guests?
  $("#btnCase15").on("click", function () {
    resetToInitial();
    clearHighlights();
    $(this).addClass("active");

    const chain = '$(".room").filter(function() { return $(this).find(".guest-card").length < 6; })';
    const $matches = $(".room").filter(function () {
      return $(this).find(".guest-card").length < 6;
    });

    $matches.addClass("highlighted");
    animateJump($matches.find(".guest-card"));
    displayResult(15, "Which rooms have fewer than 6 guests?", chain, $matches, true);
  });

  // Case 16: In which rooms does somebody have a cup, but nobody wears glasses?
  $("#btnCase16").on("click", function () {
    resetToInitial();
    clearHighlights();
    $(this).addClass("active");

    const chain = '$(".room:has(.item-cup):not(:has(.item-glasses))")';
    const $matches = $(".room:has(.item-cup):not(:has(.item-glasses))");

    $matches.addClass("highlighted");
    animateJump($matches.find(".guest-card"));
    displayResult(16, "In which rooms does somebody have a cup, but nobody wears glasses?", chain, $matches, true);
  });

  // Case 17: Who came first to each room?
  $("#btnCase17").on("click", function () {
    resetToInitial();
    clearHighlights();
    $(this).addClass("active");

    const chain = '$(".room").map(function() { let e = null, min = "99:99"; $(this).find(".guest-card").each(function() { const t = $(this).attr("data-arrival"); if (t < min) { min = t; e = this; } }); return e; })';
    
    // Evaluate across rooms
    const earliestElements = [];
    $(".room").each(function () {
      let earliestCard = null;
      let minTime = "99:99";
      $(this).find(".guest-card").each(function () {
        const time = $(this).attr("data-arrival");
        if (time < minTime) {
          minTime = time;
          earliestCard = this;
        }
      });
      if (earliestCard) {
        earliestElements.push(earliestCard);
      }
    });

    const $matches = $(earliestElements);
    $matches.addClass("highlighted");
    animateJump($matches);
    displayResult(17, "Who came first to each room?", chain, $matches, false);
  });

  // Case 18: Miras joins Askar and Inkar
  $("#btnCase18").on("click", function () {
    resetToInitial();
    clearHighlights();
    $(this).addClass("active");

    const mirasGuest = {
      id: "guest-miras",
      name: "Miras",
      clothingColor: "blue",
      arrivalTime: "21:20",
      aituStudent: true,
      things: ["phone"],
      originalOrder: 99
    };

    const chain = 'const mirasCard = createGuestCard(mirasData).hide(); mirasCard.insertAfter($(".guest-card[data-name=\'Askar\']")).fadeIn(600);';
    
    // Create Miras card
    const $mirasCard = createGuestCard(mirasGuest, "living-room", 1).hide();
    const $askar = $(".guest-card[data-name='Askar']");

    // Insert between Askar and Inkar in the Living Room
    $mirasCard.insertAfter($askar);

    // Update Living Room guests array in current working party
    const livingRoomObj = currentParty.find(function (r) { return r.id === "living-room"; });
    if (livingRoomObj) {
      const askarIdx = livingRoomObj.guests.findIndex(function (g) { return g.name === "Askar"; });
      livingRoomObj.guests.splice(askarIdx + 1, 0, mirasGuest);
      $("#room-living-room .room-count-badge").text(livingRoomObj.guests.length + " guests");
    }

    $mirasCard.fadeIn(600, function () {
      $mirasCard.addClass("highlighted");
      animateJump($mirasCard);
    });

    displayResult(
      18,
      "Miras joins Askar and Inkar",
      chain,
      $mirasCard,
      false,
      {
        countText: "1 guest added",
        detailsHtml: "<strong>Action:</strong> Miras arrived at 21:20, wearing blue with a phone and AITU badge. Inserted between Askar and Inkar in Living room using <code>insertAfter()</code> and <code>fadeIn(600)</code>."
      }
    );
  });

  // Case 19: Natasha leaves the party
  $("#btnCase19").on("click", function () {
    resetToInitial();
    clearHighlights();
    $(this).addClass("active");

    const chain = 'const natasha = $(".guest-card[data-name=\'Natasha\']"); natasha.fadeOut(600, function() { $(this).remove(); });';
    const $natasha = $(".guest-card[data-name='Natasha']");

    $natasha.addClass("highlighted");

    displayResult(
      19,
      "Natasha leaves the party",
      chain,
      $natasha,
      false,
      {
        countText: "1 guest departed",
        detailsHtml: "<strong>Action:</strong> Natasha says goodbye. Card highlighted and animated out via <code>fadeOut(600)</code>, then safely removed from the DOM with <code>remove()</code>."
      }
    );

    $natasha.fadeOut(600, function () {
      $(this).remove();
      // Update living room array
      const livingRoomObj = currentParty.find(function (r) { return r.id === "living-room"; });
      if (livingRoomObj) {
        livingRoomObj.guests = livingRoomObj.guests.filter(function (g) { return g.name !== "Natasha"; });
        $("#room-living-room .room-count-badge").text(livingRoomObj.guests.length + " guests");
      }
    });
  });

  // Case 20: Who took the cake?
  $("#btnCase20").on("click", function () {
    resetToInitial();
    clearHighlights();
    $(this).addClass("active");

    // Full 4-clue logical conjunction evaluated against the DOM:
    // 1. Downstairs: inside .floor-section[data-floor='1']
    // 2. Arrived after 21:00 and before 21:30 (strict interval)
    // 3. Has crumbs but no cup: :has(.item-crumbs):not(:has(.item-cup))
    // 4. Stood right next to an AITU student: .prev('.aitu').length > 0 || .next('.aitu').length > 0
    const chain = '$(".floor-section[data-floor=\'1\'] .guest-card")' +
      '.filter(":has(.item-crumbs):not(:has(.item-cup))")' +
      '.filter(function() { const t = $(this).attr("data-arrival"); return t > "21:00" && t < "21:30"; })' +
      '.filter(function() { return $(this).prev(".aitu").length > 0 || $(this).next(".aitu").length > 0; })';

    const $matches = $(".floor-section[data-floor='1'] .guest-card")
      .filter(":has(.item-crumbs):not(:has(.item-cup))")
      .filter(function () {
        const time = $(this).attr("data-arrival");
        return time > "21:00" && time < "21:30";
      })
      .filter(function () {
        return $(this).prev(".aitu").length > 0 || $(this).next(".aitu").length > 0;
      });

    $matches.addClass("highlighted");
    animateJump($matches);

    displayResult(
      20,
      "Who took the cake? (Downstairs, 21:00 < t < 21:30, crumbs & no cup, adjacent to AITU student)",
      chain,
      $matches,
      false,
      {
        countText: $matches.length + " thief identified",
        detailsHtml: "<strong>Thief Identified:</strong> <code>Timur</code> (Kitchen, Floor 1).<br>" +
          "<strong>Clue 1:</strong> Downstairs in Kitchen.<br>" +
          "<strong>Clue 2:</strong> Arrived at 21:05 (strictly between 21:00 and 21:30).<br>" +
          "<strong>Clue 3:</strong> Has cake crumbs and no cup.<br>" +
          "<strong>Clue 4:</strong> Stood immediately next to Emma, an AITU student."
      }
    );
  });

  // Reset Button Handler
  $("#btnResetParty").on("click", function () {
    resetToInitial();
    clearHighlights();
    const $banner = $("#resultBanner");
    $banner.removeClass("has-result");
    $("#resultCaseNum").text("Ready");
    $("#resultQuestion").text("Select any case above to begin detective investigation.");
    $("#resultChainCode").text("$('.guest-card')");
    $("#resultCount").text("0");
    $("#resultNames").text("No case executed yet.");
  });
});
