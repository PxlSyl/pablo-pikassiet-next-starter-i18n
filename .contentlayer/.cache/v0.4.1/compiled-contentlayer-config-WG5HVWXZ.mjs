var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// config/siteMetadata.js
var require_siteMetadata = __commonJS({
  "config/siteMetadata.js"(exports, module) {
    var siteMetadata2 = {
      title: "Pablo Pikassiet",
      author: "Pablo Pikassiet",
      description: "An amazing Next.js template for creative people",
      email: "<YOUR EMAIL>",
      siteUrl: "https://pablo-pikassiet-next-starter-i18n.vercel.app",
      base_path: "/",
      siteRepo: "https://github.com/PxlSyl/pablo-pikassiet-next-starter-i18n",
      trailing_slash: false,
      logo: "/images/logo.svg",
      logo_darkmode: "/images/logo-darkmode.svg",
      logo_width: "225",
      logo_height: "60",
      logo_text: "Pablo Pikassiet",
      language: "en",
      theme: "system",
      // system, dark or light
      theme_switcher: true,
      socialBanner: "/images/twitter-card.png",
      locale: "en",
      analytics: {
        // If you want to use an analytics provider you have to add it to the
        // content security policy in the `next.config.js` file.
        // supports Plausible, Simple Analytics, Umami, Posthog or Google Analytics.
        umamiAnalytics: {
          // We use an env variable for this site to avoid other users cloning our analytics ID
          umamiWebsiteId: process.env.NEXT_UMAMI_ID
          // e.g. 123e4567-e89b-12d3-a456-426614174000
        }
        // plausibleAnalytics: {
        //   plausibleDataDomain: '', // e.g. tailwind-nextjs-starter-blog.vercel.app
        // },
        // simpleAnalytics: {},
        // posthogAnalytics: {
        //   posthogProjectApiKey: '', // e.g. 123e4567-e89b-12d3-a456-426614174000
        // },
        // googleAnalytics: {
        //   googleAnalyticsId: '', // e.g. G-XXXXXXX
        // },
      },
      newsletter: {
        // supports mailchimp, buttondown, convertkit, klaviyo, revue, emailoctopus
        // Please add your .env file and modify it according to your selection
        provider: "buttondown"
      },
      comments: {
        // If you want to use an analytics provider you have to add it to the
        // content security policy in the `next.config.js` file.
        // Select a provider and use the environment variables associated to it
        // https://vercel.com/docs/environment-variables
        provider: "giscus",
        // supported providers: giscus, utterances, disqus
        giscusConfig: {
          // Visit the link below, and follow the steps in the 'configuration' section
          // https://giscus.app/
          repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
          repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID,
          category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
          categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
          mapping: "pathname",
          // supported options: pathname, url, title
          reactions: "1",
          // Emoji reactions: 1 = enable / 0 = disable
          // Send discussion metadata periodically to the parent window: 1 = enable / 0 = disable
          metadata: "0",
          // theme example: light, dark, dark_dimmed, dark_high_contrast
          // transparent_dark, preferred_color_scheme, custom
          theme: "light",
          // theme when dark mode
          darkTheme: "transparent_dark",
          // If the theme option above is set to 'custom`
          // please provide a link below to your custom theme css file.
          // example: https://giscus.app/themes/custom_example.css
          themeURL: "",
          // This corresponds to the `data-lang="en"` in giscus's configurations
          lang: "en"
        }
      },
      search: {
        provider: "kbar",
        // kbar or algolia
        kbarConfig: {
          searchDocumentsPath: "search.json"
          // path to load documents to search
        }
        // provider: 'algolia',
        // algoliaConfig: {
        //   // The application ID provided by Algolia
        //   appId: 'R2IYF7ETH7',
        //   // Public API key: it is safe to commit it
        //   apiKey: '599cec31baffa4868cae4e79f180729b',
        //   indexName: 'docsearch',
        // },
      },
      formspree: true,
      waline: false,
      walineServer: ""
    };
    module.exports = siteMetadata2;
  }
});

// app/[locale]/i18n/locales.js
var require_locales = __commonJS({
  "app/[locale]/i18n/locales.js"(exports, module) {
    var fallbackLng2 = "en";
    var secondLng2 = "fr";
    module.exports = { fallbackLng: fallbackLng2, secondLng: secondLng2 };
  }
});

// contentlayer.config.ts
import {
  defineDocumentType,
  makeSource,
  defineNestedType
} from "contentlayer2/source-files";
import { writeFileSync } from "fs";

// lib/utils/readingTime.ts
var readingTime = (content) => {
  const WPS = 275 / 60;
  let images = 0;
  const regex = /\w/;
  const words = content.split(" ").filter((word) => {
    if (word.includes("<img")) {
      images += 1;
    }
    return regex.test(word);
  }).length;
  const imageAdjust = images * 4;
  let imageSecs = 0;
  let imageFactor = 12;
  while (images) {
    imageSecs += imageFactor;
    if (imageFactor > 3) {
      imageFactor -= 1;
    }
    images -= 1;
  }
  const minutes = Math.ceil(((words - imageAdjust) / WPS + imageSecs) / 60);
  if (minutes < 2) {
    return minutes + ` Minute`;
  } else {
    return minutes + ` Minutes`;
  }
};
var readingTime_default = readingTime;

// contentlayer.config.ts
var import_siteMetadata = __toESM(require_siteMetadata());
var import_locales = __toESM(require_locales());
import { slug } from "github-slugger";
import path from "path";
import { fromHtmlIsomorphic } from "hast-util-from-html-isomorphic";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import {
  remarkExtractFrontmatter,
  remarkCodeTitles,
  remarkImgToJsx,
  extractTocHeadings
} from "pliny/mdx-plugins/index.js";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import rehypeCitation from "rehype-citation";
import rehypePrismPlus from "rehype-prism-plus";
import rehypePresetMinify from "rehype-preset-minify";
import { allCoreContent, sortPosts } from "pliny/utils/contentlayer.js";
var root = process.cwd();
var icon = fromHtmlIsomorphic(
  `
  <span class="content-header-link">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 linkicon">
  <path d="M12.232 4.232a2.5 2.5 0 0 1 3.536 3.536l-1.225 1.224a.75.75 0 0 0 1.061 1.06l1.224-1.224a4 4 0 0 0-5.656-5.656l-3 3a4 4 0 0 0 .225 5.865.75.75 0 0 0 .977-1.138 2.5 2.5 0 0 1-.142-3.667l3-3Z" />
  <path d="M11.603 7.963a.75.75 0 0 0-.977 1.138 2.5 2.5 0 0 1 .142 3.667l-3 3a2.5 2.5 0 0 1-3.536-3.536l1.225-1.224a.75.75 0 0 0-1.061-1.06l-1.224 1.224a4 4 0 1 0 5.656 5.656l3-3a4 4 0 0 0-.225-5.865Z" />
  </svg>
  </span>
`,
  { fragment: true }
);
var computedFields = {
  readingTime: { type: "json", resolve: (doc) => readingTime_default(doc.body.raw) },
  slug: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath.replace(/^.+?(\/)/, "")
  },
  path: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath
  },
  filePath: {
    type: "string",
    resolve: (doc) => doc._raw.sourceFilePath
  },
  toc: { type: "string", resolve: (doc) => extractTocHeadings(doc.body.raw) }
};
async function generateSlugMap(allBlogs) {
  const slugMap = {};
  allBlogs.forEach((blog) => {
    const { localeid, language, slug: slug2 } = blog;
    const formattedLng = language === import_locales.fallbackLng ? import_locales.fallbackLng : import_locales.secondLng;
    if (!slugMap[localeid]) {
      slugMap[localeid] = {};
    }
    slugMap[localeid][formattedLng] = slug2;
  });
  writeFileSync("./config/data/localeid-map.json", JSON.stringify(slugMap, null, 2));
}
function createCategoryCount(allBlogs) {
  const categoryCount = { [import_locales.fallbackLng]: {}, [import_locales.secondLng]: {} };
  allBlogs.forEach((file) => {
    if (file.categories && file.draft === false) {
      file.categories.forEach((category) => {
        const formattedCategory = slug(category);
        if (file.language === import_locales.fallbackLng) {
          categoryCount[import_locales.fallbackLng][formattedCategory] = (categoryCount[import_locales.fallbackLng][formattedCategory] || 0) + 1;
        } else if (file.language === import_locales.secondLng) {
          categoryCount[import_locales.secondLng][formattedCategory] = (categoryCount[import_locales.secondLng][formattedCategory] || 0) + 1;
        }
      });
    }
  });
  writeFileSync("./config/data/category-data.json", JSON.stringify(categoryCount));
  console.log("Results for category-data.json written.");
}
function createTagCount(allBlogs) {
  const tagCount = {
    [import_locales.fallbackLng]: {},
    [import_locales.secondLng]: {}
  };
  allBlogs.forEach((file) => {
    if (file.tags && file.draft === false) {
      file.tags.forEach((tag) => {
        const formattedTag = slug(tag);
        if (file.language === import_locales.fallbackLng) {
          tagCount[import_locales.fallbackLng][formattedTag] = (tagCount[import_locales.fallbackLng][formattedTag] || 0) + 1;
        } else if (file.language === import_locales.secondLng) {
          tagCount[import_locales.secondLng][formattedTag] = (tagCount[import_locales.secondLng][formattedTag] || 0) + 1;
        }
      });
    }
  });
  writeFileSync("./config/data/tag-data.json", JSON.stringify(tagCount));
  console.log("Results for tag-data.json written.");
}
function createSearchIndex(allBlogs) {
  if (import_siteMetadata.default?.search?.provider === "kbar" && import_siteMetadata.default.search.kbarConfig.searchDocumentsPath) {
    writeFileSync(
      `public/${import_siteMetadata.default.search.kbarConfig.searchDocumentsPath}`,
      JSON.stringify(allCoreContent(sortPosts(allBlogs)))
    );
    console.log("Local search index generated...");
  }
}
var Series = defineNestedType(() => ({
  name: "Series",
  fields: {
    title: {
      type: "string",
      required: true
    },
    order: {
      type: "number",
      required: true
    }
  }
}));
var Blog = defineDocumentType(() => ({
  name: "Blog",
  filePathPattern: "**/**/*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    series: { type: "nested", of: Series },
    meta_title: { type: "string" },
    description: { type: "string" },
    date: { type: "date", required: true },
    language: { type: "string", required: true },
    localeid: { type: "string", required: true },
    image: { type: "string" },
    categories: { type: "list", of: { type: "string" }, default: [] },
    tags: { type: "list", of: { type: "string" }, default: [] },
    lastmod: { type: "date" },
    draft: { type: "boolean" },
    summary: { type: "string" },
    authors: { type: "list", of: { type: "string" } },
    serie: { type: "string" },
    layout: { type: "string" },
    bibliography: { type: "string" },
    canonicalUrl: { type: "string" }
  },
  computedFields: {
    ...computedFields,
    structuredData: {
      type: "json",
      resolve: (doc) => ({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: doc.title,
        datePublished: doc.date,
        dateModified: doc.lastmod || doc.date,
        description: doc.summary,
        image: doc.image ? doc.image[0] : import_siteMetadata.default.socialBanner,
        url: `${import_siteMetadata.default.siteUrl}/${doc._raw.flattenedPath}`
      })
    }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "content/blog",
  documentTypes: [Blog],
  mdx: {
    cwd: process.cwd(),
    remarkPlugins: [
      remarkExtractFrontmatter,
      remarkGfm,
      remarkCodeTitles,
      remarkMath,
      remarkImgToJsx
    ],
    rehypePlugins: [
      rehypeSlug,
      rehypeAutolinkHeadings,
      rehypeKatex,
      [rehypeCitation, { path: path.join(root, "content", "blog") }],
      [rehypePrismPlus, { defaultLanguage: "js", ignoreMissing: true }],
      rehypePresetMinify
    ]
  },
  onSuccess: async (importData) => {
    const { allBlogs } = await importData();
    generateSlugMap(allBlogs);
    createCategoryCount(allBlogs);
    createTagCount(allBlogs);
    createSearchIndex(allBlogs);
  }
});
export {
  Blog,
  Series,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-WG5HVWXZ.mjs.map
