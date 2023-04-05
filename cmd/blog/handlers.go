package main

import (
	"html/template" // Модуль отвечает за шаблонизацию html страниц
	"log"
	"net/http"
	"strings"

	"github.com/jmoiron/sqlx"
)

type indexPageData struct {
	FeaturedPosts []featuredPostData
	RecentPosts   []recentPostData
}

type postPageData struct {
	Title          string `db:"title"`
	Subtitle       string `db:"subtitle"`
	PostImage      string `db:"post_image_url"`
	Text           string `db:"text"`
	PostParagraphs []string
}

type featuredPostData struct { //featuredPostData
	Title        string `db:"title"`
	Subtitle     string `db:"subtitle"`
	PostCategory string `db:"category"`
	ImgModifier  string `db:"image_modifier"`
	Author       string `db:"author"`
	AuthorImg    string `db:"author_url"`
	PublishDate  string `db:"publish_date"`
}

type recentPostData struct {
	Title         string `db:"title"`
	Subtitle      string `db:"subtitle"`
	PostCategory  string `db:"category"`
	PostThumbnail string `db:"post_thumbnail_url"`
	Author        string `db:"author"`
	AuthorImg     string `db:"author_url"`
	PublishDate   string `db:"publish_date"`
}

func index(db *sqlx.DB) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		featuredPosts, err := getFeaturedPosts(db)
		if err != nil {
			http.Error(w, "Internal Server Error", 500) // В случае ошибки парсинга - возвращаем 500
			log.Println(err.Error())                    // Используем стандартный логгер для вывода ошбики в консоль
			return                                      // Завершение функции
		}

		recentPosts, err := getRecentPosts(db)
		if err != nil {
			http.Error(w, "Internal Server Error", 500) // В случае ошибки парсинга - возвращаем 500
			log.Println(err.Error())                    // Используем стандартный логгер для вывода ошбики в консоль
			return                                      // Завершение функции
		}

		ts, err := template.ParseFiles("pages/index.html") // Главная страница блога
		if err != nil {
			http.Error(w, "Internal Server Error", 500) // В случае ошибки парсинга - возвращаем 500
			log.Println(err.Error())                    // Используем стандартный логгер для вывода ошбики в консоль
			return
		}

		data := indexPageData{
			FeaturedPosts: featuredPosts,
			RecentPosts:   recentPosts,
		}

		err = ts.Execute(w, data) // Заставляем шаблонизатор вывести шаблон в тело ответа
		if err != nil {
			http.Error(w, "Internal Server Error", 500)
			log.Println(err.Error())
			return
		}

		log.Println("Request completed succesfully")

	}
}

func post(db *sqlx.DB, post_id int) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		postPage, err := getPostPage(db, post_id)
		if err != nil {
			http.Error(w, "Internal Server Error", 500) // В случае ошибки парсинга - возвращаем 500
			log.Println(err.Error())                    // Используем стандартный логгер для вывода ошбики в консоль
			return                                      // Завершение функции
		}

		ts, err := template.ParseFiles("pages/post.html") // Главная страница блога
		if err != nil {
			http.Error(w, "Internal Server Error", 500) // В случае ошибки парсинга - возвращаем 500
			log.Println(err.Error())                    // Используем стандартный логгер для вывода ошбики в консоль
			return
		}

		err = ts.Execute(w, postPage) // Заставляем шаблонизатор вывести шаблон в тело ответа
		if err != nil {
			http.Error(w, "Internal Server Error", 500)
			log.Println(err.Error())
			return
		}

		log.Println("Request completed succesfully")
	}
}

func getFeaturedPosts(db *sqlx.DB) ([]featuredPostData, error) {
	// Составляем SQL-запрос для получения записей для секции featured-posts
	const query = `
    SELECT
        title,
        subtitle,
        category,
        author,
        author_url,
        publish_date,
        image_modifier
    FROM
        post
    WHERE featured = 1
    `

	var featuredPostsData []featuredPostData    // Заранее объявляем массив с результирующей информацией
	err := db.Select(&featuredPostsData, query) // Делаем запрос в базу данных // Select позволяет прочитать несколько строк
	if err != nil {                             // Проверяем, что запрос в базу данных не завершился с ошибкой
		return nil, err
	}

	return featuredPostsData, nil
}

func getRecentPosts(db *sqlx.DB) ([]recentPostData, error) {
	// Составляем SQL-запрос для получения записей для секции featured-posts
	const query = `
    SELECT
        title,
        subtitle,
        category,
        author,
        author_url,
        publish_date,
        post_thumbnail_url
    FROM
        post
    WHERE featured = 0
    `

	var recentPostsData []recentPostData      //recentPostData      // Заранее объявляем массив с результирующей информацией
	err := db.Select(&recentPostsData, query) // Делаем запрос в базу данных
	if err != nil {                           // Проверяем, что запрос в базу данных не завершился с ошибкой
		return nil, err
	}

	return recentPostsData, nil
}

func getPostPage(db *sqlx.DB, post_id int) (postPageData, error) {
	// Составляем SQL-запрос для получения записей для секции featured-posts
	const query = `
    SELECT
        title,
        subtitle,
        post_image_url,
        text
    FROM
        post
    WHERE
        post_id = ?
    `

	var pageData postPageData

	err := db.Get(&pageData, query, post_id) // Делаем запрос в базу данных
	if err != nil {                          // Проверяем, что запрос в базу данных не завершился с ошибкой
		return pageData, err
	}

	pageData.PostParagraphs = strings.Split(pageData.Text, "\n")

	return pageData, nil
}
