import { Plan, User } from "@/types";
import { useState } from "react";
import { Button } from "@/components/shared";

import * as Dialog from "@radix-ui/react-dialog";

import { PlanSubscribe } from "./subscribe";

interface SelectPaymentsProps {
  user: User;
  plan: Plan;
}

export function SelectPayments({ plan, user }: SelectPaymentsProps) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [methodPayment, setMethodPayment] = useState("");

  return (
    <>
      {methodPayment !== "pix" && (
        <Dialog.Root open={modalIsOpen} onOpenChange={setModalIsOpen}>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 animate-show bg-black bg-opacity-50" />

            <Dialog.Content className="fixed left-1/2 top-1/2 flex w-[90dvw] -translate-x-1/2 -translate-y-1/2 animate-show-with-moviment flex-col rounded-xl bg-[#27282D] px-4 py-11 sm:w-auto sm:px-8">
              <div className="mb-4 flex flex-col items-center gap-1">
                <strong className="text-center text-xl font-medium text-white">
                  Selecione a forma de pagamento
                </strong>
                <p className="text-center text-sm text-[#8B8D97] sm:max-w-[24rem]">
                  Para prosseguir com a sua assinatura, Selecione a forma de
                  pagamento abaixo
                </p>
              </div>

              <Button
                onClick={() => {
                  setMethodPayment("pix");
                }}
              >
                Pix
              </Button>
              <Button>
                <a href="">Cartão</a>
              </Button>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      )}

      {methodPayment === "pix" && <PlanSubscribe plan={plan} user={user} />}
    </>
  );
}
