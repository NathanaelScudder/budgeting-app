import { nanoid } from "nanoid";

import {Item} from 'linked-list'

export class FinancesEntry extends Item
{
    private label:string;
    private value:number;
    private type:FinancesEntry.EntryType;
    private factor:FinancesEntry.EntryFactor;
    private id:string;

    constructor(label:string, value:number, type:FinancesEntry.EntryType, factor:FinancesEntry.EntryFactor)
    {
        super();
        this.label = label;
        this.value = value;
        this.type = type;
        this.factor = factor;
        this.id = nanoid(8);
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

    public getFactorString():string
    {
        return FinancesEntry.EntryFactor[this.factor];
    }

    public getID():string
    {
        return this.id;
    }

    public clone(entry:FinancesEntry):void
    {
        this.value = entry.value;
        this.type = entry.type;
        this.factor = entry.factor;
        this.label = entry.label;
    }

    public equals(entry:FinancesEntry):boolean
    {
        return this.getID() == entry.getID();
    }

    public override toString():string
    {
        return `${(this.type == FinancesEntry.EntryType.INCOME_ENTRY) ? "Income entry" : "Expense entry"} for
                ${this.label} at $${this.value}${(this.factor == FinancesEntry.EntryFactor.Once) ? "" : ", " + this.getFactorString()}
               `
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