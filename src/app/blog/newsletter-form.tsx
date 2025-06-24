"use client";
import type { SVGProps } from "react";
import { useFormStatus } from "react-dom";
import { subscribe } from "../blog/actions";
import { Turnstile } from "next-turnstile";
import { env } from "~~/env";
import { useState } from "react";

export function NewsletterForm() {
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);


  console.log("zzz", turnstileToken, setTurnstileToken)
  
  return (
    <form action={subscribe}>
      <div className="flex w-full gap-4">
        <div className="flex-grow">
          <input
            type="email"
            name="email"
            placeholder="email"
            autoComplete="off"
            className="w-full border-b border-black bg-inherit p-1 transition-colors placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none dark:border-white dark:placeholder:text-neutral-600 dark:focus:border-neutral-600"
          />
        </div>
        <SubmitButton disabled={!turnstileToken} />
      </div>
      
      <div className="mt-4">
        <Turnstile
          siteKey={env.NEXT_PUBLIC_CF_TURNSTILE_SITE_KEY}
          onVerify={setTurnstileToken}
          onExpire={() => setTurnstileToken(null)}
        />
        <input type="hidden" name="cf-turnstile-response" value={turnstileToken ?? ""} />
      </div>
      <div></div>
    </form>
  );
}

export function SubmitButton({ disabled }: { disabled?: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="rounded-md bg-transparent p-1 text-black transition-colors duration-300 ease-in-out hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-black disabled:cursor-not-allowed disabled:bg-neutral-400 disabled:text-neutral-600 dark:text-white dark:hover:bg-neutral-100 dark:hover:text-black dark:focus:ring-white"
      disabled={pending || disabled}
    >
      {pending ? <SvgSpinners3DotsMove /> : "subscribe"}
    </button>
  );
}

export function SvgSpinners3DotsMove(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <circle cx={4} cy={12} r={0} fill="currentColor">
        <animate
          fill="freeze"
          attributeName="r"
          begin="0;svgSpinners3DotsMove1.end"
          calcMode="spline"
          dur="0.5s"
          keySplines=".36,.6,.31,1"
          values="0;3"
        ></animate>
        <animate
          fill="freeze"
          attributeName="cx"
          begin="svgSpinners3DotsMove7.end"
          calcMode="spline"
          dur="0.5s"
          keySplines=".36,.6,.31,1"
          values="4;12"
        ></animate>
        <animate
          fill="freeze"
          attributeName="cx"
          begin="svgSpinners3DotsMove5.end"
          calcMode="spline"
          dur="0.5s"
          keySplines=".36,.6,.31,1"
          values="12;20"
        ></animate>
        <animate
          id="svgSpinners3DotsMove0"
          fill="freeze"
          attributeName="r"
          begin="svgSpinners3DotsMove3.end"
          calcMode="spline"
          dur="0.5s"
          keySplines=".36,.6,.31,1"
          values="3;0"
        ></animate>
        <animate
          id="svgSpinners3DotsMove1"
          fill="freeze"
          attributeName="cx"
          begin="svgSpinners3DotsMove0.end"
          dur="0.001s"
          values="20;4"
        ></animate>
      </circle>
      <circle cx={4} cy={12} r={3} fill="currentColor">
        <animate
          fill="freeze"
          attributeName="cx"
          begin="0;svgSpinners3DotsMove1.end"
          calcMode="spline"
          dur="0.5s"
          keySplines=".36,.6,.31,1"
          values="4;12"
        ></animate>
        <animate
          fill="freeze"
          attributeName="cx"
          begin="svgSpinners3DotsMove7.end"
          calcMode="spline"
          dur="0.5s"
          keySplines=".36,.6,.31,1"
          values="12;20"
        ></animate>
        <animate
          id="svgSpinners3DotsMove2"
          fill="freeze"
          attributeName="r"
          begin="svgSpinners3DotsMove5.end"
          calcMode="spline"
          dur="0.5s"
          keySplines=".36,.6,.31,1"
          values="3;0"
        ></animate>
        <animate
          id="svgSpinners3DotsMove3"
          fill="freeze"
          attributeName="cx"
          begin="svgSpinners3DotsMove2.end"
          dur="0.001s"
          values="20;4"
        ></animate>
        <animate
          fill="freeze"
          attributeName="r"
          begin="svgSpinners3DotsMove3.end"
          calcMode="spline"
          dur="0.5s"
          keySplines=".36,.6,.31,1"
          values="0;3"
        ></animate>
      </circle>
      <circle cx={12} cy={12} r={3} fill="currentColor">
        <animate
          fill="freeze"
          attributeName="cx"
          begin="0;svgSpinners3DotsMove1.end"
          calcMode="spline"
          dur="0.5s"
          keySplines=".36,.6,.31,1"
          values="12;20"
        ></animate>
        <animate
          id="svgSpinners3DotsMove4"
          fill="freeze"
          attributeName="r"
          begin="svgSpinners3DotsMove7.end"
          calcMode="spline"
          dur="0.5s"
          keySplines=".36,.6,.31,1"
          values="3;0"
        ></animate>
        <animate
          id="svgSpinners3DotsMove5"
          fill="freeze"
          attributeName="cx"
          begin="svgSpinners3DotsMove4.end"
          dur="0.001s"
          values="20;4"
        ></animate>
        <animate
          fill="freeze"
          attributeName="r"
          begin="svgSpinners3DotsMove5.end"
          calcMode="spline"
          dur="0.5s"
          keySplines=".36,.6,.31,1"
          values="0;3"
        ></animate>
        <animate
          fill="freeze"
          attributeName="cx"
          begin="svgSpinners3DotsMove3.end"
          calcMode="spline"
          dur="0.5s"
          keySplines=".36,.6,.31,1"
          values="4;12"
        ></animate>
      </circle>
      <circle cx={20} cy={12} r={3} fill="currentColor">
        <animate
          id="svgSpinners3DotsMove6"
          fill="freeze"
          attributeName="r"
          begin="0;svgSpinners3DotsMove1.end"
          calcMode="spline"
          dur="0.5s"
          keySplines=".36,.6,.31,1"
          values="3;0"
        ></animate>
        <animate
          id="svgSpinners3DotsMove7"
          fill="freeze"
          attributeName="cx"
          begin="svgSpinners3DotsMove6.end"
          dur="0.001s"
          values="20;4"
        ></animate>
        <animate
          fill="freeze"
          attributeName="r"
          begin="svgSpinners3DotsMove7.end"
          calcMode="spline"
          dur="0.5s"
          keySplines=".36,.6,.31,1"
          values="0;3"
        ></animate>
        <animate
          fill="freeze"
          attributeName="cx"
          begin="svgSpinners3DotsMove5.end"
          calcMode="spline"
          dur="0.5s"
          keySplines=".36,.6,.31,1"
          values="4;12"
        ></animate>
        <animate
          fill="freeze"
          attributeName="cx"
          begin="svgSpinners3DotsMove3.end"
          calcMode="spline"
          dur="0.5s"
          keySplines=".36,.6,.31,1"
          values="12;20"
        ></animate>
      </circle>
    </svg>
  );
}
