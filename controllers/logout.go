package controllers

import (
	goutilsSession "github.com/coda-it/goutils/session"
	"github.com/coda-it/gowebserver/router"
	"github.com/coda-it/gowebserver/session"
	"github.com/coda-it/gowebserver/store"
	"github.com/smart-evolution/shpanel/constants"
	"net/http"
)

// AuthenticateLogout - logout user
func AuthenticateLogout(w http.ResponseWriter, r *http.Request, opt router.UrlOptions, sm session.ISessionManager, s store.IStore) {
	goutilsSession.ClearSession(w, constants.SessionKey)
	http.Redirect(w, r, "/", http.StatusSeeOther)
}
