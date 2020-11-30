package controllers

import (
	"errors"
	"github.com/coda-it/goutils/hash"
	"github.com/coda-it/goutils/logger"
	goutilsSession "github.com/coda-it/goutils/session"
	"github.com/coda-it/gowebserver/router"
	"github.com/coda-it/gowebserver/session"
	"github.com/coda-it/gowebserver/store"
	"github.com/smart-evolution/shpanel/constants"
	"github.com/smart-evolution/shpanel/datasources/persistence"
	"github.com/smart-evolution/shpanel/models/user"
	"github.com/smart-evolution/shpanel/utils"
	"gopkg.in/mgo.v2/bson"
	"net/http"
	"time"
)

// Authenticate - handle login page and login process
func Authenticate(w http.ResponseWriter, r *http.Request, opt router.UrlOptions, sm session.ISessionManager, s store.IStore) {
	defer r.Body.Close()

	switch r.Method {
	case "GET":
		_, ok := r.URL.Query()["err"]
		params := make(map[string]interface{})

		if ok {
			params["IsError"] = true
		}

		utils.RenderTemplate(w, r, "login", sm, params)

	case "POST":
		sessionID, _ := goutilsSession.GetSessionID(r, constants.SessionKey)
		isLogged := sm.IsExist(sessionID)

		if !isLogged {
			user := r.PostFormValue("username")
			password := hash.EncryptString(r.PostFormValue("password"))
			expiration := time.Now().Add(365 * 24 * time.Hour)

			dfc := s.GetDataSource("persistence")

			p, ok := dfc.(persistence.IPersistance)
			if !ok {
				logger.Log("Invalid store")
				return
			}

			authenticatedUser, err := authenticateUser(user, password, p)

			if err == nil {
				logger.Log("Logged in as user", user)
				t := time.Now()
				timeStr := t.Format(time.RFC850)
				cookieValue := goutilsSession.CreateSessionID(user, password, timeStr)

				cookie := http.Cookie{
					Name:    constants.SessionKey,
					Value:   cookieValue,
					Expires: expiration}

				session := sm.Create(cookieValue)
				session.Set("user", authenticatedUser)

				http.SetCookie(w, &cookie)
				http.Redirect(w, r, "/", http.StatusSeeOther)
			} else {
				logger.Log(err)
				http.Redirect(w, r, "/login?err", http.StatusSeeOther)
			}
		}

		http.Redirect(w, r, "/login", http.StatusSeeOther)

	default:
	}
}

func authenticateUser(username string, password string, persistance persistence.IPersistance) (user.User, error) {
	var user user.User

	c := persistance.GetCollection("users")

	err := c.Find(bson.M{
		"username": username,
		"password": password,
	}).One(&user)

	if err != nil {
		return user, errors.New("User '" + username + "' not found")
	}
	return user, nil
}
