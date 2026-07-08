// Firebase SDKs are loaded from the HTML pages via <script> tags (compat builds).
// Do NOT use ES module imports here because pages load the compat SDKs.

// Datos principales: equipos, grupos, fechas y partidos.
// Este archivo contiene la "base de datos" estática en JS.

const DB = {
  participants: ["Nahuel","Lauti","Naty"],
  // Fechas únicas para timeline (YYYY-MM-DD) — del jue 11/06/2026 al dom 19/07/2026
  days: [
    "2026-06-11","2026-06-12","2026-06-13","2026-06-14","2026-06-15","2026-06-16","2026-06-17","2026-06-18","2026-06-19",
    "2026-06-20","2026-06-21","2026-06-22","2026-06-23","2026-06-24","2026-06-25","2026-06-26","2026-06-27","2026-06-28",
    "2026-06-29","2026-06-30","2026-07-01","2026-07-02","2026-07-03","2026-07-04","2026-07-05","2026-07-06","2026-07-07",
    "2026-07-08","2026-07-09","2026-07-10","2026-07-11","2026-07-12","2026-07-13","2026-07-14","2026-07-15","2026-07-16",
    "2026-07-17","2026-07-18","2026-07-19"
  ],
  // Equipos y grupos (ejemplo reducido). Puedes ampliar con todos los equipos.
  groups: {
    A: ["Qatar","Ecuador","Senegal","Países Bajos"],
    B: ["Inglaterra","Irán","EEUU","Gales"]
  },
  // Mapa de nombres en español para mostrar en la UI
  nameMap: {
    "Mexico": "México",
    "South Africa": "Sudáfrica",
    "Korea Republic": "Corea del Sur",
    "Czechia": "República Checa",
    "Canada": "Canadá",
    "Bosnia & Herzegovina": "Bosnia y Herzegovina",
    "USA": "EEUU",
    "Qatar": "Qatar",
    "Switzerland": "Suiza",
    "Brazil": "Brasil",
    "Morocco": "Marruecos",
    "Haiti": "Haití",
    "Scotland": "Escocia",
    "Australia": "Australia",
    "Türkiye": "Turquía",
    "Germany": "Alemania",
    "Curaçao": "Curazao",
    "Netherlands": "Países Bajos",
    "Japan": "Japón",
    "Côte d'Ivoire": "Costa de Marfil",
    "Ecuador": "Ecuador",
    "Sweden": "Suecia",
    "Tunisia": "Túnez",
    "Spain": "España",
    "Cabo Verde": "Cabo Verde",
    "Belgium": "Bélgica",
    "Egypt": "Egipto",
    "Saudi Arabia": "Arabia Saudita",
    "Uruguay": "Uruguay",
    "IR Iran": "Irán",
    "New Zealand": "Nueva Zelanda",
    "France": "Francia",
    "Senegal": "Senegal",
    "Iraq": "Irak",
    "Norway": "Noruega",
    "Argentina": "Argentina",
    "Algeria": "Argelia",
    "Austria": "Austria",
    "Jordan": "Jordania",
    "Portugal": "Portugal",
    "Congo DR": "RD Congo",
    "England": "Inglaterra",
    "Croatia": "Croacia",
    "Ghana": "Ghana",
    "Panama": "Panamá",
    "Uzbekistan": "Uzbekistán",
    "Colombia": "Colombia",
    "Tunisia": "Túnez",
    "Curaçao": "Curazao",
    "Czechia": "República Checa",
    "South Africa": "Sudáfrica",
    "Haiti": "Haití",
    "Paraguay": "Paraguay",
    "Noruega": "Noruega"
  },
  // Partidos importados desde el calendario ICS (UTC times en startUtc). Preds vacíos y scores nulos.
  matches: [
    // 11 de Junio
    {id:1, startUtc:"2026-06-11T19:00:00Z", teamA:"Mexico", teamB:"South Africa", scoreA:null, scoreB:null, preds:{}},
    {id:2, startUtc:"2026-06-12T02:00:00Z", teamA:"Korea Republic", teamB:"Czechia", scoreA:null, scoreB:null, preds:{}},
    // 12 de Junio
    {id:3, startUtc:"2026-06-12T19:00:00Z", teamA:"Canada", teamB:"Bosnia & Herzegovina", scoreA:null, scoreB:null, preds:{}},
    {id:4, startUtc:"2026-06-13T01:00:00Z", teamA:"USA", teamB:"Paraguay", scoreA:4, scoreB:1, preds:{
      "Nahuel": {a:2, b:2},
      "Lauti":  {a:1, b:1},
      "Naty":   {a:2, b:1}
    }},
    // 13 de Junio
    {id:5, startUtc:"2026-06-13T19:00:00Z", teamA:"Qatar", teamB:"Switzerland", scoreA:1, scoreB:1, preds:{
      "Nahuel": {a:3, b:0},
      "Lauti":  {a:0, b:0},
      "Naty":   {a:1, b:3}
    }},
    {id:6, startUtc:"2026-06-13T22:00:00Z", teamA:"Brazil", teamB:"Morocco", scoreA:1, scoreB:1, preds:{
      "Nahuel": {a:2, b:1},
      "Lauti":  {a:4, b:3},
      "Naty":   {a:4, b:0}
    }},
    {id:7, startUtc:"2026-06-14T01:00:00Z", teamA:"Haiti", teamB:"Scotland", scoreA:0, scoreB:1, preds:{
      "Nahuel": {a:0, b:2},
      "Lauti":  {a:1, b:1},
      "Naty":   {a:1, b:1}
    }},
    // 14 de Junio
    {id:8, startUtc:"2026-06-14T04:00:00Z", teamA:"Australia", teamB:"Türkiye", scoreA:2, scoreB:0, preds:{
      "Nahuel": {a:3, b:1},
      "Lauti":  {a:3, b:4},
      "Naty":   {a:1, b:1}
    }},
    {id:9, startUtc:"2026-06-14T17:00:00Z", teamA:"Germany", teamB:"Curaçao", scoreA:7, scoreB:1, preds:{
      "Nahuel": {a:6, b:0},
      "Lauti":  {a:5, b:2},
      "Naty":   {a:4, b:0}
    }},
    {id:10, startUtc:"2026-06-14T20:00:00Z", teamA:"Netherlands", teamB:"Japan", scoreA:2, scoreB:2, preds:{
      "Nahuel": {a:2, b:1},
      "Lauti":  {a:1, b:3},
      "Naty":   {a:2, b:2}
    }},
    {id:11, startUtc:"2026-06-14T23:00:00Z", teamA:"Côte d'Ivoire", teamB:"Ecuador", scoreA:1, scoreB:0, preds:{
      "Nahuel": {a:2, b:2},
      "Lauti":  {a:1, b:2},
      "Naty":   {a:1, b:2}
    }},
    {id:12, startUtc:"2026-06-15T02:00:00Z", teamA:"Sweden", teamB:"Tunisia", scoreA:5, scoreB:1, preds:{
      "Nahuel": {a:4, b:2},
      "Lauti":  {a:3, b:2},
      "Naty":   {a:3, b:0}
    }},
    // 15 de Junio  
    {id:13, startUtc:"2026-06-15T16:00:00Z", teamA:"Spain", teamB:"Cabo Verde", scoreA:0, scoreB:0, preds:{
      "Nahuel": {a:5, b:0},
      "Lauti":  {a:5, b:1},
      "Naty":   {a:3, b:0}
    }},
    {id:14, startUtc:"2026-06-15T19:00:00Z", teamA:"Belgium", teamB:"Egypt", scoreA:1, scoreB:1, preds:{
      "Nahuel": {a:1, b:2},
      "Lauti":  {a:2, b:2},
      "Naty":   {a:1, b:1}
    }},
    {id:15, startUtc:"2026-06-15T22:00:00Z", teamA:"Saudi Arabia", teamB:"Uruguay", scoreA:1, scoreB:1, preds:{
      "Nahuel": {a:1, b:1},
      "Lauti":  {a:0, b:1},
      "Naty":   {a:1, b:2}
    }},
    {id:16, startUtc:"2026-06-16T01:00:00Z", teamA:"IR Iran", teamB:"New Zealand", scoreA:2, scoreB:2, preds:{
      "Nahuel": {a:2, b:0},
      "Lauti":  {a:2, b:3},
      "Naty":   {a:1, b:2}
    }},
    // 16 de Junio
    {id:17, startUtc:"2026-06-16T19:00:00Z", teamA:"France", teamB:"Senegal", scoreA:3, scoreB:1, preds:{
      "Nahuel": {a:3, b:2},
      "Lauti":  {a:5, b:2},
      "Naty":   {a:2, b:2}
    }},
    {id:18, startUtc:"2026-06-16T22:00:00Z", teamA:"Iraq", teamB:"Norway", scoreA:1, scoreB:4, preds:{
      "Nahuel": {a:0, b:0},
      "Lauti":  {a:1, b:3},
      "Naty":   {a:1, b:1}
    }},
    {id:19, startUtc:"2026-06-17T01:00:00Z", teamA:"Argentina", teamB:"Algeria", scoreA:3, scoreB:0, preds:{
      "Nahuel": {a:2, b:0},
      "Lauti":  {a:1, b:0},
      "Naty":   {a:2, b:0}
    }},
    // 17 de Junio
    {id:20, startUtc:"2026-06-17T04:00:00Z", teamA:"Austria", teamB:"Jordan", scoreA:3, scoreB:1, preds:{
      "Nahuel": {a:1, b:0},
      "Lauti":  {a:1, b:1},
      "Naty":   {a:1, b:0}
    }},
    {id:21, startUtc:"2026-06-17T17:00:00Z", teamA:"Portugal", teamB:"Congo DR", scoreA:1, scoreB:1, preds:{
      "Nahuel": {a:4, b:2},
      "Lauti":  {a:4, b:2},
      "Naty":   {a:2, b:0}
    }},
    {id:22, startUtc:"2026-06-17T20:00:00Z", teamA:"England", teamB:"Croatia", scoreA:4, scoreB:2, preds:{
      "Nahuel": {a:3, b:1},
      "Lauti":  {a:2, b:3},
      "Naty":   {a:2, b:2}
    }},
    {id:23, startUtc:"2026-06-17T23:00:00Z", teamA:"Ghana", teamB:"Panama", scoreA:1, scoreB:0, preds:{
      "Nahuel": {a:3, b:1},
      "Lauti":  {a:1, b:1},
      "Naty":   {a:0, b:1}
    }},
    {id:24, startUtc:"2026-06-18T02:00:00Z", teamA:"Uzbekistan", teamB:"Colombia", scoreA:1, scoreB:3, preds:{
      "Nahuel": {a:0, b:3},
      "Lauti":  {a:2, b:1},
      "Naty":   {a:0, b:2}
    }},
    // 18 de Junio
    {id:25, startUtc:"2026-06-18T16:00:00Z", teamA:"Czechia", teamB:"South Africa", scoreA:1, scoreB:1, preds:{
      "Nahuel": {a:1, b:2},
      "Lauti":  {a:1, b:2},
      "Naty":   {a:1, b:1}
    }},
    {id:26, startUtc:"2026-06-18T19:00:00Z", teamA:"Switzerland", teamB:"Bosnia & Herzegovina", scoreA:4, scoreB:1, preds:{
      "Nahuel": {a:3, b:0},
      "Lauti":  {a:0, b:0},
      "Naty":   {a:3, b:0}
    }},
    {id:27, startUtc:"2026-06-18T22:00:00Z", teamA:"Canada", teamB:"Qatar", scoreA:6, scoreB:0, preds:{
      "Nahuel": {a:2, b:1},
      "Lauti":  {a:1, b:0},
      "Naty":   {a:2, b:1}
    }},
    {id:28, startUtc:"2026-06-19T01:00:00Z", teamA:"Mexico", teamB:"Korea Republic", scoreA:1, scoreB:0, preds:{
      "Nahuel": {a:3, b:3},
      "Lauti":  {a:1, b:2},
      "Naty":   {a:2, b:2}
    }},
    // 19 de Junio
    {id:29, startUtc:"2026-06-19T19:00:00Z", teamA:"USA", teamB:"Australia", scoreA:2, scoreB:0, preds:{
      "Nahuel": {a:3, b:2},
      "Lauti":  {a:2, b:1},
      "Naty":   {a:2, b:1}
    }},
    {id:30, startUtc:"2026-06-19T22:00:00Z", teamA:"Scotland", teamB:"Morocco", scoreA:0, scoreB:1, preds:{
      "Nahuel": {a:1, b:2},
      "Lauti":  {a:1, b:2},
      "Naty":   {a:1, b:1}
    }},
    {id:31, startUtc:"2026-06-20T00:30:00Z", teamA:"Brazil", teamB:"Haiti", scoreA:3, scoreB:0, preds:{
      "Nahuel": {a:5, b:0},
      "Lauti":  {a:7, b:1},
      "Naty":   {a:2, b:0}
    }},
    // 20 de Junio
    {id:32, startUtc:"2026-06-20T04:00:00Z", teamA:"Türkiye", teamB:"Paraguay", scoreA:0, scoreB:1, preds:{
      "Nahuel": {a:1, b:1},
      "Lauti":  {a:2, b:1},
      "Naty":   {a:0, b:1}
    }},
    {id:33, startUtc:"2026-06-20T17:00:00Z", teamA:"Netherlands", teamB:"Sweden", scoreA:5, scoreB:1, preds:{
      "Nahuel": {a:3, b:2},
      "Lauti":  {a:3, b:2},
      "Naty":   {a:2, b:3}
    }},
    {id:34, startUtc:"2026-06-20T20:00:00Z", teamA:"Germany", teamB:"Côte d'Ivoire", scoreA:2, scoreB:1, preds:{
      "Nahuel": {a:3, b:2},
      "Lauti":  {a:6, b:1},
      "Naty":   {a:4, b:1}
    }},
    {id:35, startUtc:"2026-06-21T00:00:00Z", teamA:"Ecuador", teamB:"Curaçao", scoreA:0, scoreB:0, preds:{
      "Nahuel": {a:3, b:0},
      "Lauti":  {a:2, b:0},
      "Naty":   {a:1, b:0}
    }},
    // 21 de Junio
    {id:36, startUtc:"2026-06-21T04:00:00Z", teamA:"Tunisia", teamB:"Japan", scoreA:0, scoreB:4, preds:{
      "Nahuel": {a:0, b:2},
      "Lauti":  {a:2, b:3},
      "Naty":   {a:0, b:2}
    }},
    {id:37, startUtc:"2026-06-21T16:00:00Z", teamA:"Spain", teamB:"Saudi Arabia", scoreA:4, scoreB:0, preds:{
      "Nahuel": {a:4, b:1},
      "Lauti":  {a:5, b:2},
      "Naty":   {a:2, b:1}
    }},
    {id:38, startUtc:"2026-06-21T19:00:00Z", teamA:"Belgium", teamB:"IR Iran", scoreA:0, scoreB:0, preds:{
      "Nahuel": {a:2, b:1},
      "Lauti":  {a:2, b:1},
      "Naty":   {a:1, b:1}
    }},
    {id:39, startUtc:"2026-06-21T22:00:00Z", teamA:"Uruguay", teamB:"Cabo Verde", scoreA:2, scoreB:2, preds:{
      "Nahuel": {a:3, b:0},
      "Lauti":  {a:4, b:2},
      "Naty":   {a:1, b:0}
    }},
    {id:40, startUtc:"2026-06-22T01:00:00Z", teamA:"New Zealand", teamB:"Egypt", scoreA:1, scoreB:3, preds:{
      "Nahuel": {a:1, b:0},
      "Lauti":  {a:2, b:3},
      "Naty":   {a:2, b:1}
    }},
    // 22 de Junio
    {id:41, startUtc:"2026-06-22T17:00:00Z", teamA:"Argentina", teamB:"Austria", scoreA:2, scoreB:0, preds:{
      "Nahuel": {a:2, b:1},
      "Lauti":  {a:2, b:1},
      "Naty":   {a:3, b:1}
    }},
    {id:42, startUtc:"2026-06-22T21:00:00Z", teamA:"France", teamB:"Iraq", scoreA:3, scoreB:0, preds:{
      "Nahuel": {a:5, b:1},
      "Lauti":  {a:7, b:1},
      "Naty":   {a:3, b:1}
    }},
    {id:43, startUtc:"2026-06-23T00:00:00Z", teamA:"Norway", teamB:"Senegal", scoreA:3, scoreB:2, preds:{
      "Nahuel": {a:0, b:2},
      "Lauti":  {a:3, b:1},
      "Naty":   {a:3, b:1}
    }},
    // 23 de Junio
    {id:44, startUtc:"2026-06-23T03:00:00Z", teamA:"Jordan", teamB:"Algeria", scoreA:1, scoreB:2, preds:{
      "Nahuel": {a:2, b:2},
      "Lauti":  {a:0, b:0},
      "Naty":   {a:0, b:0}
    }},
    {id:45, startUtc:"2026-06-23T17:00:00Z", teamA:"Portugal", teamB:"Uzbekistan", scoreA:5, scoreB:0, preds:{
      "Nahuel": {a:4, b:0},
      "Lauti":  {a:7, b:3},
      "Naty":   {a:1, b:0}
    }},
    {id:46, startUtc:"2026-06-23T20:00:00Z", teamA:"England", teamB:"Ghana", scoreA:0, scoreB:0, preds:{
      "Nahuel": {a:3, b:0},
      "Lauti":  {a:7, b:1},
      "Naty":   {a:3, b:1}
    }},
    {id:47, startUtc:"2026-06-23T23:00:00Z", teamA:"Panama", teamB:"Croatia", scoreA:0, scoreB:1, preds:{
      "Nahuel": {a:2, b:3},
      "Lauti":  {a:2, b:3},
      "Naty":   {a:0, b:2}
    }},
    {id:48, startUtc:"2026-06-24T02:00:00Z", teamA:"Colombia", teamB:"Congo DR", scoreA:1, scoreB:0, preds:{
      "Nahuel": {a:3, b:0},
      "Lauti":  {a:2, b:1},
      "Naty":   {a:2, b:1}
    }},
    {id:49, startUtc:"2026-06-24T19:00:00Z", teamA:"Switzerland", teamB:"Canada", scoreA:2, scoreB:1, preds:{
      "Nahuel": {a:2, b:0},
      "Lauti":  {a:1, b:2},
      "Naty":   {a:2, b:2}
    }},
    {id:50, startUtc:"2026-06-24T19:00:00Z", teamA:"Bosnia & Herzegovina", teamB:"Qatar", scoreA:3, scoreB:1, preds:{
      "Nahuel": {a:2, b:0},
      "Lauti":  {a:1, b:0},
      "Naty":   {a:1, b:1}
    }},
    {id:51, startUtc:"2026-06-24T22:00:00Z", teamA:"Scotland", teamB:"Brazil", scoreA:0, scoreB:3, preds:{
      "Nahuel": {a:1, b:3},
      "Lauti":  {a:1, b:2},
      "Naty":   {a:1, b:3}
    }},
    {id:52, startUtc:"2026-06-24T22:00:00Z", teamA:"Morocco", teamB:"Haiti", scoreA:4, scoreB:2, preds:{
      "Nahuel": {a:4, b:0},
      "Lauti":  {a:2, b:0},
      "Naty":   {a:1, b:0}
    }},
    {id:53, startUtc:"2026-06-25T01:00:00Z", teamA:"Czechia", teamB:"Mexico", scoreA:0, scoreB:3, preds:{
      "Nahuel": {a:2, b:2},
      "Lauti":  {a:0, b:2},
      "Naty":   {a:1, b:3}
    }},
    {id:54, startUtc:"2026-06-25T01:00:00Z", teamA:"South Africa", teamB:"Korea Republic", scoreA:1, scoreB:0, preds:{
      "Nahuel": {a:2, b:1},
      "Lauti":  {a:0, b:2},
      "Naty":   {a:1, b:3}
    }},
    {id:55, startUtc:"2026-06-25T20:00:00Z", teamA:"Curaçao", teamB:"Côte d'Ivoire", scoreA:0, scoreB:2, preds:{
      "Nahuel": {a:0, b:3},
      "Lauti":  {a:0, b:1},
      "Naty":   {a:1, b:1}
    }},
    {id:56, startUtc:"2026-06-25T20:00:00Z", teamA:"Ecuador", teamB:"Germany", scoreA:2, scoreB:1, preds:{
      "Nahuel": {a:1, b:4},
      "Lauti":  {a:2, b:3},
      "Naty":   {a:0, b:4}
    }},
    {id:57, startUtc:"2026-06-25T23:00:00Z", teamA:"Japan", teamB:"Sweden", scoreA:1, scoreB:1, preds:{
      "Nahuel": {a:2, b:0},
      "Lauti":  {a:1, b:0},
      "Naty":   {a:3, b:2}
    }},
    {id:58, startUtc:"2026-06-25T23:00:00Z", teamA:"Tunisia", teamB:"Netherlands", scoreA:1, scoreB:3, preds:{
      "Nahuel": {a:0, b:4},
      "Lauti":  {a:0, b:2},
      "Naty":   {a:0, b:3}
    }},
    {id:59, startUtc:"2026-06-26T02:00:00Z", teamA:"Türkiye", teamB:"USA", scoreA:3, scoreB:2, preds:{
      "Nahuel": {a:1, b:3},
      "Lauti":  {a:1, b:1},
      "Naty":   {a:0, b:3}
    }},
    {id:60, startUtc:"2026-06-26T02:00:00Z", teamA:"Paraguay", teamB:"Australia", scoreA:0, scoreB:0, preds:{
      "Nahuel": {a:1, b:3},
      "Lauti":  {a:0, b:0},
      "Naty":   {a:1, b:1}
    }},
    {id:61, startUtc:"2026-06-26T19:00:00Z", teamA:"Norway", teamB:"France", scoreA:1, scoreB:4, preds:{
      "Nahuel": {a:1, b:3},
      "Lauti":  {a:1, b:2},
      "Naty":   {a:3, b:3}
    }},
    {id:62, startUtc:"2026-06-26T19:00:00Z", teamA:"Senegal", teamB:"Iraq", scoreA:5, scoreB:0, preds:{
      "Nahuel": {a:0, b:0},
      "Lauti":  {a:1, b:0},
      "Naty":   {a:1, b:1}
    }},
    {id:63, startUtc:"2026-06-27T00:00:00Z", teamA:"Cabo Verde", teamB:"Saudi Arabia", scoreA:0, scoreB:0, preds:{
      "Nahuel": {a:1, b:3},
      "Lauti":  {a:1, b:2},
      "Naty":   {a:2, b:1}
    }},
    {id:64, startUtc:"2026-06-27T00:00:00Z", teamA:"Uruguay", teamB:"Spain", scoreA:0, scoreB:1, preds:{
      "Nahuel": {a:1, b:2},
      "Lauti":  {a:1, b:1},
      "Naty":   {a:2, b:2}
    }},
    {id:65, startUtc:"2026-06-27T03:00:00Z", teamA:"Egypt", teamB:"IR Iran", scoreA:1, scoreB:1, preds:{
      "Nahuel": {a:1, b:1},
      "Lauti":  {a:1, b:0},
      "Naty":   {a:2, b:1}
    }},
    {id:66, startUtc:"2026-06-27T03:00:00Z", teamA:"New Zealand", teamB:"Belgium", scoreA:1, scoreB:5, preds:{
      "Nahuel": {a:2, b:3},
      "Lauti":  {a:1, b:2},
      "Naty":   {a:2, b:1}
    }},
    {id:67, startUtc:"2026-06-27T21:00:00Z", teamA:"Panama", teamB:"England", scoreA:0, scoreB:2, preds:{
      "Nahuel": {a:0, b:2},
      "Lauti":  {a:0, b:1},
      "Naty":   {a:0, b:2}
    }},
    {id:68, startUtc:"2026-06-27T21:00:00Z", teamA:"Croatia", teamB:"Ghana", scoreA:2, scoreB:1, preds:{
      "Nahuel": {a:2, b:2},
      "Lauti":  {a:3, b:0},
      "Naty":   {a:2, b:0}
    }},
    {id:69, startUtc:"2026-06-27T23:30:00Z", teamA:"Colombia", teamB:"Portugal", scoreA:0, scoreB:0, preds:{
      "Nahuel": {a:1, b:2},
      "Lauti":  {a:1, b:2},
      "Naty":   {a:2, b:3}
    }},
    {id:70, startUtc:"2026-06-27T23:30:00Z", teamA:"Congo DR", teamB:"Uzbekistan", scoreA:3, scoreB:1, preds:{
      "Nahuel": {a:2, b:1},
      "Lauti":  {a:1, b:1},
      "Naty":   {a:1, b:1}
    }},
    {id:71, startUtc:"2026-06-28T02:00:00Z", teamA:"Algeria", teamB:"Austria", scoreA:3, scoreB:3, preds:{
      "Nahuel": {a:2, b:2},
      "Lauti":  {a:1, b:2},
      "Naty":   {a:1, b:2}
    }},
    {id:72, startUtc:"2026-06-28T02:00:00Z", teamA:"Jordan", teamB:"Argentina", scoreA:1, scoreB:3, preds:{
      "Nahuel": {a:0, b:2},
      "Lauti":  {a:0, b:3},
      "Naty":   {a:1, b:3}
    }},


    // Eliminatorias de 32


    {id:73, startUtc:"2026-06-28T19:00:00Z", teamA:"South Africa", teamB:"Canada", scoreA:0, scoreB:1, preds:{
      "Nahuel": {a:3, b:1},
      "Lauti":  {a:1, b:3},
      "Naty":   {a:1, b:4}
    }},
    {id:74, startUtc:"2026-06-29T17:00:00Z", teamA:"Brazil", teamB:"Japan", scoreA:2, scoreB:1, preds:{
      "Nahuel": {a:3, b:2},
      "Lauti":  {a:5, b:3},
      "Naty":   {a:2, b:2}
    }},
    {id:75, startUtc:"2026-06-29T20:30:00Z", teamA:"Germany", teamB:"Paraguay", scoreA:1, scoreB:1, preds:{
      "Nahuel": {a:3, b:0},
      "Lauti":  {a:4, b:1},
      "Naty":   {a:2, b:1}
    }},
    {id:76, startUtc:"2026-06-30T01:00:00Z", teamA:"Netherlands", teamB:"Morocco", scoreA:1, scoreB:1, preds:{
      "Nahuel": {a:1, b:1},
      "Lauti":  {a:2, b:1},
      "Naty":   {a:2, b:2}
    }},
    {id:77, startUtc:"2026-06-30T17:00:00Z", teamA:"Côte d'Ivoire", teamB:"Norway", scoreA:1, scoreB:2, preds:{
      "Nahuel": {a:1, b:1},
      "Lauti":  {a:0, b:3},
      "Naty":   {a:2, b:2}
    }},
    {id:78, startUtc:"2026-06-30T21:00:00Z", teamA:"France", teamB:"Sweden", scoreA:3, scoreB:0, preds:{
      "Nahuel": {a:4, b:1},
      "Lauti":  {a:4, b:2},
      "Naty":   {a:2, b:1}
    }},
    {id:79, startUtc:"2026-07-01T01:00:00Z", teamA:"Mexico", teamB:"Ecuador", scoreA:2, scoreB:0, preds:{
      "Nahuel": {a:2, b:2},
      "Lauti":  {a:1, b:0},
      "Naty":   {a:2, b:1}
    }},
    {id:80, startUtc:"2026-07-01T16:00:00Z", teamA:"England", teamB:"Congo DR", scoreA:2, scoreB:1, preds:{
      "Nahuel": {a:3, b:0},
      "Lauti":  {a:3, b:0},
      "Naty":   {a:3, b:2}
    }},
    {id:81, startUtc:"2026-07-01T20:00:00Z", teamA:"Belgium", teamB:"Senegal", scoreA:2, scoreB:2, preds:{
      "Nahuel": {a:2, b:0},
      "Lauti":  {a:3, b:0},
      "Naty":   {a:2, b:1}
    }},
    {id:82, startUtc:"2026-07-02T00:00:00Z", teamA:"USA", teamB:"Bosnia & Herzegovina", scoreA:2, scoreB:0, preds:{
      "Nahuel": {a:3, b:1},
      "Lauti":  {a:2, b:0},
      "Naty":   {a:2, b:1}
    }},
    {id:83, startUtc:"2026-07-02T19:00:00Z", teamA:"Spain", teamB:"Austria", scoreA:3, scoreB:0, preds:{
      "Nahuel": {a:1, b:0},
      "Lauti":  {a:4, b:1},
      "Naty":   {a:1, b:1}
    }},
    {id:84, startUtc:"2026-07-02T23:00:00Z", teamA:"Portugal", teamB:"Croatia", scoreA:2, scoreB:1, preds:{
      "Nahuel": {a:1, b:1},
      "Lauti":  {a:2, b:2},
      "Naty":   {a:1, b:1}
    }},
    {id:85, startUtc:"2026-07-03T03:00:00Z", teamA:"Switzerland", teamB:"Algeria", scoreA:2, scoreB:0, preds:{
      "Nahuel": {a:1, b:0},
      "Lauti":  {a:1, b:0},
      "Naty":   {a:2, b:1}
    }},
    {id:86, startUtc:"2026-07-03T18:00:00Z", teamA:"Australia", teamB:"Egypt", scoreA:1, scoreB:1, preds:{
      "Nahuel": {a:0, b:2},
      "Lauti":  {a:0, b:2},
      "Naty":   {a:1, b:2}
    }},
    {id:87, startUtc:"2026-07-03T22:00:00Z", teamA:"Argentina", teamB:"Cabo Verde", scoreA:1, scoreB:1, preds:{
      "Nahuel": {a:2, b:0},
      "Lauti":  {a:3, b:1},
      "Naty":   {a:3, b:1}
    }},
    {id:88, startUtc:"2026-07-04T01:30:00Z", teamA:"Colombia", teamB:"Ghana", scoreA:1, scoreB:0, preds:{
      "Nahuel": {a:2, b:1},
      "Lauti":  {a:2, b:0},
      "Naty":   {a:1, b:1}
    }},

    // Eliminatorias de 16

    {id:89, startUtc:"2026-07-04T17:00:00Z", teamA:"Canada", teamB:"Morocco", scoreA:0, scoreB:3, preds:{
      "Nahuel": {a:1, b:3},
      "Lauti":  {a:0, b:2},
      "Naty":   {a:1, b:1}
    }},
    {id:90, startUtc:"2026-07-04T21:00:00Z", teamA:"Paraguay", teamB:"France", scoreA:0, scoreB:1, preds:{
      "Nahuel": {a:2, b:1},
      "Lauti":  {a:1, b:3},
      "Naty":   {a:1, b:2}
    }},
    {id:91, startUtc:"2026-07-05T20:00:00Z", teamA:"Brazil", teamB:"Norway", scoreA:1, scoreB:2, preds:{
      "Nahuel": {a:2, b:2},
      "Lauti":  {a:2, b:1},
      "Naty":   {a:2, b:2}
    }},
    {id:92, startUtc:"2026-07-06T00:00:00Z", teamA:"Mexico", teamB:"England", scoreA:2, scoreB:3, preds:{
      "Nahuel": {a:1, b:3},
      "Lauti":  {a:1, b:3},
      "Naty":   {a:2, b:2}
    }},
    {id:93, startUtc:"2026-07-06T19:00:00Z", teamA:"Portugal", teamB:"Spain", scoreA:0, scoreB:1, preds:{
      "Nahuel": {a:1, b:1},
      "Lauti":  {a:2, b:4},
      "Naty":   {a:1, b:2}
    }},
    {id:94, startUtc:"2026-07-07T00:00:00Z", teamA:"USA", teamB:"Belgium", scoreA:1, scoreB:4, preds:{
      "Nahuel": {a:1, b:2},
      "Lauti":  {a:3, b:2},
      "Naty":   {a:1, b:1}
    }},
    {id:95, startUtc:"2026-07-07T16:00:00Z", teamA:"Argentina", teamB:"Egypt", scoreA:3, scoreB:2, preds:{
      "Nahuel": {a:3, b:1},
      "Lauti":  {a:3, b:2},
      "Naty":   {a:2, b:1}
    }},
    {id:96, startUtc:"2026-07-07T20:00:00Z", teamA:"Switzerland", teamB:"Colombia", scoreA:0, scoreB:0, preds:{
      "Nahuel": {a:0, b:0},
      "Lauti":  {a:0, b:1},
      "Naty":   {a:1, b:1}
    }},
    
    // Eliminatorias de 8

    {id:97, startUtc:"2026-07-09T20:00:00Z", teamA:"France", teamB:"Morocco", scoreA:null, scoreB:null, preds:{}},
    {id:98, startUtc:"2026-07-10T19:00:00Z", teamA:"Spain", teamB:"Belgium", scoreA:null, scoreB:null, preds:{}},
    {id:99, startUtc:"2026-07-11T21:00:00Z", teamA:"Norway", teamB:"England", scoreA:null, scoreB:null, preds:{}},
    {id:100, startUtc:"2026-07-12T01:00:00Z", teamA:"Argentina", teamB:"Switzerland", scoreA:null, scoreB:null, preds:{}},
    
    // Semifinales

    {id:101, startUtc:"2026-07-14T19:00:00Z", teamA:"W97", teamB:"W98", scoreA:null, scoreB:null, preds:{}},
    {id:102, startUtc:"2026-07-15T19:00:00Z", teamA:"W99", teamB:"W100", scoreA:null, scoreB:null, preds:{}},
    {id:103, startUtc:"2026-07-18T21:00:00Z", teamA:"L101", teamB:"L102", scoreA:null, scoreB:null, preds:{}},
    {id:104, startUtc:"2026-07-19T19:00:00Z", teamA:"W101", teamB:"W102", scoreA:null, scoreB:null, preds:{}},
  ],
  // Ajustes sencillos
  adminPass: 'Cococho1595',
  // Versión/semilla del bundle desplegado. Incrementala cuando subas cambios
  // para forzar que los clientes actualicen su localStorage con esta versión.
  // Aumenta este número en cada deploy para forzar que los navegadores
  // sobrescriban su `localStorage.prode_db` con el bundle nuevo.
  seedVersion: 20260663,
  // Si querés sincronizar en la nube, pegá aquí la configuración de Firebase (web app)
  // Este objeto fue copiado desde Firebase console (SDK setup). Se usa tal cual.
  // Firebase deshabilitado (usás Netlify desplegando los archivos estáticos)
  firebaseConfig: null,
};

// Cargar/salvar desde localStorage para persistencia local
function loadDB(){
  try{
    const raw = localStorage.getItem('prode_db');
    if(raw){
      const local = JSON.parse(raw);
      const localSeed = local && local.seedVersion ? local.seedVersion : 0;
      const remoteSeed = DB && DB.seedVersion ? DB.seedVersion : 0;
      if(localSeed >= remoteSeed){
        // El local es igual o más nuevo: usar local
        Object.assign(DB, local);
      } else {
        // La versión desplegada es más nueva: actualizar localStorage con el bundle
        try{
          localStorage.setItem('prode_db', JSON.stringify(DB));
        }catch(e){}
        console.log('localStorage actualizado desde bundle (seedVersion)', remoteSeed);
        // Forzar recarga para que la app cargue con la nueva configuración
        try{
          // Un reload simple — al recargar, localStorage ya contendrá la nueva seed
          location.reload();
        }catch(e){ /* en entornos sin window.location no hacemos nada */ }
      }
    }
  }catch(e){console.warn('No se pudo cargar DB',e)}

  // Si se configuró Firebase, intentar sincronizar desde Firestore (async)
  if(DB.firebaseConfig && DB.firebaseConfig.apiKey){
    try{
      if(window.firebase && firebase.firestore){
        if(!window._firebaseInit){
          firebase.initializeApp(DB.firebaseConfig);
          window._firebaseInit = true;
          window._prodeFirestore = firebase.firestore();
        }
        // Leer doc remoto y mergear (no sobreescribe firebaseConfig local)
        window._prodeFirestore.doc('prode/main').get().then(doc=>{
          if(doc.exists){
            const remote = doc.data();
            const keep = { firebaseConfig: DB.firebaseConfig, adminPass: DB.adminPass, participants: DB.participants };
            Object.assign(DB, remote);
            DB.firebaseConfig = keep.firebaseConfig;
            DB.adminPass = keep.adminPass;
            DB.participants = keep.participants;
            // Notificar a la app que la DB cambió
            document.dispatchEvent(new Event('dbUpdated'));
            console.log('DB sincronizada desde Firestore');
          }
        }).catch(err=>console.warn('Error leyendo DB remota',err));
      } else {
        console.warn('Firebase SDK no está cargado. Agrega los scripts de Firebase en HTML.');
      }
    }catch(e){console.warn('Error inicializando Firebase',e)}
  }
}

function saveDB(){
  // salvar local
  localStorage.setItem('prode_db', JSON.stringify(DB));
  // salvar remoto si corresponde
  try{
    if(window._prodeFirestore){
      const toSave = Object.assign({}, DB);
      // opcionalmente no guardamos credenciales en la nube
      delete toSave.firebaseConfig;
      window._prodeFirestore.doc('prode/main').set(toSave).then(()=>{
        console.log('DB guardada en Firestore');
      }).catch(err=>console.warn('Error guardando DB remota',err));
    }
  }catch(e){console.warn('Error en saveDB remoto',e)}
}

loadDB();

// Forzar participantes fijos (no editables desde index)
DB.participants = ["Nahuel","Lauti","Naty"];
saveDB();

// prode23
// seedVersion: 20260663
// v=20260618-18