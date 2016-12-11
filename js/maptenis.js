
var map;
var infoWindow;

// A variável markersData guarda a informação necessária a cada marcador
// Para utilizar este código basta alterar a informação contida nesta variável
var markersData = [
   {
      lat: -3.7360539,
      lng: -38.4809085,
      nome: "Academia Cearense de Tenis",
      endereco:"Rua Paulo Morais, 333",
      telefone: "(85) 3234-3377" // não colocar virgula no último item de cada maracdor
   },
   {
      lat: -3.7866268,
      lng: -38.48911,
      nome: "Winners Tennis Fitnes",
      endereco:"Rua General Caiado de Castro, 366",
      telefone: "(85) 3045-8610" // não colocar virgula no último item de cada maracdor
  },
   {
      lat: -3.7511245,
      lng: -38.4988212,
      nome: "Marreco Tenis Clube",
      endereco:"Av. Pontes Vieira, 2490",
      telefone: "(85) 3272-2899" // não colocar virgula no último item de cada maracdor
	  },
   {
      lat: -3.764668,
      lng: -38.4857905,
      nome: "Academia Top Tennis",
      endereco:"Rua Eliseu Uchôa Beco, 600",
      telefone: "(85) 99900-9327" // não colocar virgula no último item de cada maracdor
	  },
   {
      lat: -3.7769694,
      lng: -38.4879078,
      nome: "Viva Tennis",
      endereco:"Av. Cel. José Philomeno Gomes, s/nº",
      telefone: "(85) 99666-6716" // não colocar virgula no último item de cada maracdor
	  }, 
	{
      lat: -3.7338074,
      lng: -38.5057607,
      nome: "Federação Cearense De Tênis",
      endereco:"Av. Santos Dumont, 847",
      telefone: "(85) 98797-9114" // não colocar virgula no último item de cada maracdor
	  }, // não colocar vírgula no último marcador
];

function initialize() {
   var mapOptions = {
      center: new google.maps.LatLng(40.601203,-8.668173),
      zoom: 9,
      mapTypeId: 'roadmap',
   };

   map = new google.maps.Map(document.getElementById('map-tenis'), mapOptions);

   // cria a nova Info Window com referência à variável infowindow
   // o conteúdo da Info Window será atribuído mais tarde
   infoWindow = new google.maps.InfoWindow();

   // evento que fecha a infoWindow com click no mapa
   google.maps.event.addListener(map, 'click', function() {
      infoWindow.close();
   });

   // Chamada para a função que vai percorrer a informação
   // contida na variável markersData e criar os marcadores a mostrar no mapa
   displayMarkers();
}
google.maps.event.addDomListener(window, 'load', initialize);

// Esta função vai percorrer a informação contida na variável markersData
// e cria os marcadores através da função createMarker
function displayMarkers(){

   // esta variável vai definir a área de mapa a abranger e o nível do zoom
   // de acordo com as posições dos marcadores
   var bounds = new google.maps.LatLngBounds();
   
   // Loop que vai estruturar a informação contida em markersData
   // para que a função createMarker possa criar os marcadores 
   for (var i = 0; i < markersData.length; i++){

      var latlng = new google.maps.LatLng(markersData[i].lat, markersData[i].lng);
      var nome = markersData[i].nome;
      var endereco = markersData[i].endereco;
      var telefone = markersData[i].telefone;

      createMarker(latlng, nome, endereco, telefone);

      // Os valores de latitude e longitude do marcador são adicionados à
      // variável bounds
      bounds.extend(latlng);  
   }

   // Depois de criados todos os marcadores
   // a API através da sua função fitBounds vai redefinir o nível do zoom
   // e consequentemente a área do mapa abrangida.
   map.fitBounds(bounds);
}

// Função que cria os marcadores e define o conteúdo de cada Info Window.
function createMarker(latlng, nome, endereco, telefone){
   var marker = new google.maps.Marker({
      map: map,
      position: latlng,
      title: nome
   });

   // Evento que dá instrução à API para estar alerta ao click no marcador.
   // Define o conteúdo e abre a Info Window.
   google.maps.event.addListener(marker, 'click', function() {
      
      // Variável que define a estrutura do HTML a inserir na Info Window.
      var iwContent = '<div id="iw_container">' +
            '<div class="iw_title">' + nome + '</div>' +
         '<div class="iw_content">' + endereco + '<br />' +
         telefone + '<br />';
      
      // O conteúdo da variável iwContent é inserido na Info Window.
      infoWindow.setContent(iwContent);

      // A Info Window é aberta.
      infoWindow.open(map, marker);
   });
}