import { Motion } from "@/motion/Motion";
import {type ReactNode } from "react";

interface InfoCardProps {
  show: boolean;
  icon: ReactNode;
  firstLine: string;
  secondLine: string;
}

function InfoCard({ show, icon, firstLine, secondLine, }: InfoCardProps) {
  return (
    <div className="flex flex-col items-center">
      <Motion show={show} variant="fadeDown" className="mb-3">
        {icon}
      </Motion>
      <Motion show={show} variant="fadeUp" className="text-center">
        <p className="text-base font-light uppercase tracking-wider text-white">
          {firstLine}
        </p>
        <p className={`text-base uppercase tracking-wider mt-1 text-[#8E8E93]`}>
          {secondLine}
        </p>
      </Motion>
    </div>
  );
}

export default InfoCard;

