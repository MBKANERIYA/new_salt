const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

const frontendSrc = path.join(__dirname, 'frontend', 'src');

walkDir(frontendSrc, (filePath) => {
    if (filePath.endsWith('.jsx')) {
        let content = fs.readFileSync(filePath, 'utf8');
        let modified = false;

        // Replace `<Link to={\`/Productdetails/${item.product_id}\`}`
        // with `<Link to={\`/Productdetails/${item.title ? item.title.replace(/[\\s/]+/g, '-').toLowerCase() : item.product_id}\`}`
        
        const replacements = [
            {
                pattern: /\/Productdetails\/\$\{item\.product_id\}/g,
                replacement: '/Productdetails/${item.title ? item.title.replace(/[\\s/]+/g, \'-\').toLowerCase() : item.product_id}'
            },
            {
                pattern: /\/Productdetails\/\$\{item\._id\}/g,
                replacement: '/Productdetails/${item.title ? item.title.replace(/[\\s/]+/g, \'-\').toLowerCase() : item._id}'
            },
            {
                pattern: /\/Productdetails\/\$\{item\.id\}/g,
                replacement: '/Productdetails/${item.title ? item.title.replace(/[\\s/]+/g, \'-\').toLowerCase() : item.id}'
            },
            {
                pattern: /\/Productdetails\/\$\{product_id\}/g,
                replacement: '/Productdetails/${title ? title.replace(/[\\s/]+/g, \'-\').toLowerCase() : product_id}'
            },
            {
                pattern: /\/Productdetails\/\$\{item\.productId\.product_id\}/g,
                replacement: '/Productdetails/${item.productId.title ? item.productId.title.replace(/[\\s/]+/g, \'-\').toLowerCase() : item.productId.product_id}'
            },
            {
                pattern: /\/Productdetails\/\$\{item\.product_id \|\| item\.id\}/g,
                replacement: '/Productdetails/${item.title ? item.title.replace(/[\\s/]+/g, \'-\').toLowerCase() : (item.product_id || item.id)}'
            }
        ];

        replacements.forEach(r => {
            if (content.match(r.pattern)) {
                content = content.replace(r.pattern, r.replacement);
                modified = true;
            }
        });

        // Also handle the navigate() calls
        // navigate(`/Productdetails/${id}`);
        // Can't replace navigate cleanly without knowing if `title` is defined. In Mainpage.jsx, the navigate might just use id.
        // Wait, Mainpage.jsx has: navigate(`/Productdetails/${id}`); at line 682, which corresponds to `item` context. 
        // Let's manually fix any navigate or check them.

        if (modified) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log('Modified:', filePath);
        }
    }
});
