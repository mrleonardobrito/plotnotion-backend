import { PlotnotionError } from "./error";
import { CommomMessages } from "../messages/CommomMessages";

const { UnavailableServiceErrorMessage } = CommomMessages

class ServiceUnavailableError extends PlotnotionError {
    constructor(msg: string = UnavailableServiceErrorMessage) {
        super(msg, "ServiceUnavailableError", 503)
    }
}

export default ServiceUnavailableError