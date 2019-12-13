package api

import (
	"encoding/json"
	"github.com/coda-it/gowebserver/helpers"
	"github.com/coda-it/gowebserver/router"
	"github.com/coda-it/gowebserver/session"
	"github.com/coda-it/gowebserver/store"
	"github.com/smart-evolution/shpanel/models/user"
	"github.com/smart-evolution/shpanel/utils"
	"net/http"
)

// CtrUser - api serving user data
func CtrUser(w http.ResponseWriter, r *http.Request, opt router.UrlOptions, sm session.ISessionManager, s store.IStore) {
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")

	links := map[string]map[string]string{
		"self": map[string]string{
			"href": "/api/user",
		},
	}

	embedded := map[string]string{}
	sidCookie, _ := r.Cookie("sid")
	sid := sidCookie.Value
	sess := sm.Get(sid)

	usrObj := sess.Get("user")
	if usrObj == nil {
		utils.Log("user not found")
		http.Error(w, "user not found", http.StatusNotFound)
		return
	}

	usr, ok := usrObj.(user.User)
	if !ok {
		utils.Log("error asserting user")
		http.Error(w, "error asserting user", http.StatusInternalServerError)
		return
	}

	err := json.NewEncoder(w).Encode(helpers.ServeHal(usr, embedded, links))

	if err != nil {
		utils.Log("error parsing response")
		http.Error(w, "error asserting user", http.StatusInternalServerError)
	}
}
