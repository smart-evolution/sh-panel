package controllers

import (
	"fmt"
	"github.com/coda-it/goutils/logger"
	"github.com/coda-it/gowebserver/router"
	"github.com/coda-it/gowebserver/session"
	"github.com/coda-it/gowebserver/store"
	"github.com/smart-evolution/shpanel/datasources/persistence"
	"github.com/smart-evolution/shpanel/models/user"
	"github.com/smart-evolution/shpanel/utils"
	"gopkg.in/mgo.v2/bson"
	"net/http"
	"net/url"
	"os"
)

// Register - handle register page and register user process
func Register(w http.ResponseWriter, r *http.Request, opt router.UrlOptions, sm session.ISessionManager, s store.IStore) {
	switch r.Method {
	case "GET":
		utils.RenderTemplate(w, r, "register", sm, make(map[string]interface{}))

	case "POST":
		var newUser *user.User

		dfc := s.GetDataSource("persistence")

		p, ok := dfc.(persistence.IPersistance)
		if !ok {
			logger.Log("Invalid store")
			return
		}

		c := p.GetCollection("users")

		apiServer := r.PostFormValue("api-server")
		username := r.PostFormValue("username")
		password := utils.HashString(r.PostFormValue("password"))

		newUser = &user.User{
			ID:          bson.NewObjectId(),
			Username:    username,
			Password:    password,
			APIServerIP: apiServer,
		}

		err := c.Insert(newUser)
		if err != nil {
			fmt.Println(err)
			logger.Log("Error registering user '" + username + "'")
			return
		}
		logger.Log("Registered user '" + username + "'")

		logger.Log("Registering user in API server " + apiServer)
		form := url.Values{}
		form.Add("username", username)
		form.Add("password", password)

		registerURL := "http://" + apiServer + ":" + os.Getenv("SH_API_SRV_PORT") + "/login/register"
		_, err = http.PostForm(registerURL, form)

		if err != nil {
			fmt.Println(err)
			logger.Log("Error registering user in endpoint " + registerURL)
		}

		http.Redirect(w, r, "/", http.StatusSeeOther)
	default:
	}
}
