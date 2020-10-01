package main

import (
	"errors"
	"github.com/coda-it/goutils/logger"
	"github.com/coda-it/gowebserver"
	"github.com/smart-evolution/shpanel/controllers"
	"github.com/smart-evolution/shpanel/controllers/api"
	"github.com/smart-evolution/shpanel/datasources/persistence"
	"github.com/smart-evolution/shpanel/utils"
	"os"
)

//go:generate bash ./scripts/version.sh ./scripts/version_tpl.txt ./version.go

// WebServer - adapter for gowebserver instance
type WebServer struct {
	server *gowebserver.WebServer
}

func getServerAddress(port string) (string, error) {
	if port == "" {
		return "", errors.New("SH_HTTP_PORT is not set")
	}
	return ":" + port, nil
}

// New - creates new WebServer instance
func New(port string, p *persistence.Persistance) *WebServer {
	addr, err := getServerAddress(port)

	if err != nil {
		logger.Log(err)
	}

	serverOptions := gowebserver.WebServerOptions{
		Port:           addr,
		StaticFilesUrl: "/static/",
		StaticFilesDir: "public",
	}

	server := gowebserver.New(serverOptions, controllers.NotFound)
	server.Router.AddRoute("/admin", controllers.CtrAdmin)
	server.Router.AddRoute("/agent/{agent}", controllers.CtrDashboard)
	server.Router.AddRoute("/agent/{agent}/edit", controllers.CtrAgentEdit)
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
	SHPanelMongoURI := os.Getenv("SH_PANEL_MONGO_URI")
	SHPanelMongoDB := os.Getenv("SH_PANEL_MONGO_DB")
	SHHTTPPort := os.Getenv("SH_HTTP_PORT")
	SHAPIServerPort := os.Getenv("SH_API_SRV_PORT")

	logger.Log("Staring sh-panel with the following ENV variables")
	logger.Log("SH_PANEL_MONGO_URI = " + SHPanelMongoURI)
	logger.Log("SH_PANEL_MONGO_DB = " + SHPanelMongoDB)
	logger.Log("SH_HTTP_PORT = " + SHHTTPPort)
	logger.Log("SH_API_SRV_PORT = " + SHAPIServerPort)

	utils.VERSION = VERSION

	p := persistence.New(
		SHPanelMongoURI,
		SHPanelMongoDB,
	)

	ws := New(SHHTTPPort, p)
	ws.RunService()
}
