package controllers

import (
	"fmt"
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
	"strings"
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

		apiServer := r.PostFormValue("api-server")
		username := r.PostFormValue("username")
		password := r.PostFormValue("password")

		newUser = &user.User{
			ID:          bson.NewObjectId(),
			Username:    username,
			Password:    password,
			APIServerIP: apiServer,
		}

		err := c.Insert(newUser)
		if err != nil {
			fmt.Println(err)
			utils.Log("Error registering user '" + username + "'")
			return
		}
		utils.Log("Registered user '" + username + "'")

		utils.Log("Registering user in API server " + apiServer)
		form := url.Values{}
		form.Add("username", username)
		form.Add("password", password)

		rApi, err := http.NewRequest("POST", "http://"+apiServer+":"+os.Getenv("SH_API_PORT")+"/login/register", strings.NewReader(form.Encode()))

		if err != nil {
			utils.Log("Error constructing register request to '" + apiServer + "' for the user '" + username + "'")
		}

		clientApi := http.Client{}
		_, err = clientApi.Do(rApi)
		if err != nil {
			fmt.Println(err)
			utils.Log("Error registering user in API server " + apiServer)
		}

		http.Redirect(w, r, "/", http.StatusSeeOther)
	default:
	}
}
