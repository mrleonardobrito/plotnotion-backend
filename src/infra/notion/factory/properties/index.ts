import { RawData } from "@/core/domain/model/Column"

import { 
    DatePropertyItemObjectResponse, 
    FormulaPropertyItemObjectResponse, 
    MultiSelectPropertyItemObjectResponse, 
    NumberPropertyItemObjectResponse, 
    PageObjectResponse, 
    PropertyItemObjectResponse,  
    SelectPropertyItemObjectResponse, 
    StatusPropertyItemObjectResponse, 
    TitlePropertyItemObjectResponse 
} from "@notionhq/client/build/src/api-endpoints"

abstract class Property {
    abstract getPropertyData(property: PropertyItemObjectResponse): RawData
}

class TitleProperty extends Property {
    getPropertyData(property: TitlePropertyItemObjectResponse): RawData {
        return property.title[0] ? property.title[0].plain_text : '(title)'
    }
}

class NumberProperty extends Property {
    getPropertyData(property: NumberPropertyItemObjectResponse): RawData {
        return property.number ? property.number : 0
    }
}

class DateProperty extends Property {
    getPropertyData(property: DatePropertyItemObjectResponse): RawData {
        return property.date?.start ? property.date.start : '(no date)'
    }
}

class SelectProperty extends Property {
    getPropertyData(property: SelectPropertyItemObjectResponse): RawData {
        return property.select? property.select.name : '(no select)'
    }
}

class MultiSelectProperty extends Property {
    getPropertyData(property: MultiSelectPropertyItemObjectResponse): RawData {
        return property.multi_select.map((select) => select.name).join(', ') || '(no select)'
    }
}

class StatusProperty extends Property {
    getPropertyData(property: StatusPropertyItemObjectResponse): RawData {
        return property.status?.name ? property.status.name : '(no status)'
    }
}

class FormulaProperty extends Property {
    getPropertyData(property: FormulaPropertyItemObjectResponse): RawData {
        switch(property.formula.type) {
            case 'number':
                return property.formula.number ? property.formula.number : 0
            case 'string':
                return property.formula.string ? property.formula.string : '(empty)'
            case 'boolean':
                return property.formula.boolean ? String(property.formula.boolean) : 'false'
            case 'date':
                return property.formula.date?.start ? property.formula.date.start : '(no date)'
            default:
                return '(formula)'
        }
    }
}

class PropertyFactory {
    static getPropertyRowData(property: PropertyItemObjectResponse): RawData {
        switch(property.type) {
            case 'title':
                return new TitleProperty().getPropertyData(property)
            case 'number':
                return new NumberProperty().getPropertyData(property)
            case 'date':
                return new DateProperty().getPropertyData(property)
            case 'select':
                return new SelectProperty().getPropertyData(property)
            case 'multi_select':
                return new MultiSelectProperty().getPropertyData(property)
            case 'formula':
                return new FormulaProperty().getPropertyData(property)
            case 'status':
                return new StatusProperty().getPropertyData(property)
            default:
                return null
        }
    }

    static isHandledProperty(propertyType: string): boolean {
        switch(propertyType) {
            case 'title':
            case 'number':
            case 'date':
            case 'select':
            case 'multi_select':
            case 'formula':
            case 'status':
                return true
            default:
                return false
        }
    }   

    static getPropertyDataFromPage(page: PageObjectResponse): RawData[] {
        return Object.keys(page.properties).map((key) => {
            const property = page.properties[key] as PropertyItemObjectResponse
            return PropertyFactory.getPropertyRowData(property)
        })
    }
}

export default PropertyFactory