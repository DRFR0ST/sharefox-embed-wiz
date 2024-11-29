

export const generateEmbedScript = ({siteName}: { siteName: string }) => {
    return `<script id="sharefox-embed-script" data-shop="${siteName}" src="https://${siteName}.mysharefox.com/embed.min.js" async></script>`;
}

export const generateEmbedDivEl = ({ embedType, siteName }: { embedType: string, siteName: string }) => {
    switch(embedType) {
        case 'popular-products':
            return <div data-path="products-popular" data-shop={siteName} data-volume="4" className="sharefox-embed" style={{ "width": "100%", "height": "282px" }}></div>;
        case 'simple-search':
            return <div data-path="search" className="sharefox-embed" style={{ "width": "100%", "height": "90px" }}></div>;
        case 'advanced-search':
            return <div data-path="search-advanced" className="sharefox-embed" style={{ "width": "346px", "height": "440px" }}></div>;
    }
}

export const generateEmbedDiv = ({ embedType, siteName }: { embedType: string, siteName: string }, embedProps: Record<string, any>, embedStyle: Record<string, any>) => {
    let props = ``;

    try {
        for(const prop in embedProps) {
            props += ` ${prop !== "width" && prop !== 'height' ? 'data-' : ''}${prop}="${embedProps[prop].value}"`;
        }
    } catch(err) {
        props = "";
    }
    
    // Parse embedStyle into inline css
    let style = ``;

    try {
        for(const prop in embedStyle) {
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
    }
}