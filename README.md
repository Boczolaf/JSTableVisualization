# Komponent JS do wizualizacji i interakcji z CoNDeT


## Wymagania:
-struktura projektu jako open source biblioteka JS  
-tworzenie tabel pozwalających na wizualizację wprowadzonych danych regułowych  
-dodawanie nowych tabel poprzez oddzielnie wywoływaną formatkę pozwalającą zdefiniować konkretne kolumny  
-modyfikacja tabel poprzez dodawanie lub usuwanie wierszy  
-modyfikacja tabel poprzez edycję atrybutów wykonywaną w osobnej formatce (ta sama jak do dodwania nowych tabel)  
-możliwość operowania na zawartości tabel(przejścia pomiędzy komórkami, otwarcie edycji komórki itp.) przy pomocy klawiatury  
-możliwość zdefiniowania powiązań pomiędzy elementami tabel i innymi tabelami, wizualizacja połączeń, możliwość stworzenia połączeń jeden do wielu  
-funkcja undo  
-funkcja redo  
-zapis struktury tabel do pliku json  
-odczyt z pliku json do stworzenia struktury tabel  

## Użytek: 
Aby w pełni wykorzystać możliwości datatable trzeba skonfigurować trzy elementy:
# 1. 
Formatka do tworzenia tabel zawierająca 4 inputy: jeden z id "tabName" do wpisania nazwy tabeli, jeden z id "colNames" dla nazw kolumn wejścia(oddzielanych średnikiem), jeden z id "argNames" dla nazw kolumn wyjścia(oddzielanych średnikiem), oraz jeden z id "rowCount" z liczbą wierszy w tabeli; a także przycisk podłączony do funkcji createMainDiv(0);
# 2.
Dwa przyciski podłączone do funkcji undo() oraz redo().
# 3.
Trzy przyciski służące do obsługi wczytywania z pliku json: jeden do zapisu z funkcją newjsonwrite(), jeden z id "selectFiles" do wyboru pliku do wczytania, oraz jeden z allFromJson() do wczytania pliku.

## Struktura:
-addListeners.js - dodaje EventListenera do komórek ostatniej kolumny do obsługi tworzenia połączeń;
-connection.js - tworzenie połączeń i rysowanie strzałek;
-draggable.js - przesuwanie tabelek;
-history.js - zapisuje historię stanu oraz obsługa undo/redo;
-json.js - zapisywanie/odczytywanie z jsona;
-newtable.js - tworzenie nowych tabelek;
-onenter.js - w formatce można tworzyć tabelki z inputów wciskając Enter;
-styles.css - style 
-new.html - html z formatkami wykorzystującymi funkcjonalność

## Źródła i inne
https://docs.google.com/document/d/1G-Bu3y2FyxGvGvYSgwIfbiWQJuW5nnagwibTRSHJejs/edit?usp=sharing
https://github.com/frappe/datatable Licencja MIT
 
