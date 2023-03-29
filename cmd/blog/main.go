package main

import (
	"log"
	"net/http"
	//_ "github.com/go-sql-driver/mysql" // Импортируем для возможности подключения к MySQL
	//"github.com/jmoiron/sqlx"
)

const /*{*/ port = ":3000"

//dbDriverName: = ""
//}

func main() {
	//db, err := sql.Open(“mysql”, “root:1234@tcp(localhost:3306)/blog”)

	mux := http.NewServeMux()
	mux.HandleFunc("/home", index)
	mux.HandleFunc("/post", post)

	// Реализуем отдачу статики
	fileSrever := http.FileServer(http.Dir("./static"))

	mux.Handle("/static/", http.StripPrefix("/static/", fileSrever))

	log.Println("Start server" + port)
	err := http.ListenAndServe(port, mux)
	if err != nil {
		log.Fatal(err)
	}
}
