package main

import (
	"database/sql"

	_ "github.com/go-sql-driver/mysql" // Импортируем для возможности подключения к MySQL
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
	postId       = 1
)

func main() {
	// Получаем клиента к БД и ошибку в случае, если не удалось подключиться
	db, err := openDB() // Открываем соединение к базе данных в самом начале
	if err != nil {
		log.Fatal(err)
	}

	dbx := sqlx.NewDb(db, dbDriverName) // Расширяем стандартный клиент к базе

	//db.Query()
	postLink := "/post"
	mux := http.NewServeMux()
	mux.HandleFunc("/home", index(dbx)) // Передаём клиент к базе данных в ф-ию обработчик запроса
	mux.HandleFunc(postLink, post(dbx, postId))

	// Реализуем отдачу статики
	fileSrever := http.FileServer(http.Dir("./static"))

	mux.Handle("/static/", http.StripPrefix("/static/", fileSrever))

	log.Println("Start server" + port)
	err = http.ListenAndServe(port, mux)
	if err != nil {
		log.Fatal(err)
	}
}

func openDB() (*sql.DB, error) {
	// Здесь прописываем соединение к базе данных
	return sql.Open(dbDriverName, USER+":"+PASS+"@tcp("+HOST+":"+PORT+")/blog?charset=utf8mb4&collation=utf8mb4_unicode_ci&parseTime=true")
}
