import React from "react";
import BookCard from "./BookCard";
import Favorites from "./Favorites";
import Navbar from "./Navbar";
import { Icon } from "@iconify/react";
import Footer from "./Footer";

export default function App() {
  ////////////// STATE //////////////////

  //API'yi getirmek için geçerli URL'nin state'i ayarla
  const [currentUrl, setCurrentUrl] = React.useState(
    `https://gnikdroy.pythonanywhere.com/api/book/`
  );
  //Sonraki ve önceki sayfada gezinme seçenekleri için state'i ayarla (data.next ve data.previous)
  const [bookNavigation, setBookNavigation] = React.useState([]);
  //Kitap verileri için state'i ayarla
  const [booksData, setBooksData] = React.useState([]);
  //Yükleniyor mesajı için state'i ayarla
  const [isDataLoading, setIsDataLoading] = React.useState(true);
  const [fetchError, setFetchError] = React.useState(null);
  // fetchError için state'i ayarla
  const [optionsInput, setOptionsInput] = React.useState({
    search: "",
    language: "",
  });
  // Sık kullanılanlar için state'i ayarlayın ve YEREL DEPODAN ÖĞELERİ YÜKLE
  const [favorites, setFavorites] = React.useState([]);
  React.useEffect(() => {
    try {
      const favorites = JSON.parse(localStorage.getItem("Favorites")) || [];
      setFavorites(favorites);
    } catch (e) {}
  }, []);
// FAVORİLERİ KAYDEDİN VE YEREL DEPOYA KALDIRIN
// sık kullanılanlar dizisi her değiştiğinde öğeleri yerel depolamaya kaydedin ve kaldırın
  React.useEffect(() => {
    localStorage.setItem("Favorites", JSON.stringify(favorites));
  }, [favorites]);

  // geçerli sayfa numarası için state'i ayarla
  const [pageNumber, setPageNumber] = React.useState(1);
  //açık Sık Kullanılanlar Modu için state'i ayarla
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const lastPage = Math.round(bookNavigation.count / 10);
  // console.log(optionsInput);
  // console.log(currentUrl)
  // console.log(currentUrl);
  // console.log(bookNavigation);

  /////////////////API CALL /////////////

  // API'yi getirmek için Effect'i kullanın ve currentUrl değişecekse yeniden işleyin.
  React.useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(currentUrl);
        //yanıt yoksa bir hata atın
        if (!response.ok) throw Error("Did not recive any data");
        //
        const data = await response.json();
        // BooksData için state'i ayarla
        setBooksData(data.results);
        // sonraki ve önceki sayfa seçenekleri için verileri ayarla
        setBookNavigation(data);
        // FetchEroor'u ayarla
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsDataLoading(false);
      }
    };
    fetchBooks();
  }, [currentUrl]);

  ////////////// FUNCTIONS /////////////////

  // Sonraki sayfaya geçme işlevi
  const nextPage = function () {
    if (pageNumber === lastPage) return;
    //Sonraki sayfa url'sini al
    setCurrentUrl(bookNavigation.next);
    // Geçerli sayfa numarasını kontrol edin ve +1 olarak ayarlayın
    setPageNumber((prevState) => prevState + 1);
  };

  //önceki sayfaya gitmek için
  const prevPage = function () {
    if (pageNumber <= 1) return;
    // Önceki sayfa url'sini al
    setCurrentUrl(bookNavigation.previous);
    // Geçerli sayfa numarasını kontrol edin ve -1 olarak ayarlayın
    setPageNumber((prevState) => prevState - 1);
  };
  //Ana Sayfaya dönmek için FONKSİYON
  const backHome = function () {
    setCurrentUrl(`https://gnikdroy.pythonanywhere.com/api/book/`);
    setPageNumber(1);
  };

  //Son sayfaya gitmek için FONKSİYON
  const goToLastPage = function () {
    setCurrentUrl(
      `https://gnikdroy.pythonanywhere.com/api/book/?search=${optionsInput.search}&languages=${optionsInput.language}&page=${lastPage}`
    );

    setPageNumber(lastPage);
  };
  //Girişten arama değeri almak için FONKSİYON
  const inputChange = function (event) {
    const { name, value } = event.target;
    setOptionsInput((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  // Kitabın zaten favori listesine eklenip eklenmediğini kontrol etmek için favori kitapların TÜM Kimlikleri.
  const favIds = favorites.map((item) => item.id);

  // KİTABI FAVORİLERE EKLE
  const addFavorites = function (data) {
    // Mevcut sık kullanılanlar dizisinin bir kopyasını oluşturun ve mevcut kitabı buna ekleyin
    // const favIds = favorites.map(item => item.id)
    if (favIds.includes(data.id)) {
      return;
    } else {
      const newFavoriteList = [...favorites, data];
      setFavorites(newFavoriteList);
    }
  };

  // KİTABI FAVORİLERDEN ÇIKAR
  const removeFavorites = function (data) {
    //newFavoriteList oluşturun, favoriler dizisini filtreleyin ve false döndürecek öğeyi kaldırın
    const newFavoriteList = favorites.filter((item) => item.id !== data.id);
    // Favoriler listesini, filtreden sonra yeni Favoriler listemize ayarlayın
    setFavorites(newFavoriteList);
  };

  //Sorguyu arama işlevi
  const getSearch = function (event) {
    event.preventDefault();
    setCurrentUrl(
      `https://gnikdroy.pythonanywhere.com/api/book?search=${optionsInput.search}`
    );
    setPageNumber(1);
    setOptionsInput((prevState) => {
      return { ...prevState, language: "" };
    });
  };

  // Function to filter language

  const filterLang = function () {
    setCurrentUrl(
      `https://gnikdroy.pythonanywhere.com/api/book/?languages=${optionsInput.language}`
    );
    setPageNumber(1);
  };

  // Function to close and open modal
  const modalToggle = function () {
    setIsModalOpen((prevState) => !prevState);
  };

  return (
    <div>
      {/* // Navbar with options to filter for language , favorites list , search bar */}
      <header>
        <Navbar
          optionsValue={optionsInput.language}
          inputChange={inputChange}
          filterLang={filterLang}
          getSearch={getSearch}
          searchValue={optionsInput.search}
          openModal={modalToggle}
        />
      </header>
      {/* BOOK CARDS  */}
      <div className="books__container">
        {isDataLoading && <p> Loading Data ..... </p>}
        {fetchError && <p>{fetchError}</p>}
        {booksData.map((data) => (
          <BookCard
            key={data.id}
            data={data}
            addFavorites={() => addFavorites(data)}
            removeFavorites={() => removeFavorites(data)}
            author={data.agents.map((data) => `${data.person} `)}
            favIds={favIds}
            language={data.languages}
          />
        ))}
      </div>

      {/* MODAL WITH FAVORITES BOOKS */}

      {/* Condition to close and open modal  */}
      <div
        className={
          !isModalOpen
            ? "modal__container"
            : " modal__container modal__container-open"
        }
      >
        {/* Add hidden class to body to hide double scrollbar */}
        {isModalOpen
          ? document.body.classList.add("hidden")
          : document.body.classList.remove("hidden")}

        <Icon
          icon="icon-park-outline:close-one"
          className="modal__close-icon"
          onClick={modalToggle}
        />
        <h1 className="favorites__title">Favorilerim</h1>
        <div className="modal">
          {favorites.map((data) => (
            <Favorites
              key={data.id}
              data={data}
              addFavorites={() => addFavorites(data)}
              removeFavorites={() => removeFavorites(data)}
              author={data.agents.map((data) => `${data.person} `)}
              favIds={favIds}
              language={data.languages}
            />
          ))}
        </div>
      </div>

      {/* BOTTOM NAVIGATION */}
      <div className="bottom__nav-container">
        <div className="bottom__nav-left">
          <Icon
            className="bottom__nav-icon"
            icon="emojione-monotone:fast-reverse-button"
            onClick={backHome}
          />
          <Icon
            className="bottom__nav-icon"
            icon="bxs:left-arrow"
            onClick={prevPage}
          />
        </div>
        <div className="page__number-txt">
          {!bookNavigation.count ? (
            <p>Loading</p>
          ) : (
            <p>
              <span className="page__span">Sayfa :</span> {pageNumber} /{" "}
              {Math.round(bookNavigation.count / 10)}
            </p>
          )}
        </div>
        <div className="bottom__nav-left">
          <Icon
            className="bottom__nav-icon"
            icon="bxs:right-arrow"
            onClick={nextPage}
          />
          <Icon
            className="bottom__nav-icon"
            icon="emojione-monotone:fast-forward-button"
            onClick={goToLastPage}
          />
        </div>
      </div>

      <Footer
        optionsValue={optionsInput.language}
        inputChange={inputChange}
        filterLang={filterLang}
        getSearch={getSearch}
        searchValue={optionsInput.search}
        openModal={modalToggle}
      />
    </div>
  );
}
