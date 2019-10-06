package main

import (
	"errors"
	"github.com/coda-it/gowebserver"
	"github.com/smart-evolution/shpanel/controllers"
	"github.com/smart-evolution/shpanel/datasources/persistence"
	"github.com/smart-evolution/shpanel/utils"
	"github.com/smart-evolution/shpanel/controllers/api"
	"os"
)

//go:generate bash ./scripts/version.sh ./scripts/version_tpl.txt ./version.go

// WebServer - adapter for gowebserver instance
type WebServer struct {
	server *gowebserver.WebServer
}

func getServerAddress(port string) (string, error) {
	if port == "" {
		return "", errors.New("Port not set")
	}
	return ":" + port, nil
}

// New - creates new WebServer instance
func New(port string, p *persistence.Persistance) *WebServer {
	addr, err := getServerAddress(port)

	if err != nil {
		utils.Log(err)
	}

	serverOptions := gowebserver.WebServerOptions{
		Port:           addr,
		StaticFilesUrl: "/static/",
		StaticFilesDir: "public",
	}

	server := gowebserver.New(serverOptions, controllers.NotFound)
	server.Router.AddRoute("/", controllers.CtrDashboard)
	server.Router.AddRoute("/login/register", controllers.Register)
	server.Router.AddRoute("/login/logout", controllers.AuthenticateLogout)
	server.Router.AddRoute("/login", controllers.Authenticate)
	server.Router.AddRoute("/api/user", api.CtrUser)
	server.AddDataSource("persistence", p)

	return &WebServer{
		server: server,
	}
}

// RunService - runs WebServer process
func (ws *WebServer) RunService() {
	ws.server.Run()
}

func main() {
	p := persistence.New(
		os.Getenv("SH_PANEL_MONGO_URI"),
		os.Getenv("SH_PANEL_MONGO_DB"),
	)

	ws := New(os.Getenv("SH_PANEL_PORT"), p)
	ws.RunService()
}
