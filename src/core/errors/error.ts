export abstract class PlotnotionError extends Error {
    statusCode: number
    name: string

    constructor(msg: string, name: string, status: number) {
        super(msg);
        this.name = name;
        this.statusCode = status;
    }

    toJSON() {
        return {
            "status": this.statusCode,
            "name": this.name,
            "message": this.message
        }
    }
}
