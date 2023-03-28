package main

import (
	"html/template" // Модуль отвечает за шаблонизацию html страниц
	"log"
	"net/http"
)

type indexPage struct {
	Title          string
	IntroTitle     string
	IntroSubtitle  string
	MenuItems      []menuData
	PostCategories []categoryData
	FeaturedPosts  []featuredPostData
	RecentPosts    []recentPostData
}

type featuredPostData struct {
	Title        string
	Subtitle     string
	Label        bool
	PostCategory string
	ImgModifier  string
	Author       string
	AuthorImg    string
	PublishDate  string
}

type recentPostData struct {
	Title       string
	Subtitle    string
	ImgModifier string
	Author      string
	AuthorImg   string
	PublishDate string
}

type menuData struct {
	MenuItem string
	Link     string
}

type categoryData struct {
	PostCategory string
	Link         string
}

func index(w http.ResponseWriter, r *http.Request) {
	ts, err := template.ParseFiles("pages/index.html") // Главная страница блога
	if err != nil {
		http.Error(w, "Internal Server Error", 500) // В случае ошибки парсинга - возвращаем 500
		log.Println(err.Error())                    // Используем стандартный логгер для вывода ошбики в консоль
		return                                      // Не забываем завершить выполнение ф-ии
	}

	data := indexPage{
		Title:          "Escape",
		IntroTitle:     "Let's do it together.",
		IntroSubtitle:  "We travel the world in search of stories. Come along for the ride.",
		MenuItems:      menuItems(),
		PostCategories: postCategories(),
		FeaturedPosts:  featuredPosts(),
		RecentPosts:    recentPosts(),
	}

	err = ts.Execute(w, data) // Заставляем шаблонизатор вывести шаблон в тело ответа
	if err != nil {
		http.Error(w, "Internal Server Error", 500)
		log.Println(err.Error())
		return
	}

	log.Println("Request completed succesfully")

}

func menuItems() []menuData {
	return []menuData{
		{
			MenuItem: "Home",
			Link:     "/home",
		},
		{
			MenuItem: "Categories",
			Link:     "#",
		},
		{
			MenuItem: "About",
			Link:     "#",
		},
		{
			MenuItem: "Contact",
			Link:     "#",
		},
	}
}

func postCategories() []categoryData {
	return []categoryData{
		{
			PostCategory: "Nature",
			Link:         "#",
		},
		{
			PostCategory: "Photography",
			Link:         "#",
		},
		{
			PostCategory: "Relaxation",
			Link:         "#",
		},
		{
			PostCategory: "Vacation",
			Link:         "#",
		},
		{
			PostCategory: "Travel",
			Link:         "#",
		},
		{
			PostCategory: "Adventure",
			Link:         "#",
		},
	}
}

func featuredPosts() []featuredPostData {
	return []featuredPostData{
		{
			Title:        "The Road Ahead",
			Subtitle:     "The road ahead might be paved - it might not be.",
			Label:        false,
			PostCategory: "Photography",
			ImgModifier:  "featured-post__background_the-road-ahead",
			Author:       "Mat Vogels",
			AuthorImg:    "static/img/mat-vogels.jpg",
			PublishDate:  "September 25, 2015",
		},
		{
			Title:        "From Top Down",
			Subtitle:     "Once a year, go someplace you never been before.",
			Label:        true,
			PostCategory: "Adventure",
			ImgModifier:  "featured-post__background_from-top-down",
			Author:       "William Wong",
			AuthorImg:    "static/img/william-wong.jpg",
			PublishDate:  "September 25, 2015",
		},
	}
}

func recentPosts() []recentPostData {
	return []recentPostData{
		{
			Title:       "Still Standing Tall",
			Subtitle:    "Life begins at the end of your comfort zone.",
			ImgModifier: "recent-post__image_still-standing-tall",
			Author:      "William Wong",
			AuthorImg:   "static/img/william-wong.jpg",
			PublishDate: "9/25/2015",
		},
		{
			Title:       "Sunny Side Up",
			Subtitle:    "No place is ever as bad as they tell you it's going to be.",
			ImgModifier: "recent-post__image_sunny-side-up",
			Author:      "Mat Vogels",
			AuthorImg:   "static/img/mat-vogels.jpg",
			PublishDate: "9/25/2015",
		},
		{
			Title:       "Water Falls",
			Subtitle:    "We travel not to escape life, but for life not to escape us.",
			ImgModifier: "recent-post__image_water_falls",
			Author:      "Mat Vogels",
			AuthorImg:   "static/img/mat-vogels.jpg",
			PublishDate: "9/25/2015",
		},
		{
			Title:       "Through the Mist",
			Subtitle:    "Travel makes you see what a tiny place you occupy in the world.",
			ImgModifier: "recent-post__image_through_the_mist",
			Author:      "William Wong",
			AuthorImg:   "static/img/william-wong.jpg",
			PublishDate: "9/25/2015",
		},
		{
			Title:       "Awaken Early",
			Subtitle:    "Not all those who wander are lost.",
			ImgModifier: "recent-post__image_awaken_early",
			Author:      "Mat Vogels",
			AuthorImg:   "static/img/mat-vogels.jpg",
			PublishDate: "9/25/2015",
		},
		{
			Title:       "Try it Always",
			Subtitle:    "The world is a book, and those who do not travel read only one page.",
			ImgModifier: "recent-post__image_try_it_always",
			Author:      "Mat Vogels",
			AuthorImg:   "static/img/mat-vogels.jpg",
			PublishDate: "9/25/2015",
		},
	}
}
