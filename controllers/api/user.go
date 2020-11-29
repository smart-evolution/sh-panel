package api

import (
	"encoding/json"
	"github.com/coda-it/goutils/logger"
	"github.com/coda-it/gowebserver/helpers"
	"github.com/coda-it/gowebserver/router"
	"github.com/coda-it/gowebserver/session"
	"github.com/coda-it/gowebserver/store"
	"github.com/smart-evolution/shpanel/constants"
	"github.com/smart-evolution/shpanel/models/user"
	"github.com/smart-evolution/shpanel/services/featureflags"
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

	embedded := map[string]map[string]bool{}
	embedded["featureFlags"] = make(map[string]bool)

	sidCookie, err := r.Cookie(constants.SessionKey)

	if err != nil {
		msg := "session does not exist"
		logger.Log(msg)
		http.Error(w, msg, http.StatusNotFound)
		return
	}

	sid := sidCookie.Value
	sess := sm.Get(sid)

	usrObj := sess.Get("user")
	if usrObj == nil {
		logger.Log("user not found")
		http.Error(w, "user not found", http.StatusNotFound)
		return
	}

	usr, ok := usrObj.(user.User)
	if !ok {
		logger.Log("error asserting user")
		http.Error(w, "error asserting user", http.StatusInternalServerError)
		return
	}

	isSoundChartEnabled, _ := featureflags.GetFeatureFlag("isAwesomeFeatureEnabled", true)
	embedded["featureFlags"]["isSoundChartEnabled"] = isSoundChartEnabled

	isAdminEnabled, _ := featureflags.GetFeatureFlag("isAdminEnabled", true)
	embedded["featureFlags"]["isAdminEnabled"] = isAdminEnabled

	err = json.NewEncoder(w).Encode(helpers.ServeHal(usr, embedded, links))

	if err != nil {
		logger.Log("error parsing response")
		http.Error(w, "error asserting user", http.StatusInternalServerError)
	}
}
