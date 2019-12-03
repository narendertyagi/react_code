import { observable, action } from 'mobx';

export class GlobalStore {
	@observable routes = [];
	// @observable menu = [];
	// @observable submenu = [];

	@observable menu = {};

	// @observable demo = null;
	@observable searchText = null;
	@observable cartItemsCount = 0;

	
}

