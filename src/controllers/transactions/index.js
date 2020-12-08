
class Transactions {
	constructor() {}

	history(search) {
		return Promise.resolve({
            data: [],
            page: search.page,
            limit: search.limit
        });
	}
}

export default Transactions;
