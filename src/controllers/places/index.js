import documenu from "documenu";
import { DOCUMENU_KEY } from "src/config/config";

class Places {
    constructor() {
        documenu.configure(DOCUMENU_KEY);
    }

    searchGeo(search) {
        const params = {
            "lat": search.lat,
            "lon": search.lon,
            "distance": search.distance,
            "page": search.page
        }

        return documenu.Restaurants.searchGeo(params)
    }
}

export default Places;