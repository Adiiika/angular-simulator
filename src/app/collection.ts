class Collection<T> {
    private items: T[] = [];

    constructor(items: T[]) {
        this.items = items;
    }

    getAll(): T[] {
        return this.items;
    }

    getItem(index: number): T {
        return this.items[index];
    }

    clearCollection(): void {
        this.items = [];
    }

    deleteItem(index: number): void {
         this.items.splice(index, 1);
    }

    updateItem(index: number, newValue: T): void {
        this.items[index] = newValue;
    }
}

const animalsCollection: Collection<string> = new Collection<string>(['cat', 'dog', 'horse', 'shark']);
const NumbersAndStringCollection: Collection<number | string> = new Collection<number | string>(['adam', 23, 'bagdad', 2026]);

