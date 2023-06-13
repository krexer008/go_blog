package main

import (
	"database/sql"

	_ "github.com/go-sql-driver/mysql" // Импортируем для возможности подключения к MySQL
	"github.com/gorilla/mux"
	"github.com/jmoiron/sqlx"

	"log"
	"net/http"
)

const (
	port         = ":3000"
	dbDriverName = "mysql"
	USER         = "root"
	PASS         = "root"
	HOST         = "localhost"
	PORT         = "3306"
)

func main() {
	// Получаем клиента к БД и ошибку в случае, если не удалось подключиться
	db, err := openDB() // Открываем соединение к базе данных в самом начале
	if err != nil {
		log.Fatal(err)
	}

	dbx := sqlx.NewDb(db, dbDriverName) // Расширяем стандартный клиент к базе

	mux := mux.NewRouter()
	mux.HandleFunc("/home", index(dbx)) // Передаём клиент к базе данных в ф-ию обработчик запроса
	mux.HandleFunc("/post/{postID}", post(dbx))
	mux.HandleFunc("/login", loginPage(dbx))
	//mux.HandleFunc("/api/login", adminAuthorization(dbx)).Methods(http.MethodPost)

	mux.HandleFunc("/admin", adminPage(dbx))
	mux.HandleFunc("/api/post", createPost(dbx)).Methods(http.MethodPost)

	//mux.HandleFunc("/logOut", adminLogOut(dbx))

	// Указывем postID поста в URL для перехода на конкретный пост

	// Реализуем отдачу статики
	mux.PathPrefix("/static/").Handler(http.StripPrefix("/static/", http.FileServer(http.Dir("./static"))))

	log.Println("Start server" + port)
	err = http.ListenAndServe(port, mux)
	if err != nil {
		log.Fatal(err)
	}
}

func openDB() (*sql.DB, error) { // Здесь прописываем соединение к базе данных
	return sql.Open(dbDriverName, USER+":"+PASS+"@tcp("+HOST+":"+PORT+")/blog?charset=utf8mb4&collation=utf8mb4_unicode_ci&parseTime=true")
}
