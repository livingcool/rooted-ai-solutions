import React from "react";
import { Check, X } from "lucide-react";

interface ComparisonItem {
  feature: string;
  rootedAI: string | boolean;
  traditional: string | boolean;
}

interface ComparisonTableProps {
  title: string;
  items: ComparisonItem[];
}

const ComparisonTable = ({ title, items }: ComparisonTableProps) => {
  return (
    <div className="my-16 overflow-hidden rounded-3xl border border-black/10 dark:border-white/10 bg-white dark:bg-black/20 shadow-xl">
      <div className="p-8 border-b border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5">
        <h3 className="text-2xl font-bold text-black dark:text-white text-center">
          {title}
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-black/5 dark:bg-white/5">
              <th className="p-6 text-sm font-bold uppercase tracking-wider text-black/60 dark:text-white/60">Feature</th>
              <th className="p-6 text-sm font-bold uppercase tracking-wider text-black dark:text-white">RootedAI Solutions</th>
              <th className="p-6 text-sm font-bold uppercase tracking-wider text-black/40 dark:text-white/40">Traditional Methods</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/10 dark:divide-white/10">
            {items.map((item, idx) => (
              <tr key={idx} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                <td className="p-6 font-medium text-black dark:text-white">{item.feature}</td>
                <td className="p-6 text-black dark:text-white">
                  {typeof item.rootedAI === "boolean" ? (
                    item.rootedAI ? <Check className="w-5 h-5 text-green-500" /> : <X className="w-5 h-5 text-red-500" />
                  ) : (
                    <span className="font-bold">{item.rootedAI}</span>
                  )}
                </td>
                <td className="p-6 text-black/60 dark:text-white/60">
                   {typeof item.traditional === "boolean" ? (
                    item.traditional ? <Check className="w-5 h-5 text-slate-400" /> : <X className="w-5 h-5 text-slate-300" />
                  ) : (
                    <span>{item.traditional}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-6 bg-black/5 dark:bg-white/5 text-center">
        <p className="text-sm font-light text-black/60 dark:text-white/60 italic">
          * Based on average enterprise deployment metrics as of 2024.
        </p>
      </div>
    </div>
  );
};

export default ComparisonTable;
