// "use client";

// import { useState, useRef, useEffect } from "react";
// import rehypeToc from '@jsdevtools/rehype-toc';

// interface TOCItem {
//   id: string;
//   text: string;
//   level: number;
// }

// export default function TableOfContents({ url }: { url: string }) {
//   const [headings, setHeadings] = useState<TOCItem[]>([]);
//   const [activeId, setActiveId] = useState("");

//   // Extraer headings
//   // Click handler -> llevar al heading


// //   useEffect(() => {
// // const headingElements = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'))
// //       .filter(heading => heading.id);



//   return (
//     <nav className="toc border-l border-neutral-200 dark:border-neutral-700 pl-4">
//       <h2 className="text-base font-medium mb-2">Table of Contents</h2>
//       <ul className="space-y-1">
//         {headings.map((heading) => (
//           <li
//             key={heading.id}
//             style={{ paddingLeft: `${(heading.level - 2) * 0.75}rem` }}
//           >
//             <a
//               href={`#${heading.id}`}
//               onClick={(e) => handleClick(e, heading.id)}
//               className={`block py-1 text-sm transition-colors ${
//                 activeId === heading.id
//                   ? "text-blue-600 dark:text-blue-400 font-medium"
//                   : "text-neutral-600 dark:text-neutral-400 hover:text-white-[#99999] dark:hover:text-blue-400"
//               }`}
//             >
//               {heading.text}
//             </a>
//           </li>
//         ))}
//       </ul>
//     </nav>
//   );
// }