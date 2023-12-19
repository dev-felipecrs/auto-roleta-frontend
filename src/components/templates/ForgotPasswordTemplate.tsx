interface ForgotPasswordTemplateProps {
  link: string
}

export function ForgotPasswordTemplate({ link }: ForgotPasswordTemplateProps) {
  return (
    <div>
      <p>
        Olá,
        <br />
        Alguém solicitou recentemente uma alteração de senha da sua conta. Se
        este era você, você pode definir uma nova senha aqui:
        <br />
        <a href={link}>Definir senha</a>
        <br />
        Se você não quiser alterar sua senha ou não solicitou isso, basta
        ignorar e exclua esta mensagem.
        <br />
        Obrigado, Auto Roleta
      </p>
    </div>
  )
}
