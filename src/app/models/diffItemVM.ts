import {DiffDirFileItem} from "../depot/diffDirectories";


export class DiffItemVM
{
    // region Data Members
    private readonly _item:                DiffDirFileItem;
    private readonly _selectedActionIndex: number | undefined;
    // endregion


    /**
     * @constructor
     * @param item - The item resulting from the directory comparison
     * @param selectedActionIndex - The index of the currently selected action
     * for this file item.
     */
    public constructor(item: DiffDirFileItem, selectedActionIndex?: number)
    {
        this._item = item;
        this._selectedActionIndex = makeIndexValid(item.actions.length, selectedActionIndex);
    }


    public get diffDirFileItem(): DiffDirFileItem
    {
        return this._item;
    }


    public get selectedActionIndex(): number
    {
        return this._selectedActionIndex;
    }


}


/**
 * Coerces the specified array index to a valid index value.
 * @param arrayLength - The length of the array
 * @param idx - The index value to be coerced
 * @return `undefined` if the array is 0-length.
 *         0 if the specified index is too low.
 *         The maximum index if the specified index is too high.
 *         The specified index if it is valid.
 */
function makeIndexValid(arrayLength: number, idx?: number): undefined | number
{
    // If it is a 0-length array, there are no valid indices.
    if (length === 0) {
        return undefined;
    }

    if (idx === undefined) {
        return 0;
    }

    const minIndex = 0;
    const maxIndex = arrayLength - 1;

    if (idx < minIndex) {
        return 0;
    }

    if (idx > maxIndex) {
        return maxIndex;
    }

    return idx;
}
