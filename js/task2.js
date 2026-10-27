/**
 * Assignment 6: Task 2 - The Party in Motion
 * Author: Azamat Bukharbayev (IT-2510)
 * Description: Independent animated version of the party featuring:
 *   1. Spotlight & Clear via fadeTo()
 *   2. Expanding Guest Detail Card (growing/shrinking from avatar)
 *   3. Flying Guest Room Transfers (cross-house flight, closing/opening gaps)
 *   4. Animated Chronological Sorting (FLIP positional animation)
 *   5. Animation Queue & Parity Management under rapid clicks
 * STRICT RULES: jQuery is the ONLY JavaScript library. No CSS transitions/animations.
 */

$(document).ready(function () {
  "use strict";

  // =========================================================================
  // 1. INDEPENDENT RECONSTRUCTED DATA MODEL & STATE
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
          aituStudent: true,
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

  // Mutable live party state for Task 2
  let liveParty = JSON.parse(JSON.stringify(INITIAL_PARTY));

  // Sort tracking per room
  const roomSortState = {
    "balcony": { isSorted: false, originalOrder: [0, 1, 2, 3] },
    "hall": { isSorted: false, originalOrder: [0, 1, 2, 3, 4, 5] },
    "kitchen": { isSorted: false, originalOrder: [0, 1, 2, 3, 4, 5] },
    "living-room": { isSorted: false, originalOrder: [0, 1, 2, 3, 4] }
  };

  const ITEM_ICONS = {
    phone: { icon: "📱", label: "Phone", className: "item-phone" },
    glasses: { icon: "👓", label: "Glasses", className: "item-glasses" },
    bag: { icon: "👜", label: "Bag", className: "item-bag" },
    cup: { icon: "☕", label: "Cup", className: "item-cup" },
    crumbs: { icon: "🍰", label: "Cake crumbs", className: "item-crumbs" }
  };

  // =========================================================================
  // 2. DOM RENDERING HELPERS
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
        "role": "button",
        "aria-haspopup": "dialog",
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

  // Initial build of Task 2 page
  renderParty(liveParty);

  // =========================================================================
  // 3. EFFECT 1 — SPOTLIGHT & CLEAR (fadeTo)
  // =========================================================================
  function applySpotlight($matchedElements, isRoomQuery) {
    // Stop ongoing fades cleanly
    $(".guest-card").stop(true, false);
    $(".room").removeClass("highlighted");
    $(".guest-card").removeClass("highlighted");

    let $brightCards;
    if (isRoomQuery) {
      $matchedElements.addClass("highlighted");
      $brightCards = $matchedElements.find(".guest-card");
    } else {
      $matchedElements.addClass("highlighted");
      $brightCards = $matchedElements;
    }

    // Target guests: full opacity
    $brightCards.fadeTo(300, 1.0);

    // Non-target guests: fade to 20% opacity over 0.3 seconds
    $(".guest-card").not($brightCards).fadeTo(300, 0.2);
  }

  function clearSpotlight() {
    $(".guest-card").stop(true, false).fadeTo(300, 1.0);
    $(".highlighted").removeClass("highlighted");
    $(".room").removeClass("highlighted");
    $(".case-btn").removeClass("active");

    const $banner = $("#resultBanner");
    $banner.removeClass("has-result");
    $("#resultCaseNum").text("Ready");
    $("#resultQuestion").text("Select any case above to spotlight matching guests.");
    $("#resultChainCode").text("$('.guest-card')");
    $("#resultCount").text("0");
    $("#resultNames").text("All guests restored to full opacity.");
  }

  $("#btnClearSpotlight").on("click", function () {
    clearSpotlight();
  });

  // Display findings in the result banner
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
      $("#resultNames").html("<strong>Rooms spotlighted:</strong> " + (roomNames.length > 0 ? roomNames.join(", ") : "None"));
    } else {
      const count = $resultElements.length;
      $("#resultCount").text(count + " guest" + (count === 1 ? "" : "s"));
      const names = [];
      $resultElements.each(function () {
        names.push($(this).attr("data-name"));
      });
      $("#resultNames").html("<strong>Guests spotlighted:</strong> " + (names.length > 0 ? names.join(", ") : "None"));
    }
  }

  // =========================================================================
  // 4. TASK 2 CASE BUTTONS (Operating on Current Live State)
  // =========================================================================

  // Case 1: Who is in the hall?
  $("#btnCase1").on("click", function () {
    $(".case-btn").removeClass("active");
    $(this).addClass("active");

    const chain = '$("#room-hall .guest-card")';
    const $matches = $("#room-hall .guest-card");

    applySpotlight($matches, false);
    displayResult(1, "Who is in the hall?", chain, $matches, false);
  });

  // Case 2: Who is dressed in yellow or purple?
  $("#btnCase2").on("click", function () {
    $(".case-btn").removeClass("active");
    $(this).addClass("active");

    const chain = '$(".guest-card.yellow, .guest-card.purple")';
    const $matches = $(".guest-card.yellow, .guest-card.purple");

    applySpotlight($matches, false);
    displayResult(2, "Who is dressed in yellow or purple?", chain, $matches, false);
  });

  // Case 3: Which AITU students are upstairs?
  $("#btnCase3").on("click", function () {
    $(".case-btn").removeClass("active");
    $(this).addClass("active");

    const chain = '$(".floor-section[data-floor=\'2\'] .guest-card.aitu")';
    const $matches = $(".floor-section[data-floor='2'] .guest-card.aitu");

    applySpotlight($matches, false);
    displayResult(3, "Which AITU students are upstairs?", chain, $matches, false);
  });

  // Case 4: Who has glasses or a bag?
  $("#btnCase4").on("click", function () {
    $(".case-btn").removeClass("active");
    $(this).addClass("active");

    const chain = '$(".guest-card:has(.item-glasses), .guest-card:has(.item-bag)")';
    const $matches = $(".guest-card:has(.item-glasses), .guest-card:has(.item-bag)");

    applySpotlight($matches, false);
    displayResult(4, "Who has glasses or a bag?", chain, $matches, false);
  });

  // Case 5: Who came with nothing at all?
  $("#btnCase5").on("click", function () {
    $(".case-btn").removeClass("active");
    $(this).addClass("active");

    const chain = '$(".guest-card:not(:has(.item-icon))")';
    const $matches = $(".guest-card:not(:has(.item-icon))");

    applySpotlight($matches, false);
    displayResult(5, "Who came with nothing at all?", chain, $matches, false);
  });

  // Case 6: Who has a phone but no bag?
  $("#btnCase6").on("click", function () {
    $(".case-btn").removeClass("active");
    $(this).addClass("active");

    const chain = '$(".guest-card:has(.item-phone):not(:has(.item-bag))")';
    const $matches = $(".guest-card:has(.item-phone):not(:has(.item-bag))");

    applySpotlight($matches, false);
    displayResult(6, "Who has a phone but no bag?", chain, $matches, false);
  });

  // Case 7: Who arrived between 20:30 and 21:00, both times included?
  $("#btnCase7").on("click", function () {
    $(".case-btn").removeClass("active");
    $(this).addClass("active");

    const chain = '$(".guest-card").filter(function() { const t = $(this).attr("data-arrival"); return t >= "20:30" && t <= "21:00"; })';
    const $matches = $(".guest-card").filter(function () {
      const t = $(this).attr("data-arrival");
      return t >= "20:30" && t <= "21:00";
    });

    applySpotlight($matches, false);
    displayResult(7, "Who arrived between 20:30 and 21:00, both times included?", chain, $matches, false);
  });

  // Case 8: Who arrived after 21:00 and is not an AITU student?
  $("#btnCase8").on("click", function () {
    $(".case-btn").removeClass("active");
    $(this).addClass("active");

    const chain = '$(".guest-card:not(.aitu)").filter(function() { return $(this).attr("data-arrival") > "21:00"; })';
    const $matches = $(".guest-card:not(.aitu)").filter(function () {
      return $(this).attr("data-arrival") > "21:00";
    });

    applySpotlight($matches, false);
    displayResult(8, "Who arrived after 21:00 and is not an AITU student?", chain, $matches, false);
  });

  // Case 9: Who stands right next to Askar?
  $("#btnCase9").on("click", function () {
    $(".case-btn").removeClass("active");
    $(this).addClass("active");

    const chain = '$(".guest-card[data-name=\'Askar\']").prev(".guest-card").add($(".guest-card[data-name=\'Askar\']").next(".guest-card"))';
    const $askar = $(".guest-card[data-name='Askar']");
    const $matches = $askar.prev(".guest-card").add($askar.next(".guest-card"));

    applySpotlight($matches, false);
    displayResult(9, "Who stands right next to Askar?", chain, $matches, false);
  });

  // Case 10: Who stands last in each room?
  $("#btnCase10").on("click", function () {
    $(".case-btn").removeClass("active");
    $(this).addClass("active");

    const chain = '$(".room .guest-card:last-child")';
    const $matches = $(".room .guest-card:last-child");

    applySpotlight($matches, false);
    displayResult(10, "Who stands last in each room?", chain, $matches, false);
  });

  // Case 11: Who stands third in each room?
  $("#btnCase11").on("click", function () {
    $(".case-btn").removeClass("active");
    $(this).addClass("active");

    const chain = '$(".room .guest-card:nth-child(3)")';
    const $matches = $(".room .guest-card:nth-child(3)");

    applySpotlight($matches, false);
    displayResult(11, "Who stands third in each room?", chain, $matches, false);
  });

  // Case 12: Who stands after Timur in his room?
  $("#btnCase12").on("click", function () {
    $(".case-btn").removeClass("active");
    $(this).addClass("active");

    const chain = '$(".guest-card[data-name=\'Timur\']").nextAll(".guest-card")';
    const $matches = $(".guest-card[data-name='Timur']").nextAll(".guest-card");

    applySpotlight($matches, false);
    displayResult(12, "Who stands after Timur in his room?", chain, $matches, false);
  });

  // Case 13: Who stands right before someone in black?
  $("#btnCase13").on("click", function () {
    $(".case-btn").removeClass("active");
    $(this).addClass("active");

    const chain = '$(".guest-card.black").prev(".guest-card")';
    const $matches = $(".guest-card.black").prev(".guest-card");

    applySpotlight($matches, false);
    displayResult(13, "Who stands right before someone in black?", chain, $matches, false);
  });

  // Case 14: In which room is Aruzhan?
  $("#btnCase14").on("click", function () {
    $(".case-btn").removeClass("active");
    $(this).addClass("active");

    const chain = '$(".guest-card[data-name=\'Aruzhan\']").closest(".room")';
    const $room = $(".guest-card[data-name='Aruzhan']").closest(".room");

    applySpotlight($room, true);
    displayResult(14, "In which room is Aruzhan?", chain, $room, true);
  });

  // Case 15: Which rooms have fewer than 6 guests?
  $("#btnCase15").on("click", function () {
    $(".case-btn").removeClass("active");
    $(this).addClass("active");

    const chain = '$(".room").filter(function() { return $(this).find(".guest-card").length < 6; })';
    const $matches = $(".room").filter(function () {
      return $(this).find(".guest-card").length < 6;
    });

    applySpotlight($matches, true);
    displayResult(15, "Which rooms have fewer than 6 guests?", chain, $matches, true);
  });

  // Case 16: In which rooms does somebody have a cup, but nobody wears glasses?
  $("#btnCase16").on("click", function () {
    $(".case-btn").removeClass("active");
    $(this).addClass("active");

    const chain = '$(".room:has(.item-cup):not(:has(.item-glasses))")';
    const $matches = $(".room:has(.item-cup):not(:has(.item-glasses))");

    applySpotlight($matches, true);
    displayResult(16, "In which rooms does somebody have a cup, but nobody wears glasses?", chain, $matches, true);
  });

  // Case 17: Who came first to each room?
  $("#btnCase17").on("click", function () {
    $(".case-btn").removeClass("active");
    $(this).addClass("active");

    const chain = '$(".room").map(function() { ... })';
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
    applySpotlight($matches, false);
    displayResult(17, "Who came first to each room?", chain, $matches, false);
  });

  // Case 18: Miras joins Askar and Inkar
  $("#btnCase18").on("click", function () {
    $(".case-btn").removeClass("active");
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
    
    // Check if Miras already exists
    if ($(".guest-card[data-name='Miras']").length === 0) {
      const $mirasCard = createGuestCard(mirasGuest, "living-room", 1).hide();
      const $askar = $(".guest-card[data-name='Askar']");
      $mirasCard.insertAfter($askar);

      const livingRoomObj = liveParty.find(function (r) { return r.id === "living-room"; });
      if (livingRoomObj) {
        const askarIdx = livingRoomObj.guests.findIndex(function (g) { return g.name === "Askar"; });
        livingRoomObj.guests.splice(askarIdx + 1, 0, mirasGuest);
        $("#room-living-room .room-count-badge").text(livingRoomObj.guests.length + " guests");
      }

      $mirasCard.fadeIn(600, function () {
        applySpotlight($mirasCard, false);
      });
    } else {
      applySpotlight($(".guest-card[data-name='Miras']"), false);
    }

    displayResult(
      18,
      "Miras joins Askar and Inkar",
      chain,
      $(".guest-card[data-name='Miras']"),
      false,
      {
        countText: "1 guest added",
        detailsHtml: "<strong>Action:</strong> Miras arrived at 21:20, wearing blue with a phone and AITU badge. Inserted between Askar and Inkar in Living room via <code>fadeIn(600)</code>."
      }
    );
  });

  // Case 19: Natasha leaves the party
  $("#btnCase19").on("click", function () {
    $(".case-btn").removeClass("active");
    $(this).addClass("active");

    const chain = 'const natasha = $(".guest-card[data-name=\'Natasha\']"); natasha.fadeOut(600, function() { $(this).remove(); });';
    const $natasha = $(".guest-card[data-name='Natasha']");

    if ($natasha.length > 0) {
      $natasha.addClass("highlighted");
      displayResult(
        19,
        "Natasha leaves the party",
        chain,
        $natasha,
        false,
        {
          countText: "1 guest departed",
          detailsHtml: "<strong>Action:</strong> Natasha says goodbye. Card highlighted and animated out via <code>fadeOut(600)</code>, then safely removed from the DOM and live array."
        }
      );

      $natasha.fadeOut(600, function () {
        $(this).remove();
        const livingRoomObj = liveParty.find(function (r) { return r.id === "living-room"; });
        if (livingRoomObj) {
          livingRoomObj.guests = livingRoomObj.guests.filter(function (g) { return g.name !== "Natasha"; });
          $("#room-living-room .room-count-badge").text(livingRoomObj.guests.length + " guests");
        }
      });
    }
  });

  // Case 20: Who took the cake?
  $("#btnCase20").on("click", function () {
    $(".case-btn").removeClass("active");
    $(this).addClass("active");

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

    applySpotlight($matches, false);

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

  // =========================================================================
  // 5. EFFECT 2 — EXPANDING GUEST DETAIL CARD
  // =========================================================================
  let activeModalGuest = null;
  let isModalAnimating = false;

  function formatThingsText(things) {
    if (!things || things.length === 0) return "came with nothing at all";
    const mapped = things.map(function (t) {
      if (t === "phone") return "a phone";
      if (t === "glasses") return "glasses";
      if (t === "bag") return "a bag";
      if (t === "cup") return "a cup";
      if (t === "crumbs") return "cake crumbs";
      return t;
    });
    if (mapped.length === 1) return "has " + mapped[0];
    if (mapped.length === 2) return "has " + mapped[0] + " and " + mapped[1];
    return "has " + mapped.slice(0, -1).join(", ") + ", and " + mapped[mapped.length - 1];
  }

  function getRoomTitle(roomId) {
    const r = liveParty.find(function (room) { return room.id === roomId; });
    return r ? r.name : roomId;
  }

  function closeDetailModal(callback) {
    const $backdrop = $(".guest-modal-backdrop");
    const $card = $(".guest-detail-card");

    if ($card.length === 0) {
      if (callback) callback();
      return;
    }

    if (isModalAnimating) {
      // Force finish current animation if rapidly clicked
      $card.stop(true, true);
    }

    isModalAnimating = true;

    // Originating avatar target for shrinking back
    let targetOffset = { top: $(window).height() / 2, left: $(window).width() / 2 };
    if (activeModalGuest) {
      const $sourceCard = $("#" + activeModalGuest.id);
      if ($sourceCard.length > 0) {
        const $av = $sourceCard.find(".avatar-wrapper");
        if ($av.length > 0) {
          targetOffset = $av.offset();
        }
      }
    }

    // Shrink card back to avatar size and position
    $card.stop(true, false).animate({
      top: targetOffset.top,
      left: targetOffset.left,
      width: 48,
      height: 48,
      opacity: 0
    }, 240, function () {
      $backdrop.remove();
      $card.remove();
      isModalAnimating = false;
      activeModalGuest = null;
      if (callback) callback();
    });
  }

  function openDetailModal($guestCard) {
    // If already open, close old one first
    if ($(".guest-detail-card").length > 0) {
      closeDetailModal(function () {
        openDetailModal($guestCard);
      });
      return;
    }

    const guestId = $guestCard.attr("data-id");
    const guestName = $guestCard.attr("data-name");
    const clothingColor = $guestCard.attr("data-color");
    const arrivalTime = $guestCard.attr("data-arrival");
    const isAitu = $guestCard.attr("data-aitu") === "true";
    const currentRoomId = $guestCard.attr("data-room");
    const currentFloor = $guestCard.attr("data-floor");
    const rawThings = $guestCard.attr("data-things") || "";
    const thingsList = rawThings ? rawThings.split(",") : [];

    activeModalGuest = {
      id: guestId,
      name: guestName,
      clothingColor: clothingColor,
      currentRoomId: currentRoomId,
      sourceElem: $guestCard
    };

    // Calculate avatar initial origin
    const $avatar = $guestCard.find(".avatar-wrapper");
    const startOffset = $avatar.offset() || { top: 100, left: 100 };
    const startW = $avatar.outerWidth() || 48;
    const startH = $avatar.outerHeight() || 48;

    // Final centered modal target geometry
    const targetW = Math.min(360, $(window).width() - 40);
    const targetLeft = Math.max(20, ($(window).width() - targetW) / 2);
    const targetTop = Math.max(30, ($(window).height() - 440) / 2);

    // Create backdrop and card
    const $backdrop = $("<div></div>")
      .addClass("guest-modal-backdrop")
      .css("opacity", 0);

    const $modalCard = $("<div></div>")
      .addClass("guest-detail-card")
      .css({
        position: "fixed",
        top: startOffset.top - $(window).scrollTop(),
        left: startOffset.left - $(window).scrollLeft(),
        width: startW,
        height: startH,
        opacity: 0.2
      });

    // Close button
    const $closeBtn = $("<button></button>")
      .addClass("detail-close-btn")
      .attr("type", "button")
      .attr("aria-label", "Close detail card")
      .html("&times;")
      .on("click", function (e) {
        e.stopPropagation();
        closeDetailModal();
      });

    // Modal Header
    const $header = $("<div></div>").addClass("detail-header");
    const $avWrap = $("<div></div>")
      .addClass("detail-avatar-wrap")
      .addClass("ring-" + clothingColor);
    const $avImg = $("<img>")
      .addClass("detail-avatar-img")
      .attr("src", getAvatarUrl(guestName))
      .attr("alt", guestName);
    $avWrap.append($avImg);

    if (isAitu) {
      $avWrap.append($("<span class='aitu-badge' style='width:20px;height:20px;font-size:12px;'>🎓</span>"));
    }

    const $nameGroup = $("<div></div>").addClass("detail-name-group");
    $nameGroup.append($("<h3></h3>").text(guestName));
    $nameGroup.append(
      $("<div></div>")
        .addClass("detail-location-sub")
        .text("Location: " + getRoomTitle(currentRoomId) + " (Floor " + currentFloor + ")")
    );
    $header.append($avWrap, $nameGroup);

    // Descriptive sentences in clear words
    const $sentencesList = $("<ul></ul>").addClass("detail-sentences-list");
    $sentencesList.append(
      $("<li></li>").html("<span class='detail-bullet'>⏱️</span> Came at <strong>" + arrivalTime + "</strong>.")
    );
    $sentencesList.append(
      $("<li></li>").html(
        "<span class='detail-bullet'>🎓</span> " +
        (isAitu ? "<strong>AITU student</strong>." : "Not an AITU student.")
      )
    );
    $sentencesList.append(
      $("<li></li>").html(
        "<span class='detail-bullet'>🎒</span> " +
        (thingsList.length > 0 ? "Has <strong>" + formatThingsText(thingsList) + "</strong>." : "Came with <strong>nothing at all</strong>.")
      )
    );
    $sentencesList.append(
      $("<li></li>").html(
        "<span class='detail-bullet'>🎨</span> Wears <strong>" + clothingColor + "</strong>."
      )
    );
    $sentencesList.append(
      $("<li></li>").html(
        "<span class='detail-bullet'>📍</span> Currently in the <strong>" + getRoomTitle(currentRoomId) + "</strong> (Floor " + currentFloor + ")."
      )
    );

    // Move to other rooms action buttons
    const $actionsHeading = $("<div></div>")
      .addClass("detail-actions-heading")
      .text("Move to another room:");

    const $btnGrid = $("<div></div>").addClass("detail-move-buttons");
    const allRooms = [
      { id: "balcony", name: "Balcony" },
      { id: "hall", name: "Hall" },
      { id: "kitchen", name: "Kitchen" },
      { id: "living-room", name: "Living room" }
    ];

    allRooms.forEach(function (r) {
      if (r.id !== currentRoomId) {
        const $btn = $("<button></button>")
          .addClass("btn-move-room")
          .attr("type", "button")
          .text("Move to " + r.name)
          .on("click", function (e) {
            e.stopPropagation();
            moveGuestToRoom(guestId, currentRoomId, r.id);
          });
        $btnGrid.append($btn);
      }
    });

    $modalCard.append($closeBtn, $header, $sentencesList, $actionsHeading, $btnGrid);
    $("body").append($backdrop, $modalCard);

    // Animate growing outward from avatar
    isModalAnimating = true;
    $backdrop.stop(true, false).animate({ opacity: 1 }, 250);
    $modalCard.stop(true, false).animate({
      top: targetTop,
      left: targetLeft,
      width: targetW,
      opacity: 1
    }, 300, function () {
      $modalCard.css("height", "auto");
      isModalAnimating = false;
    });

    // Close on backdrop click (outside click)
    $backdrop.on("click", function (e) {
      if ($(e.target).hasClass("guest-modal-backdrop")) {
        closeDetailModal();
      }
    });
  }

  // Delegated click handler on guest cards
  $(document).on("click", ".guest-card", function (e) {
    e.stopPropagation();
    openDetailModal($(this));
  });

  // Keyboard accessibility: Escape key closes modal
  $(document).on("keydown", function (e) {
    if (e.key === "Escape" || e.keyCode === 27) {
      closeDetailModal();
    }
  });

  // =========================================================================
  // 6. EFFECT 3 — MOVE A GUEST BETWEEN ROOMS (Flying Animation)
  // =========================================================================
  let isMovingInProgress = false;

  function moveGuestToRoom(guestId, sourceRoomId, targetRoomId) {
    if (isMovingInProgress) return;
    isMovingInProgress = true;

    const $realCard = $("#" + guestId);
    const $sourceRoom = $("#room-" + sourceRoomId);
    const $targetRoom = $("#room-" + targetRoomId);
    const $targetList = $targetRoom.find(".guests-list");

    if ($realCard.length === 0 || $targetRoom.length === 0) {
      isMovingInProgress = false;
      return;
    }

    // Step 1: Close modal immediately before flight starts
    closeDetailModal();

    // Step 2: Create opening placeholder in destination room
    const $placeholder = $("<div></div>")
      .addClass("guest-card-placeholder")
      .css({ width: 0, margin: 0, opacity: 0 });
    $targetList.append($placeholder);

    // Animate space opening in target room
    $placeholder.stop(true, false).animate({
      width: "78px",
      margin: "0 4px",
      opacity: 0.6
    }, 280);

    // Step 3: Capture starting position & create flying clone
    const startPos = $realCard.offset();
    const $flyingClone = $realCard.clone()
      .removeAttr("id")
      .addClass("flying-guest-card")
      .css({
        position: "absolute",
        top: startPos.top,
        left: startPos.left,
        width: $realCard.outerWidth(),
        height: $realCard.outerHeight(),
        zIndex: 9999
      });

    $("body").append($flyingClone);

    // Hide original card and close gap in old room
    $realCard.css({ visibility: "hidden" });
    $realCard.stop(true, false).animate({
      width: 0,
      margin: 0,
      padding: 0
    }, 280);

    // Step 4: After space is prepared, animate flying clone across house
    setTimeout(function () {
      const destPos = $placeholder.offset();

      $flyingClone.stop(true, false).animate({
        top: destPos.top,
        left: destPos.left
      }, 500, function () {
        // Step 5: Transfer completion
        $flyingClone.remove();
        $placeholder.remove();

        // Move real element in DOM
        $realCard
          .css({
            visibility: "visible",
            width: "",
            margin: "",
            padding: ""
          })
          .attr("data-room", targetRoomId)
          .attr("data-floor", $targetRoom.attr("data-floor"));

        $targetList.append($realCard);

        // Update live data arrays
        const srcObj = liveParty.find(function (r) { return r.id === sourceRoomId; });
        const dstObj = liveParty.find(function (r) { return r.id === targetRoomId; });

        if (srcObj && dstObj) {
          const guestIdx = srcObj.guests.findIndex(function (g) { return g.id === guestId; });
          if (guestIdx !== -1) {
            const guestData = srcObj.guests.splice(guestIdx, 1)[0];
            dstObj.guests.push(guestData);

            $sourceRoom.find(".room-count-badge").text(srcObj.guests.length + " guests");
            $targetRoom.find(".room-count-badge").text(dstObj.guests.length + " guests");
          }
        }

        // Pulse highlight to confirm arrival
        $realCard.stop(true, true)
          .animate({ top: "-10px" }, 140)
          .animate({ top: "0px" }, 140);

        isMovingInProgress = false;
      });
    }, 200);
  }

  // =========================================================================
  // 7. EFFECT 4 — SORT BY ARRIVAL TIME (Positional FLIP Animation)
  // =========================================================================
  function sortRoomByTime(roomId) {
    const $room = $("#room-" + roomId);
    const $list = $room.find(".guests-list");
    const $cards = $list.find(".guest-card");
    const state = roomSortState[roomId];

    if ($cards.length <= 1) return;

    // Capture initial positions before reordering (FLIP: First)
    const initialPositions = [];
    $cards.each(function () {
      initialPositions.push({
        elem: this,
        offset: $(this).offset()
      });
    });

    // Toggle target state
    state.isSorted = !state.isSorted;

    // Sort or revert DOM cards
    const sortedCards = $cards.toArray().sort(function (a, b) {
      if (state.isSorted) {
        // Chronological order: earliest arrival first
        const timeA = $(a).attr("data-arrival");
        const timeB = $(b).attr("data-arrival");
        return timeA.localeCompare(timeB);
      } else {
        // Original picture order
        const orderA = parseInt($(a).attr("data-original-order") || "0", 10);
        const orderB = parseInt($(b).attr("data-original-order") || "0", 10);
        return orderA - orderB;
      }
    });

    // Detach and re-append in new order (FLIP: Last)
    $list.append(sortedCards);

    // Update room button state
    const $sortBtn = $room.find(".btn-sort-room");
    if (state.isSorted) {
      $sortBtn.addClass("is-sorted").html("⏱️ Sorted (Click to restore)");
    } else {
      $sortBtn.removeClass("is-sorted").html("⏱️ Sort by time");
    }

    // Apply FLIP inversion and animate to final places
    sortedCards.forEach(function (card) {
      const $c = $(card);
      const oldItem = initialPositions.find(function (p) { return p.elem === card; });
      if (oldItem) {
        const newOffset = $c.offset();
        const deltaX = oldItem.offset.left - newOffset.left;
        const deltaY = oldItem.offset.top - newOffset.top;

        // Invert
        $c.stop(true, false).css({
          position: "relative",
          left: deltaX,
          top: deltaY
        });

        // Play: animate back to natural layout position
        $c.animate({
          left: 0,
          top: 0
        }, 380, function () {
          $c.css({ position: "", left: "", top: "" });
        });
      }
    });

    // Synchronize underlying room guest array
    const roomObj = liveParty.find(function (r) { return r.id === roomId; });
    if (roomObj) {
      roomObj.guests.sort(function (a, b) {
        if (state.isSorted) {
          return a.arrivalTime.localeCompare(b.arrivalTime);
        } else {
          return a.originalOrder - b.originalOrder;
        }
      });
    }
  }

  // Bind Sort Buttons with fast-click queue control
  $(".btn-sort-room").on("click", function (e) {
    e.stopPropagation();
    const roomId = $(this).attr("data-room");
    sortRoomByTime(roomId);
  });

  // =========================================================================
  // 8. RESET PARTY BUTTON
  // =========================================================================
  $("#btnResetParty").on("click", function () {
    closeDetailModal();
    clearSpotlight();

    // Reconstruct clean initial data copy
    liveParty = JSON.parse(JSON.stringify(INITIAL_PARTY));
    Object.keys(roomSortState).forEach(function (k) {
      roomSortState[k].isSorted = false;
    });
    $(".btn-sort-room").removeClass("is-sorted").html("⏱️ Sort by time");
    renderParty(liveParty);
  });
});
