import { StateService } from '../services/state.service';

export abstract class ProxyBaseComponent {
    constructor(private state: StateService) {
    }

    initialize() {
        this.state.initializeLocalStorage();
    }
}