package page

// Page - entity representing page
type Page struct {
	Version  string
	Title    string
	IsLogged bool
	IsAdmin  bool
	Params   map[string]interface{}
	Name     string
}
