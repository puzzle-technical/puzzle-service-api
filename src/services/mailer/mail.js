'use strict';
exports.createTemplate = function CreateMailTemplate(message) {
  return `<!DOCTYPE html>
  <html lang="pt-br">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Puzzle Technical</title>
  
    <style>
      blockquote {
        background: '#dadada',
        padding: 20px,
        font-size: 24px
      }
    </style>
  </head>
  <body>
    <div class="">
      <div>
        ${message}
        <p>Tem alguma dúvida? Fale conosco: puzzletechnical@gmail.com</p>
        <p class="">Atenciosamente, <br>Puzzle Technical.</p>
      </div>
    </div>
  </body>
  </html>`
}

exports.forgottenPasswordMessage = password => `
<h2>Restauração de senha</h2>
<p>Nós vamos te dar uma nova senha para você acessar o sistema.<br>
Lembre-se dela se quiser alterá-la depois na página do seu perfil.</p>
<p>Sua nova senha é</p>
<blockquote>${password}</blockquote>
`