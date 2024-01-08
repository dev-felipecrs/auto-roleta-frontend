import Link from 'next/link'
import Image from 'next/image'

import { Plan } from '@/components/pages/plans'

type FAQItem = {
  title: string
  description: string | JSX.Element
}

const FAQ: FAQItem[] = [
  {
    title: 'Posso realmente testar a AutoRoleta de graça?',
    description: (
      <>
        Sim. A AutoRoleta oferece a modalidade Trial aos novos assinantes. Ao
        realizar o cadastro na AutoRoleta sua conta estará automaticamente no
        plano gratuito (Trial).
      </>
    ),
  },
  {
    title: 'Posso utilizar no offline?',
    description:
      'Sim, a Execução do robô é na nuvem. Seu celular ou computador pode ficar desligado e as entradas ficarão acontecendo.',
  },
  {
    title: 'Como criar uma conta na AutoRoleta?',
    description: (
      <>
        Para criar uma conta, acesse o site:{' '}
        <Link href="/accounts/register" className="text-[#E51E3E] underline">
          https://www.autoroleta.com/accounts/register
        </Link>{' '}
        ou clique no botão “Registrar” no canto superior direito da tela.
      </>
    ),
  },
  {
    title: 'Funciona no celular?',
    description:
      'Sim, funciona em todos os dispositivos com acesso a internet.',
  },
  {
    title: 'A plataforma é segura?',
    description:
      'Valorizamos a privacidade dos nossos usuários. Todas as informações são tratadas com máxima confidencialidade, garantindo uma experiência segura e tranquila ao utilizar nossa plataforma.',
  },
  {
    title: 'Preciso ter experiência?',
    description:
      'Não, para aqueles que não têm experiência extensiva em jogos de cassino. Basta alguns cliques para começar a usufruir dos benefícios da inteligência artificial em suas apostas.',
  },
]

export default function Home() {
  return (
    <main className="overflow-x-hidden bg-[#28292E]">
      <section className="relative z-10 px-6 pt-10 sm:flex sm:flex-col sm:items-center">
        <header className="flex w-full items-center justify-between px-[6.25rem]">
          <Link href="/">
            <Image
              src="/images/shared/logo.svg"
              alt="Auto Roleta"
              width={160}
              height={35}
            />
          </Link>

          <div className="hidden items-center gap-3 sm:flex">
            <Link
              href="/accounts/login"
              className="rounded-lg border border-white px-11 py-3 text-sm leading-6 text-white transition-all hover:opacity-75"
            >
              Login
            </Link>

            <Link
              href="/accounts/register"
              className="rounded-lg border border-[#E51E3E] bg-[#E51E3E] px-11 py-3 text-sm leading-6 text-white transition-all hover:opacity-75"
            >
              Registrar
            </Link>
          </div>
        </header>

        <h1 className="mx-auto mt-32 text-center text-[2rem] font-bold leading-tight text-white sm:max-w-[57.25rem] sm:text-[4rem]">
          Aposte na Roleta de forma{' '}
          <span className="text-[#E51E3E]">100% automatizada</span>
        </h1>
        <p className="mx-auto mt-8 text-center text-xs leading-5 text-[#969696] sm:max-w-[1000px] sm:text-lg sm:leading-8">
          A tecnologia empregada permite a análise instantânea de cada rodada,
          adaptando-se rapidamente a mudanças nas tendências do jogo.
        </p>

        <footer className="mt-16 flex items-center justify-center gap-4 sm:gap-6">
          <Link
            href="/accounts/register"
            className="whitespace-nowrap rounded-lg border border-[#E51E3E] bg-[#E51E3E] px-8 py-3 text-sm leading-6 text-white transition-all hover:opacity-75 sm:px-11"
          >
            Teste grátis
          </Link>

          <Link
            href="/accounts/login"
            className="whitespace-nowrap rounded-lg border border-white px-11 py-3 text-sm leading-6 text-white transition-all hover:opacity-75"
          >
            Fazer login
          </Link>
        </footer>

        <div className="relative mt-16 aspect-video w-full lg:h-[585px] lg:w-[1041px]">
          <Image
            src="/images/pages/home/hero.svg"
            alt="Auto Roleta Dashboard"
            layout="fill"
          />
        </div>

        <div className="absolute left-0 top-0 -z-10 h-[900px] w-screen bg-[#1C1D22] sm:h-[1100px] sm:rounded-br-[25%]" />
      </section>

      <section className="flex flex-col items-center justify-between gap-16 px-8 pt-44 sm:flex-row sm:px-[7.5rem] sm:pt-48">
        <div className="max-w-[687px]">
          <h1 className="text-[2rem] font-bold leading-snug text-white sm:text-5xl">
            Venha apostar no automático com as melhores estratégias!
          </h1>
          <p className="mt-4 text-sm leading-6 text-[#969696] sm:text-base">
            Inspirada nas táticas dos grandes apostadores de roleta ao redor do
            mundo, nossa inteligência artificial incorpora estratégias testadas
            e comprovadas
          </p>

          <div className="mt-9 flex items-center gap-3">
            <div className="flex">
              <Image
                src="/images/pages/home/person-1.png"
                alt="Pessoa"
                width={24}
                height={24}
                className="-mr-2 rounded-full border border-[#1C1D21]"
              />
              <Image
                src="/images/pages/home/person-2.png"
                alt="Pessoa"
                width={24}
                height={24}
                className="-mr-2 rounded-full border border-[#1C1D21]"
              />
              <Image
                src="/images/pages/home/person-3.png"
                alt="Pessoa"
                width={24}
                height={24}
                className="-mr-2 rounded-full border border-[#1C1D21]"
              />
              <Image
                src="/images/pages/home/person-4.png"
                alt="Pessoa"
                width={24}
                height={24}
                className="rounded-full border border-[#1C1D21]"
              />
            </div>

            <span className="text-sm font-semibold leading-normal text-[#969696]">
              +10.000 usuários cadastrados
            </span>
          </div>

          <footer>
            <Link
              href="#"
              className="mt-11 inline-block rounded-lg border border-[#E51E3E] bg-[#E51E3E] px-11 py-3 text-sm font-semibold leading-6 text-white transition-all hover:opacity-75"
            >
              Try for free
            </Link>
          </footer>
        </div>

        <Image
          src="/images/pages/home/screens-mobile-version.svg"
          alt="Telas em dispositivos móveis"
          width={416}
          height={617}
        />
      </section>

      <section className="flex flex-col items-center bg-[#1C1D21] px-4 pb-36 pt-32">
        <h1 className="text-[2rem] font-bold text-white sm:text-[3.25rem]">
          Conquistas
        </h1>
        <p className="mt-10 px-8 text-center text-sm text-[#969696]">
          Com a auto roleta pessoas comuns chegam a faturar de R$ 500,00 a R$
          5.000,00 por dia utilizando apenas a conexão com a internet.
        </p>

        <div className="mt-16 flex flex-col justify-center gap-8 sm:flex-row">
          <article className="flex flex-col items-center justify-center gap-1 rounded-xl bg-[#17181D] px-9 py-11">
            <strong className="text-[2.625rem] font-bold text-white">
              + 1.2m
            </strong>
            <p className="text-base text-[#8B8D97]">Apostas realizadas</p>
          </article>

          <article className="flex flex-col items-center justify-center gap-1 rounded-xl bg-[#17181D] px-9 py-11">
            <strong className="text-[2.625rem] font-bold text-white">
              + 11.576 mil
            </strong>
            <p className="text-base text-[#8B8D97]">Usuários ativo</p>
          </article>

          <article className="flex flex-col items-center justify-center gap-1 rounded-xl bg-[#17181D] px-9 py-11">
            <strong className="text-[2.625rem] font-bold text-white">
              + R$ 439.770
            </strong>
            <p className="text-base text-[#8B8D97]">
              Faturados através do nosso app
            </p>
          </article>
        </div>
      </section>

      <section className="flex flex-col items-center px-8 pb-40 pt-32 sm:px-60">
        <h1 className="text-[2rem] font-bold text-white sm:text-[3.25rem]">
          Nossos planos
        </h1>
        <p className="mt-10 text-center text-sm text-[#969696]">
          Escolha o plano ideal para o seu perfil
        </p>

        <div className="mt-36 flex flex-col items-center gap-10 px-4 sm:flex-row">
          <Plan
            name="Free"
            price={0}
            period="mês"
            benefitsIncluded={[
              '100% em nuvem',
              'Análises em tempo real',
              'Utilização Limitada',
              'Histórico de apostas',
              'Suporte',
            ]}
            benefitsNotIncluded={[
              'Crie sua Estratégia (em breve)',
              'Validador de Estratégias (em breve)',
            ]}
          />

          <Plan
            name="Mensal"
            price={9.9}
            period="mês"
            benefitsIncluded={[
              '100% em nuvem',
              'Análises em tempo real',
              'Utilização ilimitada',
              'Histórico de apostas',
              'Suporte',
              'Crie sua Estratégia (em breve)',
              'Validador de Estratégias (em breve)',
            ]}
            benefitsNotIncluded={['Suporte individual']}
            isPopular
          />

          <Plan
            name="Anual"
            price={108.9}
            period="ano"
            benefitsIncluded={[
              '100% em nuvem',
              'Análises em tempo real',
              'Utilização ilimitada',
              'Histórico de apostas',
              'Suporte Individual',
              'Crie sua Estratégia (em breve)',
              'Validador de Estratégias (em breve)',
            ]}
            benefitsNotIncluded={[]}
          />
        </div>
      </section>

      <section className="flex flex-col items-center bg-[#1C1D22] px-8 pb-64 pt-24 sm:px-80">
        <h1 className="text-center text-[2rem] font-bold text-white sm:text-[3.25rem]">
          FAQ
        </h1>
        <p className="mt-10 text-center text-sm text-[#969696]">
          Perguntas Frequentes
        </p>

        <dl className="mt-16 w-full max-w-3xl sm:mt-28">
          {FAQ.map((item, index) => (
            <details
              key={index}
              className="group border-b border-[#43454B] pb-8 pt-6 marker:content-['']"
            >
              <summary className="flex cursor-pointer items-center justify-between text-lg font-medium text-white">
                {item.title}
                <Image
                  src="/icons/plus-circle.svg"
                  alt="Abrir"
                  width={24}
                  height={24}
                  className="group-open:hidden"
                />
                <Image
                  src="/icons/minus-circle.svg"
                  alt="Fechar"
                  width={24}
                  height={24}
                  className="hidden group-open:block"
                />
              </summary>
              <div className="pt-2">
                <p className="text-sm text-[#969696]">{item.description}</p>
              </div>
            </details>
          ))}
        </dl>
      </section>

      <footer className="px-8 pt-16 sm:px-32">
        <ul className="grid md:grid-cols-4">
          <li>
            <Image
              src="/images/shared/logo.svg"
              alt="Auto Roleta"
              width={160}
              height={35}
            />

            <span className="mt-9 block text-lg leading-8 text-white">
              Maecenas lectus quam ullamcorper vitae
            </span>
          </li>
        </ul>

        <div className="flex w-full items-center justify-center py-5">
          <span className="text-base leading-7 text-[#838489]">
            ©2024 Auto Roleta. Todos os direitos reservados
          </span>
        </div>
      </footer>
    </main>
  )
}
