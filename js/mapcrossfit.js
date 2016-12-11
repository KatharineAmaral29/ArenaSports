
var map;
var infoWindow;

// A variável markersData guarda a informação necessária a cada marcador
// Para utilizar este código basta alterar a informação contida nesta variável
var markersData = [
   {
      lat: -3.7335439,
      lng: -38.5032676,
      nome: "CrossFit 085",
      endereco:"Rua Carvalho Lima, 55",
      telefone: "(85) 3035-3952 " // não colocar virgula no último item de cada maracdor
   },
   {
      lat: -3.7929111,
      lng: -38.5675668,
      nome: "Crossfit 6450 maraponga",
      endereco:"Rua Carlos Studart, 231",
      telefone: "(85) 98773-3079" // não colocar virgula no último item de cada maracdor
	},
	{
      lat: -3.7413906,
      lng: -38.4849239,
      nome: "Crossfit Cangaço",
      endereco:"Rua Vilebaldo Águiar, 301",
      telefone: "(85) 99605-8663" // não colocar virgula no último item de cada maracdor
	},
   {
      lat: -3.7958409,
      lng: -38.4845406,
      nome: "CrossFit Tríade",
      endereco:"Avenida Oliveira Paiva, 2455",
      telefone: "(85) 3271-0171" // não colocar virgula no último item de cada maracdor
	},
	{
      lat: -3.7524575,
      lng: -38.5284157,
      nome: "Crossfit Dragão do Mar",
      endereco:"Rua Dr. Ratisbona, 40",
      telefone: "(85) 98860-8063" // não colocar virgula no último item de cada maracdor
	},
   {
      lat: -3.7889328,
      lng: -38.4710198,
      nome: "Crossfit Radiação",
      endereco:"Rua Dr. Ernesto Monteiro, 1305",
      telefone: "(85) 3103-0939" // não colocar virgula no último item de cada maracdor
	},
	{
      lat: -3.7360628,
      lng: -38.4941769,
      nome: "Jangada Porão CrossFit",
      endereco:"Rua Coronel Linhares, 870",
      telefone: "(85) 3035-8060" // não colocar virgula no último item de cada maracdor
	},
   {
      lat: -3.7815265,
      lng: -38.4882973,
      nome: "Crossfit Gurkha",
      endereco:"Avenida Cel. José Philomeno Gomes, 1255",
      telefone: "(85) 3109-2414" // não colocar virgula no último item de cada maracdor
	},
	{
      lat: -3.7371025,
      lng: -38.4909851,
      nome: "Central do Corpo - Galpão - CrossFit",
      endereco:" Rua Coronel Jucá, 523 - 05",
      telefone: "(85) 3085-0942" // não colocar virgula no último item de cada maracdor
	},
   {
      lat: -3.7334457,
      lng: -38.4873604,
      nome: "CrossGym",
      endereco:"Rua República do Líbano, 1415",
      telefone: "(85) 3267-4795" // não colocar virgula no último item de cada maracdor
	},
	{
      lat: -3.8153545,
      lng: -38.4819422,
      nome: "Mega Gym Academia",
      endereco:"Avenida Washington Soares, 6450",
      telefone: "(85) 3274-9000" // não colocar virgula no último item de cada maracdor
	},	
   {
      lat: -3.808103,
      lng: -38.4680948,
      nome: "CrossFit Iracema",
      endereco:"Av. Maestro Lisboa, 1322",
      telefone: "(85) 3114-2056" // não colocar virgula no último item de cada maracdor
	  } // não colocar vírgula no último marcador
];

function initialize() {
   var mapOptions = {
      center: new google.maps.LatLng(40.601203,-8.668173),
      zoom: 9,
      mapTypeId: 'roadmap',
   };

   map = new google.maps.Map(document.getElementById('map-crossfit'), mapOptions);

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