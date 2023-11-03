import { PlotnotionError } from "./error"
import { CommomMessages } from "../messages/CommomMessages"

const { UnexpectedInternalErrorMessage } = CommomMessages

class UnexpectedInternalError extends PlotnotionError {
    constructor(msg: string = UnexpectedInternalErrorMessage) {
        super(msg, "UnexpectedInternalError", 500)
    }
}

export default UnexpectedInternalError