import{c as r,e as p,r as j,j as e,a as m,L as i,d as f}from"./index-BbkZ7FK1.js";import{S as y}from"./SEO-Bqs6iwas.js";import{u as k}from"./useCollection-BvfGVUtp.js";/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u=r("Copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=r("Facebook",[["path",{d:"M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",key:"1jg4f8"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=r("Linkedin",[["path",{d:"M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z",key:"c2jq9f"}],["rect",{width:"4",height:"12",x:"2",y:"9",key:"mk3on5"}],["circle",{cx:"4",cy:"4",r:"2",key:"bt5ra8"}]]);function N(){const{slug:c}=p(),{items:o,loading:n,error:t}=k("posts",{publishedOnly:!0}),[l,h]=j.useState(!1),s=o.find(a=>a.slug===c);if(n)return e.jsx(m,{});if(t)return e.jsx("div",{className:"center-state",children:e.jsx("p",{children:t})});if(!s)return e.jsxs("div",{className:"center-state",children:[e.jsx("h1",{children:"Story not found"}),e.jsx(i,{to:"/blog",children:"Back to blog"})]});const d=async()=>{var a;await((a=navigator.clipboard)==null?void 0:a.writeText(location.href)),h(!0)};return e.jsxs(e.Fragment,{children:[e.jsx(y,{title:s.title,description:s.excerpt}),e.jsxs("article",{className:"article",children:[e.jsxs(i,{className:"back-link",to:"/blog",children:[e.jsx(f,{size:16})," Back to blog"]}),e.jsxs("header",{children:[e.jsxs("span",{className:"eyebrow",children:[s.category," · ",s.date," · ",s.readingTime]}),e.jsx("h1",{children:s.title}),e.jsx("p",{children:s.excerpt})]}),s.cover&&e.jsx("img",{className:"article-cover",src:s.cover,alt:s.title}),e.jsx("div",{className:"article-body",children:(s.content||"").split(`

`).map((a,x)=>e.jsx("p",{children:a},x))}),e.jsxs("div",{className:"share-row",children:[e.jsx("span",{className:"eyebrow",children:"Share this story"}),e.jsx("a",{href:`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(location.href)}`,"aria-label":"Share on Facebook",children:e.jsx(b,{size:18})}),e.jsx("a",{href:`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(location.href)}`,"aria-label":"Share on LinkedIn",children:e.jsx(g,{size:18})}),e.jsxs("button",{onClick:d,"aria-label":"Copy link",children:[e.jsx(u,{size:17}),l?"Copied":""]})]})]})]})}export{N as default};
