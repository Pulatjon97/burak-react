export enum ProductSize { // Allowed labels for size variants.
    SMALL = "SMALL", // Small product size.
    NORMAL = "NORMAL", // Standard/default size.
    LARGE = "LARGE", // Large product size.
    SET = "SET" // A bundled set size.
}

export enum ProductVolume { // Supported numeric drink volumes.
    HALF = 0.5, // Half-unit volume.
    ONE = 1, // One-unit volume.
    ONE_POIINT_TWO = 1.2, // 1.2-unit volume (enum member spelling retained as written).
    ONE_POINT_FIVE = 1.5, // 1.5-unit volume.
    TWO = 2, // Two-unit volume.
}

export enum ProductStatus { // States that control whether a product is shown or retained.
    PAUSE = "PAUSE", // Hidden/paused product, including newly created products by default.
    PROCESS = "PROCESS", // Active product returned by public product-list/detail queries.
    DELETE = "DELETE", // Product marked for deletion/inactive handling.
}

export enum ProductCollection { // Categories used to classify products.
    DISH = "DISH", // Main dish category.
    SALAD = "SALAD", // Salad category.
    // DESSERT = "DESERT",
    DESSERT = "DESSERT", // Dessert category.
    DRINK ="DRINK", // Drink category.
    OTHER = "OTHER", // Catch-all category for other product types.

}
