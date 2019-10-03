package utils

import (
	"github.com/coda-it/gowebserver/session"
	"github.com/smart-evolution/shpanel/models/page"
	"html/template"
	"net/http"
	"os"
	"path/filepath"
)

// RenderTemplate - helper for page rendering
func RenderTemplate(
	w http.ResponseWriter,
	r *http.Request,
	name string,
	sm session.ISessionManager,
) {
	sessionID, _ := GetSessionID(r)
	isLogged := sm.IsExist(sessionID)

	if !isLogged {
		ClearSession(w)

		if r.URL.Path != "/login" && r.URL.Path != "/login/register" {
			http.Redirect(w, r, "/login", http.StatusSeeOther)
		}
	}

	dir, err := filepath.Abs(filepath.Dir(os.Args[0]))

	if err != nil {
		Log(err)
	}

	templateModel := page.Page{
		Version:  VERSION,
		Title:    name,
		IsLogged: isLogged,
	}

	tpl := template.Must(
		template.ParseFiles(
			dir+"/views/"+name+".html",
			dir+"/views/navigation.html",
			dir+"/views/view.html",
		),
	)
	tpl.ExecuteTemplate(w, "base", templateModel)
}
