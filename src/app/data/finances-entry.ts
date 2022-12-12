export class FinancesEntry
{
    private label:string;
    private value:number;
    private type:FinancesEntry.EntryType;
    private factor:FinancesEntry.EntryFactor;

    constructor(label:string, value:number, type:FinancesEntry.EntryType, factor:FinancesEntry.EntryFactor)
    {
        this.label = label;
        this.value = value;
        this.type = type;
        this.factor = factor;
    }

    public setLabel(label:string):void
    {
        this.label = label;
    }

    public getLabel():string
    {
        return this.label;
    }

    public setValue(value:number):void
    {
        this.value = value;
    }

    public getValue():number
    {
        return this.value;
    }

    public setType(type:FinancesEntry.EntryType):void
    {
        this.type = type;
    }

    public getType():FinancesEntry.EntryType
    {
        return this.type;
    }

    public setFactor(factor:FinancesEntry.EntryFactor):void
    {
        this.factor = factor;
    }

    public getFactor():FinancesEntry.EntryFactor
    {
        return this.factor;
    }
}

export namespace FinancesEntry
{
    export enum EntryType
    {
        INCOME_ENTRY = 0,
        EXPENSE_ENTRY = 1
    }

    export enum EntryFactor
    {
        Once = 0,
        Daily = 1,
        Weekly = 2,
        Monthly = 3
    }
}