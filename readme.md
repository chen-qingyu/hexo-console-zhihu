# hexo-console-zhihu

这是一个命令行插件，用来转换文章发布到知乎。

当直接导入 .md 文件到知乎文章编辑器时，知乎无法自动解析行内 latex 公式： `$e$` 会原封不动地显示字面值。而只有 `$$e$$` 能自动解析，所以这个插件的作用是将文章内所有的行内公式替换为行间公式格式（知乎文章编辑器仍然以行内公式格式显示）。

顺便，去除了 front-matter ，方便导入后直接发布。

安装：

```bash
npm install hexo-console-zhihu
```

用法：

```bash
hexo zhihu <可选指定的文章名>
```

比如 `hexo zhihu my_post` 就会在文章同级目录下生成一个 my_post.zhihu.md 文件，去除了 front-matter 并替换了公式格式，可以直接导入知乎。

如果不指定文章名，默认处理所有文章。

<del>垃圾知乎编辑器，逼得我一个写 C++ 的花了五个小时现学 JavaScript 写这玩意儿……</del>
