package main

import (
	"database/sql"
	"html/template" // Модуль отвечает за шаблонизацию html страниц
	"log"
	"net/http"
	"strconv"
	"strings"

	"github.com/gorilla/mux"
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
	Text           string `db:"content"`
	PostParagraphs []string
}

type indexPagePostData struct { //indexPagePostData
	PostID       int    `db:"post_id"`
	Title        string `db:"title"`
	Subtitle     string `db:"subtitle"`
	PostCategory string `db:"category"`
	PostImage    string `db:"image_url"`
	Author       string `db:"author_name"`
	AuthorImg    string `db:"author_image"`
	PublishDate  string `db:"publish_date"`
	PostURL      string // URL ордера, на который мы будем переходить для конкретного поста
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
		log.Println("Request completed succesfully")
	}
}

func post(db *sqlx.DB) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		postIDStr := mux.Vars(r)["postID"] // Получаем postID в виде строки из параметров урла

		postID, err := strconv.Atoi(postIDStr) // Конвертируем строку postID в число
		if err != nil || postID < 1 {
			http.Error(w, "Invalid post id", 403)
			log.Println(err)
			return // Завершение функции
		}

		postPage, err := getPostPageByID(db, postID)
		if err != nil {
			if err == sql.ErrNoRows {
				// sql.ErrNoRows возвращается, когда в запросе к базе не было ничего найдено
				// В таком случае мы возвращем 404 (not found) и пишем в тело, что пост не найден
				http.Error(w, "Post not found", 404)
				log.Println(err.Error())
				return
			}

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
        post_id,
        title,
        subtitle,
        category,
		image_url,
        author_name,
        author_image,
        publish_date
    FROM
        post JOIN authors ON post.author_id = authors.author_id
    WHERE
	    featured = ?
    `

	var indexPagePostsData []indexPagePostData             // Заранее объявляем массив с результирующей информацией
	err := db.Select(&indexPagePostsData, query, featured) // Делаем запрос в базу данных // Select позволяет прочитать несколько строк
	if err != nil {                                        // Проверяем, что запрос в базу данных не завершился с ошибкой
		return nil, err
	}
	/*
		for i := range indexPagePostsData {
			indexPagePostsData[i].PostURL = "/post/" + strconv.Itoa(indexPagePostsData[i].PostID)
		}*/

	for _, post := range indexPagePostsData {
		post.PostURL = "/post/" + strconv.Itoa(post.PostID)
	}

	return indexPagePostsData, nil
}

func getPostPageByID(db *sqlx.DB, postID int) (postPageData, error) {
	// Составляем SQL-запрос для получения записей для секции featured-posts
	const query = `
    SELECT
        title,
        subtitle,
        image_url,
        content
    FROM
        post
    WHERE
        post_id = ?
    `
	// В SQL-запросе добавились параметры, как в шаблоне. ? означает параметр, который мы передаем в запрос ниже

	var pageData postPageData

	// Обязательно нужно передать в параметрах orderID
	err := db.Get(&pageData, query, postID)
	if err != nil { // Проверяем, что запрос в базу данных не завершился с ошибкой
		return postPageData{}, err
	}

	pageData.PostParagraphs = strings.Split(pageData.Text, "\n")

	return pageData, nil
}
