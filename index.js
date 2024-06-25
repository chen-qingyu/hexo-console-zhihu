'use strict';

const front = require('hexo-front-matter');
const fs = require('fs');
const path = require('path');

hexo.extend.console.register('zhihu', 'Run the hexo-console-zhihu plugin', {
    desc: 'Execute conversion: remove front-matter and replace single line formula symbols',
    usage: '[postname]',
    arguments: [
        { name: 'postname', desc: 'The specified article name.' }
    ]
}, function (args) {
    const specificPost = args._.length > 0 ? path.basename(args._[0], '.md') : null;

    const postsDir = path.join(hexo.source_dir, '_posts');
    const posts = fs.readdirSync(postsDir);

    posts.forEach(post => {
        if (path.basename(post).includes('.zhihu.md')) {
            return;
        }

        if (path.extname(post) !== '.md') {
            return;
        }

        const postBaseName = path.basename(post, '.md');

        // if an article is specified, skip other articles
        if (specificPost && specificPost !== postBaseName) {
            return;
        }

        const filePath = path.join(postsDir, post);
        let content = fs.readFileSync(filePath, 'utf8');

        // remove front-matter
        content = front.parse(content.replace(/\r\n/g, '\n'))._content;

        // replace the inline formula
        content = content.replace(/\$\$/g, 'DOUBLE_DOLLAR_TEMP_TAG'); // $$e$$ -> DOUBLE_DOLLAR_TEMP_TAGeDOUBLE_DOLLAR_TEMP_TAG
        content = content.replace(/\$(.*?)\$/g, '$$$$$1$$$$'); // $e$ -> $$e$$
        content = content.replace(/DOUBLE_DOLLAR_TEMP_TAG/g, '$$$$'); // DOUBLE_DOLLAR_TEMP_TAGeDOUBLE_DOLLAR_TEMP_TAG -> $$e$$

        const newFilePath = path.join(postsDir, `${postBaseName}.zhihu.md`);

        fs.writeFileSync(newFilePath, content, 'utf8');
        console.log(`Processed: ${newFilePath}`);
    });
});
