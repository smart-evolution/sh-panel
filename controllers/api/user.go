package api

import (
	"encoding/json"
	"github.com/coda-it/gowebserver/helpers"
	"github.com/coda-it/gowebserver/router"
	"github.com/coda-it/gowebserver/session"
	"github.com/coda-it/gowebserver/store"
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
	session := sm.Get(sid)
	data := session.Get("user")

	json.NewEncoder(w).Encode(helpers.ServeHal(data, embedded, links))
}
