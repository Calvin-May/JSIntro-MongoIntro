namespace core {
  export class Router {
    // Private Instance Members

    private m_activeLink: string;
    private m_routingTable: string[];
    private m_linkData: string;


    // Getters / Setters
    /**
     * @returns {string}
     */
    public get ActiveLink(): string {
      return this.m_activeLink;
    }

    /**
     * @param {string} link
     */
    public set ActiveLink(link: string) {
      this.m_activeLink = link;
    }

     // Getters / Setters
    /**
     * @returns {string}
     */
    public get LinkData(): string {
      return this.m_linkData;
    }

    /**
     * @param {string} data
     */
    public set LinkData(data: string) {
      this.m_linkData = data;
    }

    // Constructor
    /**
     * Creates a new instance of the Router class
     *
     * @constructor
     */
    constructor() {
      this.m_activeLink = "";
      this.m_routingTable = new Array<string>();  // Creates an empty string array collections
      //this.m_routingTable = [];  // Creates an empty array collection
      this.m_linkData = ""
    }

    // Public Methods
    /**
     * Method that adds a new route to the routing table
     *
     * @param {string} route
     * @returns {void}
     */
    Add(route: string): void {
      this.m_routingTable.push(route);
    }

    /**
     * Replaces the Reference to the Routing Table, to a new array
     *
     * @param {string[]} routingTable
     * @returns {void}
     */
    AddRoutingTable(routingTable: string[]): void {
      this.m_routingTable = routingTable;
    }

    /**
     * Returns the index of a route that exists within the Routing Table. Returns
     * -1 if the route is not found.
     *
     * @param {string} route
     * @returns {number}
     */
    Find(route: string): number {
      return this.m_routingTable.indexOf(route);
    }

    /**
     * Removes a Route from the Routing Table. It returns
     * true if the route was successfully removed, otherwise
     * it returns false.
     *
     * @param {string} route
     * @returns {boolean}
     */
    RemoveRoute(route: string): boolean {
      // Check if the Route exists and remove from the Routing table then return true
      if (this.Find(route) > -1) {
        this.m_routingTable.splice(this.Find(route), 1);
        return true;
      }
      // Return false if no route is found
      return false;
    }

    // Public Override Methods
    /**
     * Overrides the default toString() method, returning the Routing Table as a
     * comma-separated string
     *
     * @override
     * @returns {string}
     */
    toString(): string {
      return this.m_routingTable.toString();
    }
  }

}

let router: core.Router = new core.Router();

router.AddRoutingTable([
  "/", // Default Route
  "/home",
  "/about",
  "/services",
  "/contact",
  "/edit",
  "/contact-list",
  "/projects",
  "/register",
  "/login",
]);

let route: string = location.pathname; // Alias for location.pathname

// Check the Route, either return Home, the target page, or 404
router.ActiveLink = router.Find(route) > -1
    ? (route == "/" ? "home" : route.substring(1))
    : "404";
