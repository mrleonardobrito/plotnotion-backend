abstract class Model {
    static fromJson(_: Record<string, unknown>): Model {
        throw new Error('you need to implement the fromJSON method')
    }
}

export default Model