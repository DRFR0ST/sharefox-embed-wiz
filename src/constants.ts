import { EmbedType } from "./types";

// export const EMBED_STYLE = {
//     'popular-products': {
//         width: "100%",
//         height: "282px"
//     },
//     'simple-search': {
//         width: "100%",
//         height: "90px"
//     },
//     'advanced-search': {
//         width: "346px",
//         height: "440px"
//     }
// }

export const EMBED_STYLE = {
    'popular-products': {
        width: "850px",
        height: "284px"
    },
    'simple-search': {
        width: "850px",
        height: "66px"
    },
    'advanced-search': {
        width: "346px",
        height: "440px"
    }
}

export const EMBED_FIELDS: Record<EmbedType, Record<string, { type: string, value: any, label: string, description: string }>> = {
    'popular-products': {
        volume: {
            type: "number",
            value: 4,
            label: "Volume",
            description: "The number of products to display in the embed.",
        }
    },
    'simple-search': {
        'products-path': {
            type: "string",
            value: "/products",
            label: "Products Path",
            description: "The subpage of the “products” page. It will be used in the redirect after submitting the search query.",
        }
    },
    'advanced-search': {
        'products-path': {
            type: "string",
            value: "/products",
            label: "Products Path",
            description: "The subpage of the “products” page. It will be used in the redirect after submitting the search query.",
        }
    }
}