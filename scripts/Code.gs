function doGet(e) {
  var output = {
    countries: [],
    players: []
  };
  
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    
    // --- 1. Fetch Flags (Global helper) ---
    var countriesSheet = ss.getSheetByName("Countries");
    var flagMap = {};
    if (countriesSheet) {
      var countryData = countriesSheet.getDataRange().getValues();
      for (var i = 0; i < countryData.length; i++) {
        var cName = countryData[i][0];
        var cFlag = countryData[i][1];
        if (cName && typeof cName === 'string' && cName.toLowerCase() !== 'country') {
          flagMap[String(cName).trim()] = cFlag;
        }
      }
    }

    var foundCountries = false;
    var foundPlayers = false;
    var playersSheet = ss.getSheetByName("Player LB");

    // --- Strategy 1: Read Pre-calculated Leaderboards (Preferred) ---

    // A. Process Countries Sheet
    if (countriesSheet) {
      var data = countriesSheet.getDataRange().getValues();
      if (data.length > 1) {
        var headers = data[0].map(function(h) { return String(h).toLowerCase().trim(); });
        var cIdx = headers.indexOf("country");
        var sIdx = headers.indexOf("score");
        // We already built flagMap, but check if user has explicit flag col here too
        var fIdx = headers.indexOf("flag"); 
        
        if (cIdx > -1 && sIdx > -1) {
           var cList = [];
           for (var i = 1; i < data.length; i++) {
             var row = data[i];
             if (row[cIdx] === "" && row[sIdx] === "") continue; 
             var cNameVal = String(row[cIdx]).trim();
             // Use explicit flag col if exists, otherwise fallback to map
             var flagVal = (fIdx > -1 && row[fIdx]) ? row[fIdx] : (flagMap[cNameVal] || "");

             cList.push({
               rank: 0, 
               country: cNameVal,
               flag: flagVal, 
               score: Number(row[sIdx]) || 0
             });
           }
           cList.sort(function(a, b) { return b.score - a.score; });
           output.countries = cList.slice(0, 5).map(function(item, index) {
             item.rank = index + 1;
             return item;
           });
           foundCountries = true;
        }
      }
    }

    // B. Process Players Sheet
    if (playersSheet) {
      var data = playersSheet.getDataRange().getValues();
      if (data.length > 1) {
        var headers = data[0].map(function(h) { return String(h).toLowerCase().trim(); });
        var nIdx = headers.indexOf("name"); 
        if (nIdx === -1) nIdx = headers.indexOf("player name");
        var cIdx = headers.indexOf("country");
        var sIdx = headers.indexOf("score");
        
        if (nIdx > -1 && sIdx > -1) { 
           var pList = [];
           for (var i = 1; i < data.length; i++) {
             var row = data[i];
             if (row[nIdx] === "" && row[sIdx] === "") continue;
             var pNameVal = String(row[nIdx]);
             var cNameVal = cIdx > -1 ? String(row[cIdx]).trim() : "";
             
             pList.push({
               rank: 0,
               name: pNameVal,
               country: cNameVal,
               // Use global flagMap for player flags based on country
               flag: flagMap[cNameVal] || "", 
               score: Number(row[sIdx]) || 0
             });
           }
           pList.sort(function(a, b) { return b.score - a.score; });
           output.players = pList.slice(0, 5).map(function(item, index) {
             item.rank = index + 1;
             return item;
           });
           foundPlayers = true;
        }
      }
    }

    // --- Strategy 2: Fallback to Raw Computation (Form Responses) ---
    if (!foundCountries || !foundPlayers) {
        var rawSheet = ss.getSheetByName("Form Responses 1") || ss.getSheetByName("CleanData");
        if (rawSheet) {
          var data = rawSheet.getDataRange().getValues();
          var headers = data[0].map(function(h) { return String(h).toLowerCase().trim(); });
          
          var pIdx = headers.indexOf("player name");
          if (pIdx === -1) pIdx = headers.indexOf("name");
          var cIdx = headers.indexOf("country");
          var rIdx = headers.indexOf("result");
          if (rIdx === -1) rIdx = headers.indexOf("match result");
          if (rIdx === -1) rIdx = headers.indexOf("score");
          
          if (pIdx > -1 && cIdx > -1 && rIdx > -1) {
             var pScores = {};
             var cScores = {};
             
             for (var i = 1; i < data.length; i++) {
               var row = data[i];
               var pName = String(row[pIdx]).trim();
               var cName = String(row[cIdx]).trim();
               var result = String(row[rIdx]).toLowerCase().trim();
               
               if (!pName || !cName) continue;
               
               var points = 0;
               if (result.indexOf('win') > -1) points = 1;
               else if (result.indexOf('lose') > -1) points = -1;
               // Tie = 0
               
               // Aggregation
               if (!pScores[pName]) pScores[pName] = { name: pName, country: cName, score: 0 };
               pScores[pName].score += points;
               
               if (!cScores[cName]) cScores[cName] = 0;
               cScores[cName] += points;
             }
             
             if (!foundCountries) {
               var cList = [];
               for (var c in cScores) cList.push({ country: c, score: cScores[c], rank: 0, flag: flagMap[c] || "" });
               cList.sort(function(a, b) { return b.score - a.score; });
               output.countries = cList.slice(0, 5).map(function(item, index) { item.rank = index + 1; return item; });
             }
             
             if (!foundPlayers) {
               var pList = [];
               for (var p in pScores) pList.push({ name: pScores[p].name, country: pScores[p].country, score: pScores[p].score, rank: 0, flag: flagMap[pScores[p].country] || "" });
               pList.sort(function(a, b) { return b.score - a.score; });
               output.players = pList.slice(0, 5).map(function(item, index) { item.rank = index + 1; return item; });
             }
          }
        }
    }
    
  } catch (err) {
    output.error = err.toString();
  }
  
  return ContentService.createTextOutput(JSON.stringify(output))
    .setMimeType(ContentService.MimeType.JSON);
}
