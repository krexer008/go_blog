package main

import (
	"html/template" // Модуль отвечает за шаблонизацию html страниц
	"log"
	"net/http"
)

type indexPage struct {
	FeaturedPosts []featuredPostData
	RecentPosts   []recentPostData
}

type featuredPostData struct {
	Title        string //'db:"title"'
	Subtitle     string
	PostCategory string
	ImgModifier  string
	Author       string
	AuthorImg    string
	PublishDate  string
}

type recentPostData struct {
	Title         string
	Subtitle      string
	PostCategory  string
	PostThumbnail string
	Author        string
	AuthorImg     string
	PublishDate   string
}

func index(w http.ResponseWriter, r *http.Request) {
	ts, err := template.ParseFiles("pages/index.html") // Главная страница блога
	if err != nil {
		http.Error(w, "Internal Server Error", 500) // В случае ошибки парсинга - возвращаем 500
		log.Println(err.Error())                    // Используем стандартный логгер для вывода ошбики в консоль
		return
	}

	data := indexPage{
		FeaturedPosts: featuredPosts(),
		RecentPosts:   recentPosts(),
	}

	err = ts.Execute(w, data) // Заставляем шаблонизатор вывести шаблон в тело ответа
	if err != nil {
		http.Error(w, "Internal Server Error", 500)
		log.Println(err.Error())
		return
	}

	log.Println("Request completed succesfully")

}

type postPage struct {
	Title          string
	Subtitle       string
	PostImage      string
	PostParagraphs []string
}

func post(w http.ResponseWriter, r *http.Request) {
	ts, err := template.ParseFiles("pages/post.html") // Главная страница блога
	if err != nil {
		http.Error(w, "Internal Server Error", 500) // В случае ошибки парсинга - возвращаем 500
		log.Println(err.Error())                    // Используем стандартный логгер для вывода ошбики в консоль
		return                                      // Не забываем завершить выполнение ф-ии
	}

	data := postPage{
		PostImage:      "static/img/intro_image_the_road_ahead.jpg",
		Title:          "The Road Ahead",
		Subtitle:       "The road ahead might be paved - it might not be.",
		PostParagraphs: postParagraphs(),
	}

	err = ts.Execute(w, data) // Заставляем шаблонизатор вывести шаблон в тело ответа
	if err != nil {
		http.Error(w, "Internal Server Error", 500)
		log.Println(err.Error())
		return
	}

	log.Println("Request completed succesfully")

}

func featuredPosts() []featuredPostData {
	return []featuredPostData{
		{
			Title:       "The Road Ahead",
			Subtitle:    "The road ahead might be paved - it might not be.",
			ImgModifier: "featured-post__background_the-road-ahead",
			Author:      "Mat Vogels",
			AuthorImg:   "static/img/mat_vogels.jpg",
			PublishDate: "September 25, 2015",
		},
		{
			Title:        "From Top Down",
			Subtitle:     "Once a year, go someplace you never been before.",
			PostCategory: "Adventure",
			ImgModifier:  "featured-post__background_from-top-down",
			Author:       "William Wong",
			AuthorImg:    "static/img/william_wong.jpg",
			PublishDate:  "September 25, 2015",
		},
	}
}

func recentPosts() []recentPostData {
	return []recentPostData{
		{
			Title:         "Still Standing Tall",
			Subtitle:      "Life begins at the end of your comfort zone.",
			PostThumbnail: "static/img/recent_post_thumbnail_still-standing-tall.jpg",
			Author:        "William Wong",
			AuthorImg:     "static/img/william_wong.jpg",
			PublishDate:   "9/25/2015",
		},
		{
			Title:         "Sunny Side Up",
			Subtitle:      "No place is ever as bad as they tell you it's going to be.",
			PostThumbnail: "static/img/recent_post_thumbnail_sunny-side-up.jpg",
			Author:        "Mat Vogels",
			AuthorImg:     "static/img/mat_vogels.jpg",
			PublishDate:   "9/25/2015",
		},
		{
			Title:         "Water Falls",
			Subtitle:      "We travel not to escape life, but for life not to escape us.",
			PostThumbnail: "static/img/recent_post_thumbnail_water_falls.jpg",
			Author:        "Mat Vogels",
			AuthorImg:     "static/img/mat_vogels.jpg",
			PublishDate:   "9/25/2015",
		},
		{
			Title:         "Through the Mist",
			Subtitle:      "Travel makes you see what a tiny place you occupy in the world.",
			PostThumbnail: "static/img/recent_post_thumbnail_through_the_mist.jpg",
			Author:        "William Wong",
			AuthorImg:     "static/img/william_wong.jpg",
			PublishDate:   "9/25/2015",
		},
		{
			Title:         "Awaken Early",
			Subtitle:      "Not all those who wander are lost.",
			PostThumbnail: "static/img/recent_post_thumbnail_awaken_early.jpg",
			Author:        "Mat Vogels",
			AuthorImg:     "static/img/mat_vogels.jpg",
			PublishDate:   "9/25/2015",
		},
		{
			Title:         "Try it Always",
			Subtitle:      "The world is a book, and those who do not travel read only one page.",
			PostThumbnail: "static/img/recent_post_thumbnail_try_it_always.jpg",
			Author:        "Mat Vogels",
			AuthorImg:     "static/img/mat_vogels.jpg",
			PublishDate:   "9/25/2015",
		},
	}
}

func postParagraphs() []string {
	return []string{
		"Dark spruce forest frowned on either side the frozen waterway. The trees had been stripped by a recent wind of their white covering of frost, and they seemed to lean towards each other, black and ominous, in the fading light. A vast silence reigned over the land. The land itself was a desolation, lifeless, without movement, so lone and cold that the spirit of it was not even that of sadness. There was a hint in it of laughter, but of a laughter more terrible than any sadness—a laughter that was mirthless as the smile of the sphinx, a laughter cold as the frost and partaking of the grimness of infallibility. It was the masterful and incommunicable wisdom of eternity laughing at the futility of life and the effort of life. It was the Wild, the savage, frozen-hearted Northland Wild.",
		"But there was life, abroad in the land and defiant. Down the frozen waterway toiled a string of wolfish dogs. Their bristly fur was rimed with frost. Their breath froze in the air as it left their mouths, spouting forth in spumes of vapour that settled upon the hair of their bodies and formed into crystals of frost. Leather harness was on the dogs, and leather traces attached them to a sled which dragged along behind. The sled was without runners. It was made of stout birch-bark, and its full surface rested on the snow. The front end of the sled was turned up, like a scroll, in order to force down and under the bore of soft snow that surged like a wave before it. On the sled, securely lashed, was a long and narrow oblong box. There were other things on the sled—blankets, an axe, and a coffee-pot and frying-pan; but prominent, occupying most of the space, was the long and narrow oblong box.",
		"In advance of the dogs, on wide snowshoes, toiled a man. At the rear of the sled toiled a second man. On the sled, in the box, lay a third man whose toil was over,—a man whom the Wild had conquered and beaten down until he would never move nor struggle again. It is not the way of the Wild to like movement. Life is an offence to it, for life is movement; and the Wild aims always to destroy movement. It freezes the water to prevent it running to the sea; it drives the sap out of the trees till they are frozen to their mighty hearts; and most ferociously and terribly of all does the Wild harry and crush into submission man—man who is the most restless of life, ever in revolt against the dictum that all movement must in the end come to the cessation of movement.",
		"But at front and rear, unawed and indomitable, toiled the two men who were not yet dead. Their bodies were covered with fur and soft-tanned leather. Eyelashes and cheeks and lips were so coated with the crystals from their frozen breath that their faces were not discernible. This gave them the seeming of ghostly masques, undertakers in a spectral world at the funeral of some ghost. But under it all they were men, penetrating the land of desolation and mockery and silence, puny adventurers bent on colossal adventure, pitting themselves against the might of a world as remote and alien and pulseless as the abysses of space.",
	}
}
