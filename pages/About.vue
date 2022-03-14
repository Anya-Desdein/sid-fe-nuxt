<template>
<div>
    <PageHeading title="About" noInfoBar></PageHeading>
    <div class="container page-container tos-page"> 
      <p>
        System „Inteligentny Dom” powstał w celu zapewnienia wygodnej kontroli inteligentnych urządzeń w domu przy pomocy komputera stacjonarnego, laptopa, czy tabletu.
        Pozwala on na kontrolowanie inteligentnych urządzeń, a także na przeglądanie aktualnych i historycznych danych z czujników przy pomocy wykresu, czy danych liczbowych. Może być rozszerzany o dodatkowe inteligentne urządzenia.
      </p>
      <p>
        Użytkownik ma również możliwość wyboru jednego z dwóch unikalnych theme'ów. Przy jego projektowaniu postawiono na wygodę i przyjemność z użytkowania. 
        W idealnych warunkach system powinien być umieszczony na dedykowanym urządzeniu np.: tablecie, na którym byłby zawsze uruchomiony i gotowy do wprowadzenia zmian. 
      </p>
      <p>
        System został wyposażony w kontroler PID-użytkownik może zatem cieszyć się pełną automatyzacją regulacji urządzeń wyjściowych, np.: grzałki, gdy tylko nastąpi taka potrzeba.
        Składa się on z Arduino wyposażonego w czujniki ciepła i wilgotności, z grzałki obsługiwanej przez inteligentną wtyczkę, a także z aplikacji frontendowej (tu, gdzie to czytasz) i dwóch mniejszych aplikacji backendowych - daemona, api, oba z nich używają connectora, by komunikować się z bazą danych. 
      </p>

      <h3>Zasady użytkowania</h3>
      <ul>
        <li>System służy wyłącznie do użytku domowego, nie jest zaprojektowany do użytku w sieciach publicznych, czy w środowisku biznesowym - w przedsiębiorstwach.</li>
        <li>Dozwolona temperatura, jaką może osiągnąć pomieszczenie przy pomocy trybu Auto to między 0, a 40 stopni Celsjusza.</li>
        <li>Nie należy udostępniać hasła do sieci, które używa system, osobom trzecim.</li>
        <li>Nie powinno się używać systemu na urządzeniu o szerokości ekranu mniejszej niż 450 px, zalecana wartość wynosi minimum 650 px.</li>
      </ul>
      <h3>Instalacja i konfiguracja systemu "Inteligentny Dom"</h3>
      <p>
        Aby poprawnie skonfigurować system "Inteligentny Dom" należy kolejno wykonać wszystkie kroki opisane poniżej.
      </p>
      <ol>
        <li>Podłączyć Arduino z czujnikami do źródła zasilania.</li>
        <li>Podłączyć inteligentną wtyczkę do przejściówek z wtyczki brytyjskiej na polską po obu stronach i podłączyć do źródła zasilania.</li>
        <li>Skonfigurować bazę danych PostgresSQL. Zalecane narzędzie do jej administrowania to pgAdmin w najnowszej wersji. Aby przygotować bazę danych dla systemu należy stworzyć użytkownika oraz wykonać migracje znajdujące się w projekcie connectora.</li>
        <li>Skonfigurować plik konfiguracyjny app-config w daemonie.</li>
        <li>Skonfigurować pliki .env w api i daemonie podając min. dane do bazy danych.</li>
        <li>Uruchomić usługi api i daemona.</li>
        <li>Skonfigurować plik .env frontendu podając min. publiczny adres url do api.</li>
        <li>Uruchomić frontend.</li>
      </ol>
      <p>
        Przykładowe użycie systemu:
      </p>
      <ol>
        <li>Wybrać temperaturę docelową w pomieszczeniach (zakładka "Dashboard").</li>
        <li>Wybrać swój ulubiony wygląd.</li>
        <li>Cieszyć się idealną temperaturą w mieszkaniu.</li>
      </ol>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    document.body.classList.add('about-page-active');
  },
  destroyed() {
    document.body.classList.remove('about-page-active');
  }
}
</script>

<style lang="scss" scoped>
.tos-page {
  @include bp(min-landscape) {
    h1 {
      width: calc(100% * 0.2 * 4 - 0.5rem);
    }
  }

  h2, h3 {
    margin-bottom: 1.2em;
    margin-top: 1.2em;
  }
  p {
    margin-bottom: 1.2em;
  }
}
</style>

<style lang="scss">
  ul {
    list-style-type:"- ";
  }
  ul li, ol li {
    margin-bottom: 0.4rem;
  }

  .app-background-image-container {
    transition: opacity 0.2s;
  }
  .about-page-active .app-background-image-container {
    opacity: 0.45;
  }
</style>
