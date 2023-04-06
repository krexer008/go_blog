package main

import (
	"html/template" // Модуль отвечает за шаблонизацию html страниц
	"log"
	"net/http"
	"strings"

	"github.com/jmoiron/sqlx"
)

const (
	featured = 1
	recent   = 0
)

type indexPageData struct {
	FeaturedPosts []indexPagePostData
	RecentPosts   []indexPagePostData
}

type postPageData struct {
	Title          string `db:"title"`
	Subtitle       string `db:"subtitle"`
	PostImage      string `db:"image_url"`
	Text           string `db:"text"`
	PostParagraphs []string
}

type indexPagePostData struct { //indexPagePostData
	Title        string `db:"title"`
	Subtitle     string `db:"subtitle"`
	PostCategory string `db:"category"`
	PostImage    string `db:"image_url"`
	Author       string `db:"author"`
	AuthorImg    string `db:"author_url"`
	PublishDate  string `db:"publish_date"`
	PostLink     string
}

func index(db *sqlx.DB) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		featuredPosts, err := getIndexPagePosts(db, featured)
		if err != nil {
			http.Error(w, "Internal Server Error", 500) // В случае ошибки парсинга - возвращаем 500
			log.Println(err.Error())                    // Используем стандартный логгер для вывода ошбики в консоль
			return                                      // Завершение функции
		}

		recentPosts, err := getIndexPagePosts(db, recent)
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
		log.Println(recentPosts[0].PostLink)
		log.Println("Request completed succesfully")
	}
}

func post(db *sqlx.DB, postId int) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		postPage, err := getPostPage(db, postId)
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

func getIndexPagePosts(db *sqlx.DB, featured int) ([]indexPagePostData, error) {
	// Составляем SQL-запрос для получения записей для секции featured-posts
	const query = `
    SELECT
        title,
        subtitle,
        category,
		image_url,
        author,
        author_url,
        publish_date
    FROM
        post
    WHERE
	    featured = ?
    `

	var indexPagePostsData []indexPagePostData             // Заранее объявляем массив с результирующей информацией
	err := db.Select(&indexPagePostsData, query, featured) // Делаем запрос в базу данных // Select позволяет прочитать несколько строк
	if err != nil {                                        // Проверяем, что запрос в базу данных не завершился с ошибкой
		return nil, err
	}

	for i := range indexPagePostsData {
		indexPagePostsData[i].PostLink = strings.Replace(indexPagePostsData[i].Title, " ", "_", -1)
	}

	return indexPagePostsData, nil
}

func getPostPage(db *sqlx.DB, postId int) (postPageData, error) {
	// Составляем SQL-запрос для получения записей для секции featured-posts
	const query = `
    SELECT
        title,
        subtitle,
        image_url,
        text
    FROM
        post
    WHERE
        post_id = ?
    `

	var pageData postPageData

	err := db.Get(&pageData, query, postId) // Делаем запрос в базу данных
	if err != nil {                         // Проверяем, что запрос в базу данных не завершился с ошибкой
		return pageData, err
	}

	pageData.PostParagraphs = strings.Split(pageData.Text, "\n")

	return pageData, nil
}
