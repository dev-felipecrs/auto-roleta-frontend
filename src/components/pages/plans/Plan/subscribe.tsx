"use client";
import { useRef, useState } from "react";

import { Plan, User } from "@/types";
import { Button } from "@/components/shared";

import { PlanPixStep } from "./pix";
import { PlanCpfStep } from "./cpf";

type Step = "cpf" | "pix";

interface PlanSubscribeProps {
  user: User;
  plan: Plan;
  handleOpenModal(isOpen: boolean): void
}

export function PlanSubscribe({
  user,
  plan,
  handleOpenModal,
}: PlanSubscribeProps) {
  const [step, setStep] = useState<Step>("cpf");

  const cpfRef = useRef("");

  const handleCpfStepSubmit = (cpf: string) => {
    cpfRef.current = cpf;
    setStep("pix");
  };

  return (
    <>
      {step === "cpf" && <PlanCpfStep callback={handleCpfStepSubmit} />}

      {step === "pix" && (
        <PlanPixStep
          user={user}
          priceInCents={plan.price}
          cpf={cpfRef.current}
          handleOpenModal={handleOpenModal}
        />
      )}
    </>
  );
}
