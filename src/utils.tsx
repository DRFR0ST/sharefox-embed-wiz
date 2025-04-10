import { EMBED_FIELDS } from "./constants";

export const generateEmbedScript = ({siteName, hostname, embedUrl }: { siteName: string, hostname?: string, embedUrl?: string }) => {
    const _hostname = hostname ? ` data-hostname="${hostname}"` : "";
    const _src = embedUrl ? `src="${embedUrl}"` : `src="https://${siteName}.mysharefox.com/embed.min.js"`;

    return `<script id="sharefox-embed-script" data-shop="${siteName}"${_hostname} ${_src} async></script>`;
}

export const generateEmbedDivEl = ({ embedType, siteName }: { embedType: string, siteName: string }) => {
    switch(embedType) {
        case 'popular-products':
            return <div data-path="products-popular" data-shop={siteName} data-volume="4" className="sharefox-embed" style={{ "width": "100%", "height": "282px" }}></div>;
        case 'simple-search':
            return <div data-path="search" className="sharefox-embed" style={{ "width": "100%", "height": "90px" }}></div>;
        case 'advanced-search':
            return <div data-path="search-advanced" className="sharefox-embed" style={{ "width": "346px", "height": "440px" }}></div>;
        case 'product-booking':
            return <div data-path="product-booking" data-id="1021" className="sharefox-embed" style={{ "width": "346px", "height": "440px" }}></div>;
    }
}

export const generateEmbedDiv = ({ embedType, siteName }: { embedType: string, siteName: string }, embedProps: Record<string, any>, embedStyle: Record<string, any>) => {
    let props = ``;

    try {
        for(const prop in embedProps) {
            props += ` ${prop !== "width" && prop !== 'height' ? 'data-' : ''}${prop}="${embedProps[prop]}"`;
        }
    } catch(err) {
        props = "";
    }
    
    // Parse embedStyle into inline css
    let style = ``;

    try {
        for(const prop in embedStyle) {
            if(prop === "width" || prop === "height") {
                style += `${prop}: ${embedStyle[prop]}px;`;
                continue;
            }
            style += `${prop}: ${embedStyle[prop]};`;
        }
    } catch(err) {
        style = "";
    }

    switch(embedType) {
        case 'popular-products':
            return `<div data-path="products-popular" data-shop="${siteName}" class="sharefox-embed"${props} style="${style}"></div>`;
        case 'simple-search':
            return `<div data-path="search" class="sharefox-embed" data-shop="${siteName}"${props} style="${style}"></div>`;
        case 'advanced-search':
            return `<div data-path="search-advanced" class="sharefox-embed" data-shop="${siteName}"${props} style="${style}"></div>`;
        case 'product-booking': {
            const adjustedProps = props.replace("data-product-id=", "data-id=");
            return `<div data-path="product-booking" class="sharefox-embed" data-shop="${siteName}"${adjustedProps} style="${style}"></div>`;
        }
    }
}

export const flattenEmbedFields = (embedFields: typeof EMBED_FIELDS[keyof typeof EMBED_FIELDS]) => {
    return Object.keys(embedFields).reduce((acc, key) => {
        acc[key] = embedFields[key].value;
        return acc;
    }, {});
}
