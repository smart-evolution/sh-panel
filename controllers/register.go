package controllers

import (
	"github.com/coda-it/gowebserver/router"
	"github.com/coda-it/gowebserver/session"
	"github.com/coda-it/gowebserver/store"
	"github.com/smart-evolution/shpanel/datasources/persistence"
	"github.com/smart-evolution/shpanel/models/user"
	"github.com/smart-evolution/shpanel/utils"
	"gopkg.in/mgo.v2/bson"
	"net/http"
)

// Register - handle register page and register user process
func Register(w http.ResponseWriter, r *http.Request, opt router.UrlOptions, sm session.ISessionManager, s store.IStore) {
	switch r.Method {
	case "GET":
		utils.RenderTemplate(w, r, "register", sm)

	case "POST":
		var newUser *user.User

		dfc := s.GetDataSource("persistence")

		p, ok := dfc.(persistence.IPersistance)
		if !ok {
			utils.Log("Invalid store")
			return
		}

		c := p.GetCollection("users")

		newUser = &user.User{
			ID:       bson.NewObjectId(),
			Username: r.PostFormValue("username"),
			Password: utils.HashString(r.PostFormValue("password")),
			APIServerIP: r.PostFormValue("api-server"),
		}

		err := c.Insert(newUser)
		if err != nil {
			utils.Log(err)
		}

		utils.Log("Registered user", newUser)

		http.Redirect(w, r, "/", http.StatusSeeOther)
	default:
	}
}
