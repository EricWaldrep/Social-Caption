import { clsx } from "clsx";
import React from "react";

export function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-5xl px-4">{children}</div>;
}

export function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-2xl bg-white/5 p-6 shadow-lg ring-1 ring-white/10">{children}</div>;
}

export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { className, ...rest } = props;
  return (
    <button
      className={clsx(
        "rounded-xl px-4 py-2 font-medium ring-1 ring-white/20 hover:ring-white/40 bg-white/10 hover:bg-white/15",
        className
      )}
      {...rest}
    />
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const { className, ...rest } = props;
  return (
    <input
      className={clsx(
        "w-full rounded-xl bg-white/5 px-3 py-2 outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-white/30",
        className
      )}
      {...rest}
    />
  );
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const { className, ...rest } = props;
  return (
    <textarea
      className={clsx(
        "w-full rounded-xl bg-white/5 px-3 py-2 outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-white/30",
        className
      )}
      {...rest}
    />
  );
}
