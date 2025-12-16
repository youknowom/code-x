// import Link from "next/link";

// export default function NotFound() {
//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white font-game px-4">
//       {/* 404 Animation */}
//       <video
//         src="/animations/404.mp4"
//         autoPlay
//         loop
//         muted
//         playsInline
//         className="w-[260px] h-[260px] mb-6"
//       />

//       <h1 className="text-2xl mb-2 tracking-widest">SOMETHING WENT WRONG</h1>

//       <p className="text-gray-400 mb-6 text-center">
//         You entered a wrong path 🚧
//       </p>

//       <Link
//         href="/"
//         className="px-6 py-3 border-2 border-white hover:bg-white hover:text-black transition-all"
//       >
//         GO HOME
//       </Link>
//     </div>
//   );
// }

// // import Link from "next/link";
// // import RedPixelDino from "@/components/RedPixelDino";

// // export default function NotFound() {
// //   return (
// //     <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white font-game px-4">
// //       <RedPixelDino />

// //       <p className="text-red-500 text-lg tracking-widest mb-2">
// //         PAGE NOT FOUND
// //       </p>

// //       <p className="text-gray-400 mb-6 text-center">
// //         You entered a wrong path 🚧
// //       </p>

// //       <Link
// //         href="/"
// //         className="px-6 py-3 border-2 border-white hover:bg-white hover:text-black transition-all"
// //       >
// //         GO HOME
// //       </Link>
// //     </div>
// //   );
// // }

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white font-game px-4">
      {/* Rotating Cookie */}
      <div className="mb-6 animate-spin-normal">
        <Image
          src="/cookie.png"
          alt="404 Cookie"
          width={200}
          height={200}
          priority
        />
      </div>

      <h1 className="text-2xl mb-2 tracking-widest">SOMETHING WENT WRONG</h1>

      <p className="text-gray-400 mb-6 text-center">
        You entered a wrong path 🚧
      </p>

      <Button asChild variant="pixel" className="font-game text-2xl">
        <Link href="/">GO HOME</Link>
      </Button>
    </div>
  );
}
