package main

import (
	"database/sql"
	"encoding/base64"
	"encoding/json"
	"html/template" // Модуль отвечает за шаблонизацию html страниц
	"io"
	"log"
	"net/http"
	"os"
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
	FeaturedPosts []*indexPagePostData
	RecentPosts   []*indexPagePostData
}

type postPageData struct {
	Title          string `db:"title"`
	Subtitle       string `db:"subtitle"`
	PostImage      string `db:"image_url"`
	PostCardImage  string `db:"short_image_url"`
	Text           string `db:"content"`
	PostParagraphs []string
}

type indexPagePostData struct { //indexPagePostData
	PostID        int    `db:"post_id"`
	Title         string `db:"title"`
	Subtitle      string `db:"subtitle"`
	PostCategory  string `db:"category"`
	PostImage     string `db:"image_url"`
	PostCardImage string `db:"short_image_url"`
	Author        string `db:"author_name"`
	AuthorImg     string `db:"author_image"`
	PublishDate   string `db:"publish_date"`
	PostURL       string // URL ордера, на который мы будем переходить для конкретного поста
}

type adminDataType struct {
	AdminID     int    `db:"author_id"`
	AuthorName  string `db:"author_name"`
	AuthorImage string `db:"author_image"`
	UserEmail   string `db:"author_email"`
	UserPass    string `db:"author_password"`
}

type createPostDataType struct {
	Title           string `json:"Title"`
	Subtitle        string `json:"Subtitle"`
	AuthorName      string `json:"AuthorName"`
	AuthorImage     string `json:"AuthorImage"`
	AuthorImageName string `json:"AuthorImageName"`
	PublishDate     string `json:"PublishDate"`
	LargeImage      string `json:"LargeImage"`
	LargeImageName  string `json:"LargeImageName"`
	ShortImage      string `json:"ShortImage"`
	ShortImageName  string `json:"ShortImageName"`
	Content         string `json:"Content"`
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

func createPost(db *sqlx.DB) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		body, err := io.ReadAll(r.Body)
		if err != nil {
			http.Error(w, "Internal Server Error", 500)
			log.Println(err.Error())
			return
		}

		var req createPostDataType // Объявляем переменную полученных данных с JSON
		err = json.Unmarshal(body, &req)
		if err != nil {
			http.Error(w, "Internal Server Error", 500)
			log.Println(err.Error())
			return
		}

		err = savePost(db, req)
		if err != nil {
			http.Error(w, "Internal Server Error", 500)
			log.Println(err.Error())
			return
		}

		log.Println("Request completed succesfully")
	}
}

func admin(db *sqlx.DB) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {

		ts, err := template.ParseFiles("pages/admin.html") // Страница блога
		if err != nil {
			http.Error(w, "Internal Server Error", 500) // В случае ошибки парсинга - возвращаем 500
			log.Println(err.Error())                    // Используем стандартный логгер для вывода ошбики в консоль
			return                                      // Завершение функции
		}

		err = ts.Execute(w, nil) // Заставляем шаблонизатор вывести шаблон в тело ответа
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
			http.Error(w, "Invalid post id", 402)
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

// Возвращаем не просто []indexPagePostData, а []*indexPagePostData - так у нас получится подставить PostURL в структуре
func getIndexPagePosts(db *sqlx.DB, featured int) ([]*indexPagePostData, error) {
	// Составляем SQL-запрос для получения записей для секции featured-posts
	const query = `
    SELECT
        post_id,
        title,
        subtitle,
        category,
		image_url,
		short_image_url,
        author_name,
        author_image,
        publish_date
    FROM
        post JOIN authors ON post.author_id = authors.author_id
    WHERE
	    featured = ?
    `

	var indexPagePostsData []*indexPagePostData // Заранее объявляем массив с результирующей информацией

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

	var pageData postPageData

	// Обязательно нужно передать в параметрах postID
	err := db.Get(&pageData, query, postID)
	if err != nil { // Проверяем, что запрос в базу данных не завершился с ошибкой
		return postPageData{}, err
	}
	pageData.PostParagraphs = strings.Split(pageData.Text, "\n")

	return pageData, nil
}

func savePost(db *sqlx.DB, req createPostDataType) error {

	authorImageURL, err := saveImage(req.AuthorImage, req.AuthorImageName)
	if err != nil {
		return err
	}

	largeImageURL, err := saveImage(req.LargeImage, req.LargeImageName)
	if err != nil {
		return err
	}

	shortImageURL, err := saveImage(req.ShortImage, req.ShortImageName)
	if err != nil {
		return err
	}

	if largeImageURL == "" && shortImageURL != "" {
		largeImageURL = shortImageURL
	} else if largeImageURL != "" && shortImageURL == "" {
		shortImageURL = largeImageURL
	}

	const queryAuthor = `
	INSERT INTO
		authors (
		author_name,
   		author_image
	) VALUES
		(?, ?)
	`
	const queryPost = `
	INSERT INTO
	` + "`post`" + `
	(
		author_id,
		title,
		subtitle,
		category,
		image_url,
		short_image_url,
		publish_date,
		content,
		featured
	)
	VALUES
		(?, ?, ?, ?, ?, ?, ?, ?, ?)		
	`

	const queryAuthorId = `
	SELECT
		author_id
 	FROM
		authors
	WHERE
		author_name = ?
	`

	if req.AuthorName != "" {

		_, err := db.Exec( // Сами данные передаются через аргументы к ф-ии Exec
			queryAuthor,
			req.AuthorName,
			authorImageURL)
		if err != nil {
			return err
		}

		var authorId int
		err = db.Get(&authorId, queryAuthorId, req.AuthorName)
		if err != nil { // Проверяем, что запрос в базу данных не завершился с ошибкой
			return err
		}

		_, err = db.Exec(queryPost, authorId, req.Title, req.Subtitle, "", largeImageURL, shortImageURL, req.PublishDate, req.Content, 0)
		if err != nil { // Проверяем, что запрос в базу данных не завершился с ошибкой
			return err
		}

	}
	return nil
}

func saveImage(Base64Image string, imageName string) (string, error) {
	var url string
	if Base64Image != "" {
		url = "/static/img/" + imageName
		//img, err := base64.StdEncoding.DecodeString(image)
		img, err := base64.StdEncoding.DecodeString(strings.Split(Base64Image, "base64,")[1])
		if err != nil {
			return "", err
		}

		file, err := os.Create("static/img/" + imageName)
		if err != nil {
			return "", err
		}
		// создаем файл с именем переданным от фронта в папке static/img
		_, err = file.Write(img) // Записываем контент картинки в файл
		if err != nil {
			return "", err
		}
		return url, nil
	} else {
		url = ""
		return url, nil
	}
}
